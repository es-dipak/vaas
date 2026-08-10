import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  remediationData,
  remediationPriorityOptions,
  remediationStatusOptions,
  remediationClientOptions,
  type RemediationPriority,
  type RemediationStatus,
} from '../data/mockData';

const PAGE_SIZE = 10;

// ── Priority badge ──────────────────────────────────────────────────────────────
const priorityBadge: Record<RemediationPriority, string> = {
  Critical: 'bg-red-100 text-red-700 border border-red-200',
  High:     'bg-orange-100 text-orange-700 border border-orange-200',
  Medium:   'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Low:      'bg-blue-100 text-blue-700 border border-blue-200',
};

const priorityDot: Record<RemediationPriority, string> = {
  Critical: 'bg-red-500',
  High:     'bg-orange-500',
  Medium:   'bg-yellow-500',
  Low:      'bg-blue-500',
};

// ── Status badge ───────────────────────────────────────────────────────────────
const statusBadge: Record<RemediationStatus, string> = {
  'Open':        'bg-slate-100 text-slate-600',
  'In Progress': 'bg-blue-50 text-blue-700',
  'Completed':   'bg-green-50 text-green-700',
  'Overdue':     'bg-red-50 text-red-700',
};

// ── Summary pill config ────────────────────────────────────────────────────────
const pillConfig: {
  label: RemediationStatus;
  dot: string;
  base: string;
  active: string;
}[] = [
  { label: 'Open',        dot: 'bg-slate-400',  base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-slate-100 text-slate-700 border-slate-300 ring-2 ring-offset-1 ring-slate-400' },
  { label: 'In Progress', dot: 'bg-blue-500',   base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-blue-50 text-blue-700 border-blue-200 ring-2 ring-offset-1 ring-blue-400' },
  { label: 'Completed',   dot: 'bg-green-500',  base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-green-50 text-green-700 border-green-200 ring-2 ring-offset-1 ring-green-400' },
  { label: 'Overdue',     dot: 'bg-red-500',    base: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', active: 'bg-red-50 text-red-700 border-red-200 ring-2 ring-offset-1 ring-red-400' },
];

export function RemediationPage() {
  const [search, setSearch]             = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [priorityFilter, setPriority]   = useState('All Priorities');
  const [statusFilter, setStatus]       = useState('All Status');
  const [statusPill, setStatusPill]     = useState('');
  const [page, setPage]                 = useState(1);

  const openCount = useMemo(() =>
    remediationData.filter((t) => t.status === 'Open' || t.status === 'Overdue').length,
  []);

  const counts = useMemo(() => ({
    'Open':        remediationData.filter((t) => t.status === 'Open').length,
    'In Progress': remediationData.filter((t) => t.status === 'In Progress').length,
    'Completed':   remediationData.filter((t) => t.status === 'Completed').length,
    'Overdue':     remediationData.filter((t) => t.status === 'Overdue').length,
  }), []);

  const filtered = useMemo(() => {
    return remediationData.filter((t) => {
      const matchSearch   = t.title.toLowerCase().includes(search.toLowerCase()) ||
                            t.asset.toLowerCase().includes(search.toLowerCase());
      const matchClient   = clientFilter   === 'All Clients'    || t.client   === clientFilter;
      const matchPriority = priorityFilter === 'All Priorities' || t.priority === priorityFilter;
      const matchStatus   = statusFilter   === 'All Status'     || t.status   === statusFilter;
      const matchPill     = statusPill === '' || t.status === statusPill;
      return matchSearch && matchClient && matchPriority && matchStatus && matchPill;
    });
  }, [search, clientFilter, priorityFilter, statusFilter, statusPill]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Remediation</h1>
          <p className="text-sm text-slate-500 mt-0.5">{openCount} open tasks</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors">
          <PlusIcon className="w-4 h-4" />
          Assign Task
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
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <FunnelIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <SelectFilter value={clientFilter}   onChange={(v) => { setClientFilter(v); resetPage(); }} options={remediationClientOptions} />
            <SelectFilter value={priorityFilter} onChange={(v) => { setPriority(v);     resetPage(); }} options={remediationPriorityOptions} />
            <SelectFilter value={statusFilter}   onChange={(v) => { setStatus(v);       resetPage(); }} options={remediationStatusOptions} />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} tasks</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Task</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignee</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                    No tasks match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/60 transition-colors group">
                    {/* Priority */}
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                        priorityBadge[task.priority]
                      )}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', priorityDot[task.priority])} />
                        {task.priority}
                      </span>
                    </td>

                    {/* Task title + finding subtext */}
                    <td className="px-5 py-3.5 max-w-xs">
                      <p className="font-medium text-slate-800 truncate">{task.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{task.findingTitle}</p>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">{task.client}</td>

                    {/* Asset */}
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">{task.asset}</td>

                    {/* Assignee */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-semibold">
                          {task.assigneeInitials}
                        </div>
                        <span className="text-sm text-slate-700">{task.assignee}</span>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className={cn(
                      'px-5 py-3.5 whitespace-nowrap text-sm',
                      task.status === 'Overdue' ? 'text-red-600 font-medium' : 'text-slate-500'
                    )}>
                      {task.dueDate}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusBadge[task.status]
                      )}>
                        {task.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <button
                        className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100"
                        title="More options"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
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
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} tasks
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
