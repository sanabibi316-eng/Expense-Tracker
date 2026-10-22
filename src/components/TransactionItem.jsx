import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCategoryById, formatCurrency, formatDate } from '../utils/helpers';
import DeleteModal from './DeleteModal';

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

const TransactionItem = ({ expense, index = 0 }) => {
  const { deleteExpense, currency } = useApp();
  const [showDelete, setShowDelete] = useState(false);
  const category = getCategoryById(expense.category);

  return (
    <>
      <div
        className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group animate-fade-in"
        style={{ animationDelay: `${index * 35}ms` }}
      >
        {/* Category Icon */}
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg shadow-2xs"
          style={{ backgroundColor: category.bg }}
        >
          <span>{getCategoryEmoji(expense.category)}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {expense.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: category.bg,
                color: category.color,
              }}
            >
              {category.label}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {formatDate(expense.date)}
            </span>
          </div>
        </div>

        {/* Amount & Delete */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">
            -{formatCurrency(expense.amount, currency.symbol)}
          </span>
          <button
            onClick={() => setShowDelete(true)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors active:scale-95"
            aria-label="Delete expense"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteExpense(expense.id)}
        message={`Delete "${expense.description}" (${formatCurrency(expense.amount, currency.symbol)})? This action cannot be undone.`}
      />
    </>
  );
};

export default TransactionItem;
