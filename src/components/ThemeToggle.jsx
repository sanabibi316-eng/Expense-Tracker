import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-7 w-13 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 p-0.5 cursor-pointer ${
        isDark ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon size={13} className="text-purple-600" />
        ) : (
          <Sun size={13} className="text-amber-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
