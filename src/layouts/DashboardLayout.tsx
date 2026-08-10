import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { Header } from '@/components/layout/Header/Header';
import { useUIStore } from '@/store/slices/uiSlice';
import { cn } from '@/utils/helpers';

export function DashboardLayout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header />
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          // mobile: no offset
          'pl-0',
          // tablet (md–xl): icon sidebar = 64px
          'md:pl-16',
          // desktop (xl+): full or collapsed
          sidebarCollapsed ? 'xl:pl-16' : 'xl:pl-56'
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
