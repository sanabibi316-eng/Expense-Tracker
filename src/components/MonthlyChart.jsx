import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { getMonthlyTotals, formatCurrency } from '../utils/helpers';

const MonthlyChart = ({ expenses }) => {
  const { currency } = useApp();
  const data = getMonthlyTotals(expenses);

  if (data.length === 0) return null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-0.5">
            {formatCurrency(payload[0].value, currency.symbol)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card animate-fade-in flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          Monthly Overview
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Spending trends over recent months
        </p>
      </div>

      <div className="h-52 sm:h-60 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="25%" margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis
              dataKey="month"
              tickFormatter={(v) => v.split(' ')[0].substring(0, 3)}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${currency.symbol}${v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}`}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.06)' }} />
            <Bar dataKey="total" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
