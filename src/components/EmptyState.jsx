import { PackageOpen, Plus, Sparkles } from 'lucide-react';

const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No data yet',
  description = 'Start by adding your first expense',
  action,
  actionLabel = 'Add Expense',
  secondaryAction,
  secondaryActionLabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 ring-8 ring-purple-50/50 dark:ring-purple-900/20">
        <Icon size={32} className="sm:w-9 sm:h-9" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1.5">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {action && (
          <button
            onClick={action}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-medium text-xs sm:text-sm rounded-xl shadow-md shadow-purple-600/20 transition-all duration-200"
          >
            <Plus size={16} />
            <span>{actionLabel}</span>
          </button>
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm rounded-xl transition-all duration-200"
          >
            <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
            <span>{secondaryActionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
