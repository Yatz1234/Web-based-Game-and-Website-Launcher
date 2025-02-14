import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LaunchItem } from '../types';
import { Trash2 } from 'lucide-react';

interface ManageItemsProps {
  items: LaunchItem[];
  onAddItem: (item: Omit<LaunchItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
}

const ManageItems: React.FC<ManageItemsProps> = ({ items, onAddItem, onDeleteItem }) => {
  const { theme } = useTheme();
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'website' as const,
    url: '',
    appUrl: '',
    icon: '',
    category: 'websites',
    favorite: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && (newItem.url || newItem.appUrl)) {
      onAddItem(newItem);
      setNewItem({
        name: '',
        type: 'website',
        url: '',
        appUrl: '',
        icon: '',
        category: 'websites',
        favorite: false,
      });
    }
  };

  return (
    <div className="p-6">
      <div className={`mb-8 p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Name
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className={`mt-1 block w-full rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } border p-2 focus:ring-2 focus:ring-blue-500`}
                required
              />
            </label>
          </div>
          <div>
            <label className={`block mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Type
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({
                  ...newItem,
                  type: e.target.value as 'game' | 'website',
                  category: e.target.value === 'game' ? 'games' : 'websites'
                })}
                className={`mt-1 block w-full rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } border p-2 focus:ring-2 focus:ring-blue-500`}
              >
                <option value="website">Website</option>
                <option value="game">Game</option>
              </select>
            </label>
          </div>
          <div>
            <label className={`block mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Website URL
              <input
                type="url"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                className={`mt-1 block w-full rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } border p-2 focus:ring-2 focus:ring-blue-500`}
              />
            </label>
          </div>
          {newItem.type === 'game' && (
            <div>
              <label className={`block mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                App URL (for native launch)
                <input
                  type="text"
                  value={newItem.appUrl}
                  onChange={(e) => setNewItem({ ...newItem, appUrl: e.target.value })}
                  className={`mt-1 block w-full rounded-md ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                  } border p-2 focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., steam://"
                />
              </label>
            </div>
          )}
          <div>
            <label className={`block mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Icon URL
              <input
                type="url"
                value={newItem.icon}
                onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                className={`mt-1 block w-full rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } border p-2 focus:ring-2 focus:ring-blue-500`}
                placeholder="https://example.com/icon.jpg"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Item
          </button>
        </form>
      </div>

      <div className={`p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Manage Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{item.name}</h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.type}</p>
                </div>
              </div>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                aria-label="Delete item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageItems;