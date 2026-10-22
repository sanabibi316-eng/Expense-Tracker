import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';
import { getCategoryTotals, formatCurrency } from '../utils/helpers';

const CategoryChart = ({ expenses }) => {
  const { currency } = useApp();
  const data = getCategoryTotals(expenses);

  if (data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.total, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const pct = total > 0 ? ((d.total / total) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white dark:bg-slate-800 px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <p className="text-xs font-bold text-slate-900 dark:text-white">{d.label}</p>
          </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
            {formatCurrency(d.total, currency.symbol)}{' '}
            <span className="text-slate-400 font-normal">({pct}%)</span>
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
          Spending by Category
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Distribution across spending categories
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 my-auto">
        {/* Donut Chart */}
        <div className="w-44 h-44 relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="total"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Total
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white px-2 truncate max-w-[110px]">
              {formatCurrency(total, currency.symbol)}
            </span>
          </div>
        </div>

        {/* Legend / Breakdown list */}
        <div className="flex-1 w-full space-y-2.5">
          {data.slice(0, 5).map((cat, i) => {
            const pct = total > 0 ? ((cat.total / total) * 100).toFixed(1) : 0;
            return (
              <div
                key={cat.id}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-3 h-3 rounded-md flex-shrink-0 shadow-xs"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {cat.label}
                    </span>
                    <span className="text-slate-400 font-semibold ml-2 text-[11px]">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[65px] text-right">
                  {formatCurrency(cat.total, currency.symbol)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
