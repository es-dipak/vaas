import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { recentScansData } from '../data/mockData';
import { cn } from '@/utils/helpers';

const statusConfig = {
  completed: { label: 'Completed', className: 'bg-green-50 text-green-700' },
  running:   { label: 'Running',   className: 'bg-blue-50 text-blue-700' },
  failed:    { label: 'Failed',    className: 'bg-red-50 text-red-700' },
  scheduled: { label: 'Scheduled', className: 'bg-slate-100 text-slate-600' },
};

export function RecentScansTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">Recent Scans</h3>
        <Link
          to="/app/scans"
          className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          View All Scans
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Target</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Scan Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Findings</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Started At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentScansData.map((scan) => {
              const status = statusConfig[scan.status] ?? statusConfig.scheduled;
              return (
                <tr key={scan.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{scan.target}</td>
                  <td className="px-5 py-3.5 text-slate-500">{scan.scanType}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', status.className)}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium">
                    {scan.findings ?? <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{scan.startedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
