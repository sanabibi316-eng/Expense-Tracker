import { useMemo } from 'react';
import {
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  formatCurrency,
  getTotalExpenses,
  getMonthlyExpenses,
  getCategoryTotals,
  getMonthlyTotals,
  getDailyAverage,
  getHighestCategory,
  getCurrentMonth,
  getMonthName,
} from '../utils/helpers';
import StatCard from '../components/StatCard';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';
import EmptyState from '../components/EmptyState';

const Analytics = () => {
  const { expenses, currency, loadSampleData } = useApp();

  const analytics = useMemo(() => {
    if (expenses.length === 0) return null;

    const monthly = getMonthlyExpenses(expenses);
    const totalAll = getTotalExpenses(expenses);
    const totalMonth = getTotalExpenses(monthly);
    const dailyAvg = getDailyAverage(monthly);
    const highest = getHighestCategory(expenses);
    const categoryTotals = getCategoryTotals(expenses);
    const monthlyTotals = getMonthlyTotals(expenses);

    // Calculate month-over-month change
    let momChange = 0;
    if (monthlyTotals.length >= 2) {
      const current = monthlyTotals[monthlyTotals.length - 1].total;
      const previous = monthlyTotals[monthlyTotals.length - 2].total;
      if (previous > 0) {
        momChange = (((current - previous) / previous) * 100).toFixed(1);
      }
    }

    return {
      totalAll,
      totalMonth,
      dailyAvg,
      highest,
      categoryTotals,
      monthlyTotals,
      momChange,
      currentMonth: getMonthName(getCurrentMonth()),
    };
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Insights and trends in your spending patterns
          </p>
        </div>
        <div className="card">
          <EmptyState
            icon={BarChart3}
            title="No spending data to analyze"
            description="Add your first expenses or load demo data to view charts, statistics, and category breakdowns"
            secondaryAction={loadSampleData}
            secondaryActionLabel="Load Demo Data"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Insights and trends in your spending patterns
          </p>
        </div>

        <button
          onClick={loadSampleData}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl text-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Reload Demo Data</span>
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          icon={TrendingUp}
          label="Total Spent"
          value={formatCurrency(analytics.totalAll, currency.symbol)}
          subtitle="All recorded time"
          color="purple"
          delay={0}
        />
        <StatCard
          icon={Target}
          label="Monthly Spending"
          value={formatCurrency(analytics.totalMonth, currency.symbol)}
          subtitle={analytics.currentMonth}
          color="emerald"
          delay={60}
        />
        <StatCard
          icon={Clock}
          label="Daily Average"
          value={formatCurrency(analytics.dailyAvg, currency.symbol)}
          subtitle="Active days this month"
          color="blue"
          delay={120}
        />
        <StatCard
          icon={ArrowUpRight}
          label="MoM Change"
          value={`${parseFloat(analytics.momChange) > 0 ? '+' : ''}${analytics.momChange}%`}
          subtitle="vs previous month"
          color={parseFloat(analytics.momChange) > 0 ? 'rose' : 'emerald'}
          delay={180}
        />
      </div>

      {/* Top Spending Category Card */}
      {analytics.highest && (
        <div className="card animate-fade-in bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-900 dark:to-purple-950/20 border-purple-100 dark:border-purple-900/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3">
            Top Spending Category
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0"
                style={{ backgroundColor: analytics.highest.bg }}
              >
                {getCategoryEmoji(analytics.highest.id)}
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {analytics.highest.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {formatCurrency(analytics.highest.total, currency.symbol)} across{' '}
                  <span className="font-semibold">{analytics.highest.count}</span> transactions
                </p>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
              <p
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: analytics.highest.color }}
              >
                {((analytics.highest.total / analytics.totalAll) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-slate-400 font-medium">of total spending</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
        <CategoryChart expenses={expenses} />
        <MonthlyChart expenses={expenses} />
      </div>

      {/* Category Breakdown Table */}
      <div className="card animate-fade-in !p-0 overflow-hidden">
        <div className="flex items-center gap-2 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
          <PieChartIcon size={18} className="text-purple-600 dark:text-purple-400" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Category Breakdown Table
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                  Count
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Share
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {analytics.categoryTotals.map((cat) => {
                const pct = ((cat.total / analytics.totalAll) * 100).toFixed(1);
                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                          style={{ backgroundColor: cat.bg }}
                        >
                          {getCategoryEmoji(cat.id)}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white truncate">
                          {cat.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {formatCurrency(cat.total, currency.symbol)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                      {cat.count}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: cat.color,
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-bold min-w-[42px] text-right"
                          style={{ color: cat.color }}
                        >
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

export default Analytics;
