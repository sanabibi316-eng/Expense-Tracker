import { useState } from 'react';
import {
  Palette,
  Coins,
  Trash2,
  Info,
  Heart,
  Sparkles,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import CurrencySelector from '../components/CurrencySelector';
import DeleteModal from '../components/DeleteModal';

const Settings = () => {
  const { theme, currency, expenses, clearAllExpenses, loadSampleData } = useApp();
  const [showClearModal, setShowClearModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportJSON = () => {
    if (expenses.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(expenses, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `spendwise-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your preferences and manage application data
        </p>
      </div>

      {/* Appearance */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Palette size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Appearance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize interface color mode
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Dark Mode
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active mode: <span className="font-semibold capitalize text-purple-600 dark:text-purple-400">{theme}</span>
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Currency */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Coins size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Display Currency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selected: {currency.symbol} {currency.name} ({currency.code})
            </p>
          </div>
        </div>
        <CurrencySelector />
      </div>

      {/* Data Management */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Trash2 size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Data Management
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage transactions, backup data, or restore demo samples
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Load Demo Data */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Load Demo Sample Data
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Populates your tracker with sample transactions across multiple categories
              </p>
            </div>
            <button
              onClick={() => {
                loadSampleData();
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-medium text-xs rounded-xl transition-all shadow-xs"
            >
              <Sparkles size={14} />
              <span>{copied ? 'Loaded!' : 'Load Samples'}</span>
            </button>
          </div>

          {/* Backup Data */}
          {expenses.length > 0 && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Export Backup (JSON)
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Save a copy of all {expenses.length} transaction records to your device
                </p>
              </div>
              <button
                onClick={exportJSON}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium text-xs rounded-xl transition-all active:scale-95"
              >
                <Download size={14} />
                <span>Export JSON</span>
              </button>
            </div>
          )}

          {/* Clear Data */}
          <div className="p-4 rounded-xl bg-red-50/40 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                  Clear All Expenses
                </p>
                <p className="text-xs text-red-500/80 dark:text-red-400/70 mt-0.5">
                  {expenses.length} transaction{expenses.length !== 1 ? 's' : ''} stored locally in this browser
                </p>
              </div>
              <button
                onClick={() => setShowClearModal(true)}
                disabled={expenses.length === 0}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white text-xs font-semibold rounded-xl transition-colors disabled:cursor-not-allowed active:scale-95 shadow-xs"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Card */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Info size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              About SpendWise
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal expense management made simple
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
            <span className="text-slate-500 dark:text-slate-400">Application</span>
            <span className="font-semibold text-slate-900 dark:text-white">SpendWise Tracker</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
            <span className="text-slate-500 dark:text-slate-400">Version</span>
            <span className="font-semibold text-slate-900 dark:text-white">2.0.0 (Responsive Modern UI)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
            <span className="text-slate-500 dark:text-slate-400">Storage Engine</span>
            <span className="font-semibold text-slate-900 dark:text-white">localStorage (Private & Client-Side)</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            Built with <Heart size={13} className="text-red-500 fill-red-500" /> for effortless money tracking
          </p>
        </div>
      </div>

      {/* Clear Data Modal */}
      <DeleteModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={clearAllExpenses}
        title="Clear All Transactions"
        message={`This will permanently remove all ${expenses.length} transaction records from your browser. Are you sure you want to proceed?`}
      />
    </div>
  );
};

export default Settings;
