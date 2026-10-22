import { useState } from 'react';
import { Search, SlidersHorizontal, X, Calendar } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

const SearchFilter = ({ filters, onFiltersChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({ search: '', category: '', dateFrom: '', dateTo: '' });
  };

  const hasActiveFilters = filters.category || filters.dateFrom || filters.dateTo;
  const activeCount = [filters.category, filters.dateFrom, filters.dateTo].filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* Search and filter toggle */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by description..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors shadow-2xs"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3.5 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 text-sm font-semibold whitespace-nowrap active:scale-95 shadow-2xs
            ${
              showFilters || hasActiveFilters
                ? 'border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 space-y-4 animate-slide-up shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter Transactions
            </h4>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Category filter */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => updateFilter('category', '')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${
                    !filters.category
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${
                      filters.category === cat.id
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date range filter */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 block flex items-center gap-1.5">
              <Calendar size={13} />
              <span>Date Range</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">From</span>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">To</span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
