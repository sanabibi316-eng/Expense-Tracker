import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useApp();
  const location = useLocation();

  return (
    <aside
      className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out border-r select-none
        ${sidebarOpen ? 'w-64' : 'w-20'}
        bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
        border-slate-200/90 dark:border-slate-800`}
    >
      {/* Brand Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-purple-700 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
            <Wallet size={20} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Spend<span className="text-purple-600 dark:text-purple-400">Wise</span>
              </h1>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-0.5">
                Expense Tracker
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                }
                ${!sidebarOpen ? 'justify-center' : ''}
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-600 dark:bg-purple-400 rounded-r-full" />
              )}
              <Icon
                size={20}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                }`}
              />
              {sidebarOpen && (
                <span className="text-sm truncate">{item.label}</span>
              )}
              {!sidebarOpen && (
                <div className="fixed left-20 ml-2 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-slate-700">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
        {sidebarOpen ? (
          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <ThemeToggle />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors text-xs font-medium"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft size={16} />
              <span>Collapse Sidebar</span>
            </>
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
