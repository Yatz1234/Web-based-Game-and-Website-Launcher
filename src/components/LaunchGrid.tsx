import React from 'react';
import { LaunchItem } from '../types';
import { Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LaunchGridProps {
  items: LaunchItem[];
  onToggleFavorite: (id: string) => void;
  onLaunch: (item: LaunchItem) => void;
}

const LaunchGrid: React.FC<LaunchGridProps> = ({ items, onToggleFavorite, onLaunch }) => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="relative h-40">
            <img
              src={item.icon}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-900 bg-opacity-50 hover:bg-opacity-75' 
                  : 'bg-white bg-opacity-75 hover:bg-opacity-100'
              } transition-colors`}
            >
              <Heart
                size={20}
                className={item.favorite ? 'fill-red-500 text-red-500' : theme === 'dark' ? 'text-white' : 'text-gray-600'}
              />
            </button>
          </div>
          <div className="p-4">
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{item.name}</h3>
            <div className="flex justify-between items-center">
              <span className={`text-sm capitalize ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>{item.type}</span>
              <button
                onClick={() => onLaunch(item)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Launch
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LaunchGrid;