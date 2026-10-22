import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  TrendingDown,
  Receipt,
  CalendarDays,
  Plus,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  formatCurrency,
  getTotalExpenses,
  getMonthlyExpenses,
  getCurrentMonth,
  getMonthName,
} from '../utils/helpers';
import StatCard from '../components/StatCard';
import TransactionList from '../components/TransactionList';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';
import ExpenseForm from '../components/ExpenseForm';
import QuickAddButton from '../components/QuickAddButton';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { expenses, currency, loadSampleData } = useApp();
  const [showForm, setShowForm] = useState(false);

  const stats = useMemo(() => {
    const monthly = getMonthlyExpenses(expenses);
    const totalAll = getTotalExpenses(expenses);
    const totalMonth = getTotalExpenses(monthly);
    const currentMonth = getMonthName(getCurrentMonth());

    return {
      totalAll,
      totalMonth,
      transactionCount: expenses.length,
      monthlyCount: monthly.length,
      currentMonth,
    };
  }, [expenses]);

  const recentExpenses = useMemo(() => {
    return expenses.slice(0, 5);
  }, [expenses]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here's your spending overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {expenses.length === 0 && (
            <button
              onClick={loadSampleData}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl text-sm transition-all active:scale-95"
            >
              <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
              <span>Load Demo Data</span>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          icon={Wallet}
          label="Total Spending"
          value={formatCurrency(stats.totalAll, currency.symbol)}
          subtitle={`${stats.transactionCount} transactions`}
          color="purple"
          delay={0}
        />
        <StatCard
          icon={TrendingDown}
          label="This Month"
          value={formatCurrency(stats.totalMonth, currency.symbol)}
          subtitle={stats.currentMonth}
          color="emerald"
          delay={60}
        />
        <StatCard
          icon={Receipt}
          label="Transactions"
          value={stats.transactionCount}
          subtitle={`${stats.monthlyCount} this month`}
          color="blue"
          delay={120}
        />
        <StatCard
          icon={CalendarDays}
          label="Daily Average"
          value={formatCurrency(
            stats.monthlyCount > 0
              ? (stats.totalMonth / new Date().getDate()).toFixed(2)
              : 0,
            currency.symbol
          )}
          subtitle="This month"
          color="amber"
          delay={180}
        />
      </div>

      {/* Charts Row - only when there is data */}
      {expenses.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
          <CategoryChart expenses={expenses} />
          <MonthlyChart expenses={expenses} />
        </div>
      )}

      {/* Recent Transactions Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Transactions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Latest activity recorded in your account
            </p>
          </div>
          {expenses.length > 5 && (
            <Link
              to="/transactions"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline inline-flex items-center gap-1 transition-colors"
            >
              View all ({expenses.length}) →
            </Link>
          )}
        </div>

        {expenses.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="No expenses yet"
            description="Add your first expense or load demo data to explore your spending overview"
            action={() => setShowForm(true)}
            actionLabel="Add Expense"
            secondaryAction={loadSampleData}
            secondaryActionLabel="Load Demo Data"
          />
        ) : (
          <TransactionList
            expenses={recentExpenses}
            emptyAction={() => setShowForm(true)}
          />
        )}
      </div>

      {/* Quick Add FAB on mobile */}
      <QuickAddButton onClick={() => setShowForm(true)} />

      {/* Expense Form Modal */}
      <ExpenseForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default Dashboard;
