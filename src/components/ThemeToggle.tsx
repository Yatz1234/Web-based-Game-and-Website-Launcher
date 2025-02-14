import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors hover:bg-opacity-10 hover:bg-white"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="text-gray-300" size={20} />
      ) : (
        <Moon className="text-gray-600" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;