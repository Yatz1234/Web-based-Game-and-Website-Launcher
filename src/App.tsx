import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import LaunchGrid from './components/LaunchGrid';
import ManageItems from './components/ManageItems';
import { initialItems } from './data';
import { LaunchItem } from './types';
import { useTheme } from './context/ThemeContext';

function App() {
  const [items, setItems] = useState<LaunchItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  const handleToggleFavorite = useCallback((id: string) => {
    setItems(items => items.map(item =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  }, []);

  const handleLaunch = useCallback((item: LaunchItem) => {
    if (item.appUrl && item.type === 'game') {
      window.location.href = item.appUrl;
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
    setItems(items => items.map(i =>
      i.id === item.id ? { ...i, lastUsed: new Date() } : i
    ));
  }, []);

  const handleAddItem = useCallback((newItem: Omit<LaunchItem, 'id'>) => {
    setItems(items => [...items, {
      ...newItem,
      id: crypto.randomUUID(),
    }]);
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;

    if (selectedCategory === 'favorites') {
      result = result.filter(item => item.favorite);
    } else if (selectedCategory === 'recent') {
      result = result.filter(item => item.lastUsed).sort(
        (a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0)
      );
    } else if (selectedCategory !== 'all' && selectedCategory !== 'manage') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [items, selectedCategory, search]);

  return (
    <div className={`flex min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="flex-1 flex flex-col">
        <div className={`p-4 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <SearchBar search={search} onSearch={setSearch} />
        </div>
        <div className="flex-1 overflow-auto">
          {selectedCategory === 'manage' ? (
            <ManageItems
              items={items}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
            />
          ) : (
            <LaunchGrid
              items={filteredItems}
              onToggleFavorite={handleToggleFavorite}
              onLaunch={handleLaunch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;