import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  title: string;
}

export const DashboardLayout = ({ title }: DashboardLayoutProps): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(5,150,105,0.08),_transparent_28%),linear-gradient(180deg,_#f8fafc,_#eef2f7)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_right,_rgba(5,150,105,0.16),_transparent_28%),linear-gradient(180deg,_#0b1120,_#0f172a)] dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};