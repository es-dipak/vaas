import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  reportsData,
  reportTypeOptions,
  type ReportType,
  type ReportStatus,
} from '../data/mockData';

const PAGE_SIZE = 10;

// ── Type badge colors ──────────────────────────────────────────────────────────
const typeBadge: Record<ReportType, string> = {
  Executive:  'bg-purple-50 text-purple-700 border border-purple-200',
  Technical:  'bg-blue-50 text-blue-700 border border-blue-200',
  Compliance: 'bg-green-50 text-green-700 border border-green-200',
  Summary:    'bg-orange-50 text-orange-700 border border-orange-200',
};

// ── Status indicator ───────────────────────────────────────────────────────────
const statusConfig: Record<ReportStatus, { label: string; className: string }> = {
  Ready:      { label: 'Ready',      className: 'text-green-600' },
  Generating: { label: 'Generating', className: 'text-blue-600 animate-pulse' },
  Failed:     { label: 'Failed',     className: 'text-red-600' },
};

export function ReportsPage() {
  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [page, setPage]             = useState(1);

  const filtered = useMemo(() => {
    return reportsData.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                          r.target.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter === 'All Types' || r.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-slate-900">Reports</h1>
        <button className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors">
          <PlusIcon className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filters toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); resetPage(); }}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              {reportTypeOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronUpDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <span className="ml-auto text-xs text-slate-400">{filtered.length} reports</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Report Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Target</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Generated At</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                    No reports match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((report) => {
                  const status = statusConfig[report.status];
                  return (
                    <tr key={report.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* Report name */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <DocumentChartBarIcon className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{report.name}</p>
                            <p className={cn('text-xs mt-0.5', status.className)}>
                              {status.label}
                              {report.status === 'Ready' && (
                                <span className="text-slate-400 ml-1">· {report.size}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-3.5">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          typeBadge[report.type]
                        )}>
                          {report.type}
                        </span>
                      </td>

                      {/* Target */}
                      <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{report.target}</td>

                      {/* Generated At */}
                      <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{report.generatedAt}</td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-1">
                          {report.status === 'Ready' && (
                            <button
                              className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              title="Download report"
                            >
                              <ArrowDownTrayIcon className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                            title="More options"
                          >
                            <EllipsisVerticalIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} reports
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={cn(
                  'w-7 h-7 text-xs font-medium rounded-lg transition-colors',
                  n === page ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
