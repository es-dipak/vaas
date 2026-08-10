import { NavLink } from 'react-router-dom';
import {
  Squares2X2Icon,
  ServerIcon,
  MagnifyingGlassCircleIcon,
  ExclamationTriangleIcon,
  DocumentChartBarIcon,
  WrenchScrewdriverIcon,
  SignalIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import { useUIStore } from '@/store/slices/uiSlice';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',     href: '/app/dashboard',    icon: Squares2X2Icon },
  { label: 'Assets',        href: '/app/assets',       icon: ServerIcon },
  { label: 'Scans',         href: '/app/scans',        icon: MagnifyingGlassCircleIcon },
  { label: 'Findings',      href: '/app/findings',     icon: ExclamationTriangleIcon },
  { label: 'Reports',       href: '/app/reports',      icon: DocumentChartBarIcon },
  { label: 'Clients/Teams', href: '/app/clients',      icon: UserGroupIcon },
  { label: 'Remediation',   href: '/app/remediation',  icon: WrenchScrewdriverIcon },
  { label: 'Monitoring',    href: '/app/monitoring',   icon: SignalIcon },
  { label: 'Integrations',  href: '/app/integrations', icon: PuzzlePieceIcon },
  { label: 'Settings',      href: '/app/settings',     icon: Cog6ToothIcon },
];

// ── Shared nav body ────────────────────────────────────────────────────────────
function NavBody({
  iconOnly,
  onNavClick,
  onToggle,
}: {
  iconOnly: boolean;
  onNavClick?: () => void;
  onToggle?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 flex-shrink-0 border-b border-slate-200',
        iconOnly ? 'justify-center px-2' : 'px-5 gap-2.5'
      )}>
        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <ShieldCheckIcon className="w-5 h-5 text-white" />
        </div>
        {!iconOnly && <span className="font-bold text-slate-900 text-lg tracking-tight">VaaS</span>}
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            title={iconOnly ? item.label : undefined}
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                iconOnly && 'justify-center',
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!iconOnly && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-slate-200 flex-shrink-0">
        <div className={cn(
          'flex items-center gap-3 px-4 py-3',
          iconOnly && 'justify-center px-2'
        )}>
          <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">JD</span>
          </div>
          {!iconOnly && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">john.doe@admin.com</p>
            </div>
          )}
        </div>
        {onToggle && (
          <div className="px-2 pb-2">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors text-sm"
            >
              {iconOnly ? (
                <ChevronRightIcon className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Main Sidebar component ─────────────────────────────────────────────────────
export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();

  return (
    <>
      {/* ── Mobile (< 768px): slide-in drawer ──────────────────────── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <div className={cn(
        'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-50 md:hidden transition-transform duration-300',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <NavBody iconOnly={false} onNavClick={() => setMobileSidebarOpen(false)} />
      </div>

      {/* ── Tablet (768px – 1280px): always icon-only ──────────────── */}
      <aside className="hidden md:flex xl:hidden fixed left-0 top-0 h-full w-16 bg-white border-r border-slate-200 flex-col z-40">
        <NavBody iconOnly={true} />
      </aside>

      {/* ── Desktop (1280px+): user-controlled collapse ─────────────── */}
      <aside className={cn(
        'hidden xl:flex fixed left-0 top-0 h-full bg-white border-r border-slate-200 flex-col z-40 transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-56'
      )}>
        <NavBody iconOnly={sidebarCollapsed} onToggle={toggleSidebar} />
      </aside>
    </>
  );
}
