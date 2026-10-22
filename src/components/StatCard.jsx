const StatCard = ({ icon: Icon, label, value, subtitle, color = 'purple', delay = 0 }) => {
  const colors = {
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      icon: 'text-purple-600 dark:text-purple-400',
      ring: 'ring-purple-100 dark:ring-purple-500/20',
      badge: 'text-purple-600 dark:text-purple-400',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      icon: 'text-emerald-600 dark:text-emerald-400',
      ring: 'ring-emerald-100 dark:ring-emerald-500/20',
      badge: 'text-emerald-600 dark:text-emerald-400',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      icon: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-blue-100 dark:ring-blue-500/20',
      badge: 'text-blue-600 dark:text-blue-400',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      icon: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-100 dark:ring-amber-500/20',
      badge: 'text-amber-600 dark:text-amber-400',
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      icon: 'text-rose-600 dark:text-rose-400',
      ring: 'ring-rose-100 dark:ring-rose-500/20',
      badge: 'text-rose-600 dark:text-rose-400',
    },
  };

  const c = colors[color] || colors.purple;

  return (
    <div
      className="card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-2.5 sm:p-3 rounded-2xl ${c.bg} ring-1 ${c.ring} flex-shrink-0`}>
          <Icon size={22} className={c.icon} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
