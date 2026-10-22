import { useState, useEffect, useRef } from 'react';
import { X, Plus, CalendarDays, DollarSign, Tag, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../utils/constants';
import { getDateRange } from '../utils/helpers';

const ExpenseForm = ({ isOpen, onClose }) => {
  const { addExpense, currency } = useApp();
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: '',
    date: getDateRange(),
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const amountRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ amount: '', description: '', category: '', date: getDateRange() });
      setErrors({});
      setTimeout(() => amountRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    const amount = parseFloat(form.amount);

    if (!form.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    } else if (amount > 999999999) {
      newErrors.amount = 'Amount is too large';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (form.description.trim().length > 100) {
      newErrors.description = 'Description must be 100 characters or less';
    }

    if (!form.category) {
      newErrors.category = 'Please choose a category';
    }

    if (!form.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      addExpense({
        amount: form.amount,
        description: form.description.trim(),
        category: form.category,
        date: form.date,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center modal-overlay p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[92vh] sm:max-h-[88vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
        {/* Handle bar for mobile drag affordance */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Add New Expense
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter transaction details to update your records
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Amount */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <DollarSign size={13} />
              Amount ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg select-none">
                {currency.symbol}
              </span>
              <input
                ref={amountRef}
                type="number"
                step="0.01"
                min="0"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0.00"
                className={`w-full pl-9 pr-4 py-3 rounded-xl border text-xl font-bold transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700
                  ${
                    errors.amount
                      ? 'border-red-400 dark:border-red-500 focus:border-red-500'
                      : 'border-slate-200 dark:border-slate-700 focus:border-purple-500'
                  }`}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500 font-medium mt-1 animate-fade-in">{errors.amount}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <FileText size={13} />
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="e.g., Grocery shopping, Gas, Coffee"
              maxLength={100}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400
                ${
                  errors.description
                    ? 'border-red-400 dark:border-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-purple-500'
                }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 font-medium mt-1 animate-fade-in">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <Tag size={13} />
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleChange('category', cat.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-xs active:scale-95 text-left
                    ${
                      form.category === cat.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 ring-1 ring-purple-500 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <span>{getCategoryEmoji(cat.id)}</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 truncate text-xs font-medium">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-xs text-red-500 font-medium mt-1 animate-fade-in">{errors.category}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <CalendarDays size={13} />
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              max={getDateRange()}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white
                ${
                  errors.date
                    ? 'border-red-400 dark:border-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-purple-500'
                }`}
            />
            {errors.date && (
              <p className="text-xs text-red-500 font-medium mt-1 animate-fade-in">{errors.date}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <Plus size={18} />
              <span>{isSubmitting ? 'Recording...' : 'Add Expense'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const getCategoryEmoji = (id) => {
  const emojis = {
    food: '🍕',
    transport: '🚗',
    shopping: '🛍️',
    bills: '📄',
    entertainment: '🎮',
    health: '❤️',
    education: '📚',
    other: '📦',
  };
  return emojis[id] || '📦';
};

export default ExpenseForm;
