import { useState, useMemo } from 'react';
import { Plus, ArrowLeftRight, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { filterExpenses, formatCurrency, getTotalExpenses } from '../utils/helpers';
import TransactionList from '../components/TransactionList';
import SearchFilter from '../components/SearchFilter';
import ExpenseForm from '../components/ExpenseForm';
import QuickAddButton from '../components/QuickAddButton';

const Transactions = () => {
  const { expenses, currency, loadSampleData } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateFrom: '',
    dateTo: '',
  });

  const filteredExpenses = useMemo(() => {
    return filterExpenses(expenses, filters);
  }, [expenses, filters]);

  const filteredTotal = useMemo(() => {
    return getTotalExpenses(filteredExpenses);
  }, [filteredExpenses]);

  const isFiltered =
    Boolean(filters.search || filters.category || filters.dateFrom || filters.dateTo);

  const exportCSV = () => {
    if (expenses.length === 0) return;
    const headers = ['Description', 'Amount', 'Category', 'Date'];
    const rows = filteredExpenses.map((e) => [
      `"${e.description.replace(/"/g, '""')}"`,
      e.amount,
      e.category,
      e.date,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `spendwise-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
            <span>
              {isFiltered
                ? `Showing ${filteredExpenses.length} of ${expenses.length} transactions`
                : `${expenses.length} total transactions`}
            </span>
            {isFiltered && (
              <span className="font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-md text-xs">
                Total: {formatCurrency(filteredTotal, currency.symbol)}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {expenses.length > 0 && (
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all active:scale-95 shadow-2xs"
              title="Export as CSV"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          )}

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 active:scale-95 text-sm"
          >
            <Plus size={18} />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      {expenses.length > 0 && (
        <SearchFilter filters={filters} onFiltersChange={setFilters} />
      )}

      {/* Transactions List */}
      <div className="card !p-0 overflow-hidden shadow-sm">
        {filteredExpenses.length > 0 && (
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 font-medium">
                <ArrowLeftRight size={13} />
                <span>Sorted by date (newest first)</span>
              </div>
              <span className="font-semibold">
                {filteredExpenses.length} record{filteredExpenses.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        <TransactionList
          expenses={filteredExpenses}
          emptyAction={() => setShowForm(true)}
          emptyTitle={isFiltered ? 'No matching transactions' : 'No transactions yet'}
          emptyDescription={
            isFiltered
              ? 'Try adjusting your search query or filter settings'
              : 'Start tracking your spending by adding your first expense transaction'
          }
          secondaryAction={expenses.length === 0 ? loadSampleData : undefined}
          secondaryActionLabel={expenses.length === 0 ? 'Load Demo Data' : undefined}
        />
      </div>

      {/* Quick Add FAB on mobile */}
      <QuickAddButton onClick={() => setShowForm(true)} />

      {/* Expense Form Modal */}
      <ExpenseForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default Transactions;
