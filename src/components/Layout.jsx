import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Header from './Header';
import ExpenseForm from './ExpenseForm';
import { useApp } from '../context/AppContext';

const Layout = () => {
  const { sidebarOpen } = useApp();
  const [showQuickForm, setShowQuickForm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar />
      <Header onAddExpense={() => setShowQuickForm(true)} />
      <MobileNav />

      <main
        className={`transition-all duration-300 ease-in-out pb-24 lg:pb-10 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-8">
          <Outlet />
        </div>
      </main>

      {/* Global Quick Add Modal triggered from mobile Header */}
      <ExpenseForm isOpen={showQuickForm} onClose={() => setShowQuickForm(false)} />
    </div>
  );
};

export default Layout;
