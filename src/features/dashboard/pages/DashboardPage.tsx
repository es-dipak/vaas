import { CalendarDaysIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { StatsCard } from '../components/StatsCard';
import { FindingsBySeverityChart } from '../components/FindingsBySeverityChart';
import { FindingsOverTimeChart } from '../components/FindingsOverTimeChart';
import { RecentScansTable } from '../components/RecentScansTable';
import { statsData } from '../data/mockData';

export function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
            <CalendarDaysIcon className="w-4 h-4 text-slate-400" />
            <span>May 1, 2024 — May 31, 2024</span>
          </div>
          <button className="p-2 text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FindingsBySeverityChart />
        <FindingsOverTimeChart />
      </div>

      {/* Recent scans */}
      <RecentScansTable />
    </div>
  );
}
