import { CATEGORIES, MONTHS } from './constants';

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatCurrency = (amount, symbol = '$') => {
  const num = parseFloat(amount);
  if (isNaN(num)) return `${symbol}0.00`;
  return `${symbol}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const dayMs = 86400000;

  if (diff < dayMs && date.getDate() === now.getDate()) return 'Today';
  if (diff < 2 * dayMs && date.getDate() === now.getDate() - 1) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

export const formatFullDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getCategoryById = (id) => {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
};

export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthName = (monthStr) => {
  const [year, month] = monthStr.split('-');
  return `${MONTHS[parseInt(month) - 1]} ${year}`;
};

export const filterExpenses = (expenses, { search = '', category = '', dateFrom = '', dateTo = '', month = '' }) => {
  return expenses.filter((exp) => {
    if (search && !exp.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && exp.category !== category) return false;
    if (dateFrom && exp.date < dateFrom) return false;
    if (dateTo && exp.date > dateTo) return false;
    if (month) {
      const expMonth = exp.date.substring(0, 7);
      if (expMonth !== month) return false;
    }
    return true;
  });
};

export const getTotalExpenses = (expenses) => {
  return expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
};

export const getMonthlyExpenses = (expenses) => {
  const current = getCurrentMonth();
  return expenses.filter((exp) => exp.date.startsWith(current));
};

export const getCategoryTotals = (expenses) => {
  const totals = {};
  expenses.forEach((exp) => {
    const cat = getCategoryById(exp.category);
    if (!totals[exp.category]) {
      totals[exp.category] = { ...cat, total: 0, count: 0 };
    }
    totals[exp.category].total += parseFloat(exp.amount);
    totals[exp.category].count += 1;
  });
  return Object.values(totals).sort((a, b) => b.total - a.total);
};

export const getMonthlyTotals = (expenses) => {
  const totals = {};
  expenses.forEach((exp) => {
    const month = exp.date.substring(0, 7);
    if (!totals[month]) totals[month] = 0;
    totals[month] += parseFloat(exp.amount);
  });

  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, total]) => ({
      month: getMonthName(month),
      monthKey: month,
      total: parseFloat(total.toFixed(2)),
    }));
};

export const getDailyAverage = (expenses) => {
  if (expenses.length === 0) return 0;
  const dates = [...new Set(expenses.map((e) => e.date))];
  const total = getTotalExpenses(expenses);
  return total / dates.length;
};

export const getHighestCategory = (expenses) => {
  const totals = getCategoryTotals(expenses);
  return totals.length > 0 ? totals[0] : null;
};

export const getDateRange = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};