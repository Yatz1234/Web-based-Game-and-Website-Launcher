// State
let items = [
  {
    id: '1',
    name: 'Steam',
    type: 'game',
    url: 'https://store.steampowered.com',
    appUrl: 'steam://',
    category: 'games',
    favorite: true,
    icon: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Epic Games',
    type: 'game',
    url: 'https://store.epicgames.com',
    appUrl: 'com.epicgames.launcher://',
    category: 'games',
    favorite: false,
    icon: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'GitHub',
    type: 'website',
    url: 'https://github.com',
    category: 'websites',
    favorite: true,
    icon: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
  }
];

let selectedCategory = 'all';
let searchQuery = '';
let editingItemId = null;

// Theme
function initTheme() {
  try {
    const theme = localStorage.getItem('launcher_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    console.error('Error loading theme:', error);
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleTheme() {
  try {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('launcher_theme', newTheme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
}

// Items Management
function addItem(newItem) {
  items.push({
    ...newItem,
    id: crypto.randomUUID(),
    favorite: false,
    lastUsed: null
  });
  saveItems();
  renderItems();
}

function updateItem(id, updatedItem) {
  items = items.map(item =>
    item.id === id ? { ...item, ...updatedItem } : item
  );
  editingItemId = null;
  saveItems();
  renderItems();
}

function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  saveItems();
  renderItems();
}

function toggleFavorite(id) {
  items = items.map(item =>
    item.id === id ? { ...item, favorite: !item.favorite } : item
  );
  saveItems();
  renderItems();
}

function launchItem(item) {
  const now = new Date().toISOString();
  items = items.map(i =>
    i.id === item.id ? { ...i, lastUsed: now } : i
  );
  saveItems();

  if (item.appUrl) {
    window.location.href = item.appUrl;
  } else if (item.url) {
    window.open(item.url, '_blank');
  }
}

function startEditing(id) {
  editingItemId = id;
  renderItems();
}

function cancelEditing() {
  editingItemId = null;
  renderItems();
}

// Filtering
function getFilteredItems() {
  let filtered = items;

  if (selectedCategory === 'favorites') {
    filtered = filtered.filter(item => item.favorite);
  } else if (selectedCategory === 'recent') {
    filtered = filtered.filter(item => item.lastUsed)
      .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
  } else if (selectedCategory !== 'all') {
    filtered = filtered.filter(item => item.category === selectedCategory);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query)
    );
  }

  return filtered;
}

// Rendering
function renderGrid() {
  const grid = document.getElementById('grid');
  const filteredItems = getFilteredItems();

  grid.innerHTML = filteredItems.map(item => `
    <div class="card">
      <div class="card-image">
        <img src="${item.icon || 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=60'}" alt="${item.name}">
        <button
          class="favorite-button ${item.favorite ? 'active' : ''}"
          onclick="toggleFavorite('${item.id}')"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 21.35l-1.9-1.72C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.1 11.13L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <div class="card-footer">
          <span class="card-type">${item.type}</span>
          <button class="launch-button" onclick="launchItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            Launch
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderManageList() {
  const itemsList = document.getElementById('itemsList');
  
  itemsList.innerHTML = items.map(item => {
    if (editingItemId === item.id) {
      return `
        <div class="item editing">
          <form onsubmit="handleUpdateItem(event, '${item.id}')" class="edit-form">
            <div class="form-group">
              <input type="text" id="edit-name-${item.id}" value="${item.name}" required>
            </div>
            <div class="form-group">
              <select id="edit-type-${item.id}">
                <option value="website" ${item.type === 'website' ? 'selected' : ''}>Website</option>
                <option value="game" ${item.type === 'game' ? 'selected' : ''}>Game</option>
              </select>
            </div>
            <div class="form-group">
              <input type="url" id="edit-url-${item.id}" value="${item.url || ''}" placeholder="Website URL">
            </div>
            <div class="form-group ${item.type !== 'game' ? 'hidden' : ''}">
              <input type="text" id="edit-appUrl-${item.id}" value="${item.appUrl || ''}" placeholder="App URL">
            </div>
            <div class="form-group">
              <input type="url" id="edit-icon-${item.id}" value="${item.icon || ''}" placeholder="Icon URL">
            </div>
            <div class="edit-buttons">
              <button type="submit" class="save-button">Save</button>
              <button type="button" class="cancel-button" onclick="cancelEditing()">Cancel</button>
            </div>
          </form>
        </div>
      `;
    }
    return `
      <div class="item">
        <div class="item-info">
          ${item.icon ? `
            <div class="item-image">
              <img src="${item.icon}" alt="${item.name}">
            </div>
          ` : ''}
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.type}</p>
          </div>
        </div>
        <div class="item-actions">
          <button class="edit-button" onclick="startEditing('${item.id}')">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button class="delete-button" onclick="deleteItem('${item.id}')">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderItems() {
  if (selectedCategory === 'manage') {
    document.getElementById('grid').classList.add('hidden');
    document.getElementById('manage').classList.remove('hidden');
    renderManageList();
  } else {
    document.getElementById('grid').classList.remove('hidden');
    document.getElementById('manage').classList.add('hidden');
    renderGrid();
  }
}

// Event Handlers
function handleCategoryClick(category) {
  selectedCategory = category;
  document.querySelectorAll('.categories button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderItems();
}

function handleSearch(query) {
  searchQuery = query;
  renderItems();
}

function handleAddItem(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('#name').value;
  const type = form.querySelector('#type').value;
  const url = form.querySelector('#url').value;
  const appUrl = form.querySelector('#appUrl').value;
  const icon = form.querySelector('#icon').value;

  const newItem = {
    name: name,
    type: type,
    url: url,
    appUrl: type === 'game' ? appUrl : '',
    icon: icon,
    category: type === 'game' ? 'games' : 'websites',
  };

  addItem(newItem);
  form.reset();
}

function handleUpdateItem(e, id) {
  e.preventDefault();
  const type = document.querySelector(`#edit-type-${id}`).value;
  const updatedItem = {
    name: document.querySelector(`#edit-name-${id}`).value,
    type: type,
    url: document.querySelector(`#edit-url-${id}`).value,
    appUrl: type === 'game' ? document.querySelector(`#edit-appUrl-${id}`).value : '',
    icon: document.querySelector(`#edit-icon-${id}`).value,
    category: type === 'game' ? 'games' : 'websites',
  };
  updateItem(id, updatedItem);
}

function handleTypeChange(e) {
  const gameUrlField = document.querySelector('.game-url');
  gameUrlField.classList.toggle('hidden', e.target.value !== 'game');
}

// Storage
function saveItems() {
  try {
    localStorage.setItem('launcher_items', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items:', error);
  }
}

function loadItems() {
  try {
    const savedItems = localStorage.getItem('launcher_items');
    if (savedItems) {
      items = JSON.parse(savedItems);
    }
  } catch (error) {
    console.error('Error loading items:', error);
    // En cas d'erreur, on garde les items par défaut
  }
}

// Initialization
function init() {
  initTheme();
  loadItems();

  // Event Listeners
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('search').addEventListener('input', e => handleSearch(e.target.value));
  document.getElementById('addItemForm').addEventListener('submit', handleAddItem);
  document.getElementById('type').addEventListener('change', handleTypeChange);
  
  document.querySelectorAll('.categories button').forEach(button => {
    button.addEventListener('click', () => handleCategoryClick(button.dataset.category));
  });

  renderItems();
}

init();