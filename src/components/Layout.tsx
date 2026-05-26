import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import ToastContainer from './Toast';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex pt-14">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-56 bg-surface shadow-xl animate-fade-slide-in">
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <MobileBottomNav />
      <ToastContainer />

      <footer className="hidden md:block text-center py-6 text-xs text-text-muted border-t border-border">
        Made with ❤️ by 彭启轩 | 助力每一位同学的期末考试
      </footer>
    </div>
  );
}
