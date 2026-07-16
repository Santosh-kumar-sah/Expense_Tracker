import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AmbientBackground } from './AmbientBackground';
import { AiAssistantDrawer } from './AiAssistantDrawer';

interface DashboardLayoutProps {
  title: string;
}

export const DashboardLayout = ({ title }: DashboardLayoutProps): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white">
      {/* Phase 4: Ambient background — all glass panels sit on top of this */}
      <AmbientBackground />

      {/* App background gradient underneath the ambient layer */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(5,150,105,0.08), transparent 28%), linear-gradient(180deg, #f8fafc, #eef2f7)',
        }}
      />
      <div
        className="fixed inset-0 -z-10 dark:block hidden"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(5,150,105,0.16), transparent 28%), linear-gradient(180deg, #0b1120, #0f172a)',
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Globally accessible AI Assistant floating trigger and drawer */}
      <AiAssistantDrawer />
    </div>
  );
};