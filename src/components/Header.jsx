import { Wallet, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

const Header = ({ onAddExpense }) => {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-purple-700 to-emerald-500 flex items-center justify-center shadow-md shadow-purple-500/20">
            <Wallet size={18} className="text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-none block">
              Spend<span className="text-purple-600 dark:text-purple-400">Wise</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none block mt-0.5">
              Expense Tracker
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {onAddExpense && (
            <button
              onClick={onAddExpense}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-medium text-xs rounded-xl shadow-sm transition-all"
              aria-label="Add expense"
            >
              <Plus size={15} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
