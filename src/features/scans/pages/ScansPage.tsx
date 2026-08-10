import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  scansData,
  scanTypeOptions,
  scanStatusOptions,
  scanClientOptions,
  type ScanType,
  type ScanStatus,
  type ScanFindings,
} from '../data/mockData';
import { NewScanWizard } from '../components/NewScanWizard';

const PAGE_SIZE = 10;

// ── Scan type badge ─────────────────────────────────────────────────────────────
const typeBadge: Record<ScanType, string> = {
  'Full Scan': 'bg-purple-50 text-purple-700 border border-purple-200',
  'Web App':   'bg-blue-50 text-blue-700 border border-blue-200',
  'Network':   'bg-teal-50 text-teal-700 border border-teal-200',
  'API':       'bg-orange-50 text-orange-700 border border-orange-200',
  'SSL/TLS':   'bg-green-50 text-green-700 border border-green-200',
};

// ── Scan status ─────────────────────────────────────────────────────────────────
const statusConfig: Record<ScanStatus, { badge: string; dot: string }> = {
  Completed: { badge: 'bg-green-50 text-green-700',   dot: 'bg-green-500' },
  Running:   { badge: 'bg-blue-50 text-blue-700',     dot: 'bg-blue-500 animate-pulse' },
  Failed:    { badge: 'bg-red-50 text-red-700',       dot: 'bg-red-500' },
  Queued:    { badge: 'bg-yellow-50 text-yellow-700', dot: 'bg-yellow-400' },
  Cancelled: { badge: 'bg-slate-100 text-slate-500',  dot: 'bg-slate-300' },
};

// ── Summary pill config ─────────────────────────────────────────────────────────
const pillConfig: { label: ScanStatus; dot: string; base: string; active: string }[] = [
  { label: 'Completed', dot: 'bg-green-500',  base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-green-50 text-green-700 border-green-200 ring-2 ring-offset-1 ring-green-400' },
  { label: 'Running',   dot: 'bg-blue-500',   base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-blue-50 text-blue-700 border-blue-200 ring-2 ring-offset-1 ring-blue-400' },
  { label: 'Failed',    dot: 'bg-red-500',    base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-red-50 text-red-700 border-red-200 ring-2 ring-offset-1 ring-red-400' },
  { label: 'Queued',    dot: 'bg-yellow-400', base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-yellow-50 text-yellow-700 border-yellow-200 ring-2 ring-offset-1 ring-yellow-400' },
];

// ── Findings pills ──────────────────────────────────────────────────────────────
function FindingsPills({ findings }: { findings: ScanFindings }) {
  const total = findings.critical + findings.high + findings.medium + findings.low;
  if (total === 0) return <span className="text-xs text-slate-400">—</span>;
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {findings.critical > 0 && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">
          {findings.critical}C
        </span>
      )}
      {findings.high > 0 && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-700">
          {findings.high}H
        </span>
      )}
      {findings.medium > 0 && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">
          {findings.medium}M
        </span>
      )}
      {findings.low > 0 && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
          {findings.low}L
        </span>
      )}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────────
export function ScansPage() {
  const [search, setSearch]           = useState('');
  const [typeFilter, setType]         = useState('All Types');
  const [statusFilter, setStatus]     = useState('All Status');
  const [clientFilter, setClient]     = useState('All Clients');
  const [statusPill, setStatusPill]   = useState('');
  const [page, setPage]               = useState(1);
  const [wizardOpen, setWizardOpen]   = useState(false);

  const counts = useMemo(() => ({
    Completed: scansData.filter((s) => s.status === 'Completed').length,
    Running:   scansData.filter((s) => s.status === 'Running').length,
    Failed:    scansData.filter((s) => s.status === 'Failed').length,
    Queued:    scansData.filter((s) => s.status === 'Queued').length,
    Cancelled: scansData.filter((s) => s.status === 'Cancelled').length,
  }), []);

  const filtered = useMemo(() => {
    return scansData.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.target.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter   === 'All Types'   || s.type   === typeFilter;
      const matchStatus = statusFilter === 'All Status'  || s.status === statusFilter;
      const matchClient = clientFilter === 'All Clients' || s.client === clientFilter;
      const matchPill   = statusPill   === ''            || s.status === statusPill;
      return matchSearch && matchType && matchStatus && matchClient && matchPill;
    });
  }, [search, typeFilter, statusFilter, clientFilter, statusPill]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const resetPage  = () => setPage(1);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Scans</h1>
          <p className="text-sm text-slate-500 mt-0.5">{scansData.length} total scans</p>
        </div>
        <button
          onClick={() => setWizardOpen(true)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Scan
        </button>
      </div>

      {/* Summary pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {pillConfig.map(({ label, dot, base, active }) => (
          <button
            key={label}
            onClick={() => { setStatusPill(statusPill === label ? '' : label); resetPage(); }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
              statusPill === label ? active : base
            )}
          >
            <span className={cn('w-2 h-2 rounded-full', dot)} />
            {label}
            <span className="font-semibold ml-0.5">{counts[label]}</span>
          </button>
        ))}
        {statusPill !== '' && (
          <button
            onClick={() => { setStatusPill(''); resetPage(); }}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filters toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-48">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search scans..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <FunnelIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <SelectFilter value={clientFilter} onChange={(v) => { setClient(v);  resetPage(); }} options={scanClientOptions} />
            <SelectFilter value={typeFilter}   onChange={(v) => { setType(v);    resetPage(); }} options={scanTypeOptions} />
            <SelectFilter value={statusFilter} onChange={(v) => { setStatus(v);  resetPage(); }} options={scanStatusOptions} />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} scans</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Scan</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Findings</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Started</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="px-5 py-3 w-24" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                    No scans match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((scan) => {
                  const { badge, dot } = statusConfig[scan.status];
                  return (
                    <tr key={scan.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* Scan name + target */}
                      <td className="px-5 py-3.5 max-w-xs">
                        <p className="font-medium text-slate-800 truncate">{scan.name}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{scan.target}</p>
                      </td>

                      {/* Client */}
                      <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">{scan.client}</td>

                      {/* Type */}
                      <td className="px-5 py-3.5">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          typeBadge[scan.type]
                        )}>
                          {scan.type}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        {scan.status === 'Running' && scan.progress !== undefined ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dot)} />
                              <span className={cn('text-xs font-medium', badge.split(' ')[1])}>{scan.status}</span>
                              <span className="text-xs text-slate-400 ml-auto">{scan.progress}%</span>
                            </div>
                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${scan.progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
                            badge
                          )}>
                            <span className={cn('w-1.5 h-1.5 rounded-full', dot)} />
                            {scan.status}
                          </span>
                        )}
                      </td>

                      {/* Findings */}
                      <td className="px-5 py-3.5">
                        {scan.findings
                          ? <FindingsPills findings={scan.findings} />
                          : <span className="text-xs text-slate-400">
                              {scan.status === 'Running' || scan.status === 'Queued' ? 'In progress' : '—'}
                            </span>
                        }
                      </td>

                      {/* Started */}
                      <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{scan.startedAt}</td>

                      {/* Duration */}
                      <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                        {scan.duration ?? (scan.status === 'Running' ? (
                          <span className="flex items-center gap-1 text-blue-600">
                            <ArrowPathIcon className="w-3 h-3 animate-spin" />
                            Running
                          </span>
                        ) : '—')}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          {scan.status === 'Running' && (
                            <button
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Stop scan"
                            >
                              <StopIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {(scan.status === 'Completed' || scan.status === 'Failed' || scan.status === 'Cancelled') && (
                            <button
                              className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                              title="Re-run scan"
                            >
                              <PlayIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} scans
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
      {wizardOpen && <NewScanWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

// ── Reusable select ─────────────────────────────────────────────────────────────
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
