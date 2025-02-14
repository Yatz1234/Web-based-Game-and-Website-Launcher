import React from 'react';
import { categories } from '../data';
import { LayoutGrid, Gamepad2, Globe, Heart, Clock, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const iconComponents = {
  LayoutGrid,
  Gamepad2,
  Globe,
  Heart,
  Clock,
  Settings,
};

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  const { theme } = useTheme();

  return (
    <div className={`w-64 ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } h-screen p-4`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Launcher</h1>
        <ThemeToggle />
      </div>
      <nav>
        {categories.map((category) => {
          const IconComponent = iconComponents[category.icon as keyof typeof iconComponents];
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IconComponent size={20} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;