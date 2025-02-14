import React from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SearchBarProps {
  search: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearch }) => {
  const { theme } = useTheme();

  return (
    <div className="relative">
      <Search 
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} 
        size={20} 
      />
      <input
        type="text"
        placeholder="Search games and websites..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 rounded-lg ${
          theme === 'dark' 
            ? 'bg-gray-700 text-white placeholder-gray-400' 
            : 'bg-gray-100 text-gray-900 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
}

export default SearchBar;