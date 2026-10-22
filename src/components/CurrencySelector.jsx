import { CURRENCIES } from '../utils/constants';
import { useApp } from '../context/AppContext';
import { Check } from 'lucide-react';

const CurrencySelector = () => {
  const { currency, setCurrency } = useApp();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
      {CURRENCIES.map((c) => {
        const isActive = currency.code === c.code;
        return (
          <button
            key={c.code}
            onClick={() => setCurrency(c)}
            className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 active:scale-95
              ${
                isActive
                  ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/30 ring-1 ring-purple-600 text-purple-700 dark:text-purple-300'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
          >
            {isActive && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center shadow-xs">
                <Check size={10} className="text-white" strokeWidth={3} />
              </div>
            )}
            <span className="text-xl font-bold tracking-tight">{c.symbol}</span>
            <span className="text-[11px] font-semibold opacity-75 mt-0.5">
              {c.code}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-full">
              {c.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CurrencySelector;
