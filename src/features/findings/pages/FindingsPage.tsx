import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  findingsData,
  severityOptions,
  statusOptions,
  assetOptions,
  type Finding,
  type FindingSeverity,
  type FindingStatus,
} from '../data/mockData';
import { FindingDrawer } from '../components/FindingDrawer';


const PAGE_SIZE = 10;

// ── Severity ──────────────────────────────────────────────────────────────────
const severityBadge: Record<FindingSeverity, string> = {
  Critical: 'bg-red-100 text-red-700 border border-red-200',
  High:     'bg-orange-100 text-orange-700 border border-orange-200',
  Medium:   'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Low:      'bg-blue-100 text-blue-700 border border-blue-200',
  Info:     'bg-slate-100 text-slate-600 border border-slate-200',
};

const severityDot: Record<FindingSeverity, string> = {
  Critical: 'bg-red-500',
  High:     'bg-orange-500',
  Medium:   'bg-yellow-500',
  Low:      'bg-blue-500',
  Info:     'bg-slate-400',
};

// ── Status ────────────────────────────────────────────────────────────────────
const statusBadge: Record<FindingStatus, string> = {
  'Open':           'bg-slate-100 text-slate-600',
  'In Progress':    'bg-blue-50 text-blue-700',
  'Resolved':       'bg-green-50 text-green-700',
  'Accepted Risk':  'bg-purple-50 text-purple-700',
  'False Positive': 'bg-gray-100 text-gray-500',
};

export function FindingsPage() {
  const [search, setSearch]             = useState('');
  const [severityFilter, setSeverity]   = useState('All Severities');
  const [statusFilter, setStatus]       = useState('All Status');
  const [assetFilter, setAsset]         = useState('All Assets');
  const [page, setPage]                 = useState(1);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);

  const filtered = useMemo(() => {
    return findingsData.filter((f) => {
      const matchSearch   = f.title.toLowerCase().includes(search.toLowerCase()) ||
                            f.asset.toLowerCase().includes(search.toLowerCase());
      const matchSeverity = severityFilter === 'All Severities' || f.severity === severityFilter;
      const matchStatus   = statusFilter   === 'All Status'     || f.status   === statusFilter;
      const matchAsset    = assetFilter    === 'All Assets'     || f.asset    === assetFilter;
      return matchSearch && matchSeverity && matchStatus && matchAsset;
    });
  }, [search, severityFilter, statusFilter, assetFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  // severity counts for pills
  const counts = useMemo(() => ({
    Critical: findingsData.filter((f) => f.severity === 'Critical').length,
    High:     findingsData.filter((f) => f.severity === 'High').length,
    Medium:   findingsData.filter((f) => f.severity === 'Medium').length,
    Low:      findingsData.filter((f) => f.severity === 'Low').length,
  }), []);

  return (
    <>
    <FindingDrawer finding={selectedFinding} onClose={() => setSelectedFinding(null)} />
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Findings</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {findingsData.length} total findings across all assets
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Severity summary pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.entries(counts) as [FindingSeverity, number][]).map(([sev, count]) => (
          <button
            key={sev}
            onClick={() => { setSeverity(severityFilter === sev ? 'All Severities' : sev); resetPage(); }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
              severityFilter === sev
                ? severityBadge[sev] + ' ring-2 ring-offset-1 ring-current'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            )}
          >
            <span className={cn('w-2 h-2 rounded-full', severityDot[sev])} />
            {sev}
            <span className="font-semibold ml-0.5">{count}</span>
          </button>
        ))}
        {severityFilter !== 'All Severities' && (
          <button
            onClick={() => { setSeverity('All Severities'); resetPage(); }}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filters toolbar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search findings..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <FunnelIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />

            {/* Severity */}
            <SelectFilter value={severityFilter} onChange={(v) => { setSeverity(v); resetPage(); }} options={severityOptions} />

            {/* Status */}
            <SelectFilter value={statusFilter} onChange={(v) => { setStatus(v); resetPage(); }} options={statusOptions} />

            {/* Assets */}
            <SelectFilter value={assetFilter} onChange={(v) => { setAsset(v); resetPage(); }} options={assetOptions} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Discovered</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    No findings match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((finding) => (
                  <tr
                    key={finding.id}
                    onClick={() => setSelectedFinding(finding)}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                  >
                    {/* Severity */}
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                        severityBadge[finding.severity]
                      )}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', severityDot[finding.severity])} />
                        {finding.severity}
                      </span>
                    </td>

                    {/* Title + optional CVE */}
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-800 truncate max-w-xs">{finding.title}</p>
                      {finding.cve && (
                        <span className="text-xs text-slate-400 font-mono">{finding.cve}</span>
                      )}
                    </td>

                    {/* Asset */}
                    <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{finding.asset}</td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusBadge[finding.status]
                      )}>
                        {finding.status}
                      </span>
                    </td>

                    {/* Discovered */}
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{finding.discovered}</td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedFinding(finding); }}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} findings
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
    </>
  );
}

// ── Reusable select ────────────────────────────────────────────────────────────
function SelectFilter({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronUpDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
