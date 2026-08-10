import { BellIcon, MagnifyingGlassIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/store/slices/uiSlice';
import { cn } from '@/utils/helpers';

export function Header() {
  const { sidebarCollapsed, toggleMobileSidebar } = useUIStore();

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center px-4 z-30 transition-all duration-300',
        // mobile: full width
        'left-0',
        // tablet (md–xl): icon sidebar = 64px
        'md:left-16',
        // desktop (xl+): full or collapsed sidebar
        sidebarCollapsed ? 'xl:left-16' : 'xl:left-56'
      )}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden p-2 mr-2 -ml-1 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 min-w-0 max-w-md">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1 ml-auto">
        <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <UserCircleIcon className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-700 leading-tight">John Doe</p>
            <p className="text-xs text-slate-400">john.doe@admin.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
