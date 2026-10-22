import { createContext, useContext, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId, getDateRange } from '../utils/helpers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const SAMPLE_EXPENSES = [
  {
    description: 'Grocery Shopping at Whole Foods',
    amount: '84.50',
    category: 'food',
    date: new Date(Date.now() - 0 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'Monthly Metro Transit Pass',
    amount: '45.00',
    category: 'transport',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'Electric & Utility Bill',
    amount: '112.30',
    category: 'bills',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'Weekend Dinner with Friends',
    amount: '68.75',
    category: 'food',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'Pharmacy & Vitamins',
    amount: '32.40',
    category: 'health',
    date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'Online Course Subscription',
    amount: '29.99',
    category: 'education',
    date: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'Movie Night & Snacks',
    amount: '24.50',
    category: 'entertainment',
    date: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
  },
  {
    description: 'New Running Shoes',
    amount: '95.00',
    category: 'shopping',
    date: new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0],
  },
];

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage('spendwise-expenses', []);
  const [theme, setTheme] = useLocalStorage('spendwise-theme', 'light');
  const [currency, setCurrency] = useLocalStorage('spendwise-currency', {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  });
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('spendwise-sidebar', true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const addExpense = useCallback(
    (expense) => {
      const newExpense = {
        ...expense,
        id: generateId(),
        amount: parseFloat(expense.amount).toFixed(2),
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id) => {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    },
    [setExpenses]
  );

  const clearAllExpenses = useCallback(() => {
    setExpenses([]);
  }, [setExpenses]);

  const loadSampleData = useCallback(() => {
    const samples = SAMPLE_EXPENSES.map((exp) => ({
      ...exp,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }));
    setExpenses(samples);
  }, [setExpenses]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

  const value = {
    expenses,
    theme,
    currency,
    sidebarOpen,
    addExpense,
    deleteExpense,
    clearAllExpenses,
    loadSampleData,
    toggleTheme,
    setCurrency,
    toggleSidebar,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
