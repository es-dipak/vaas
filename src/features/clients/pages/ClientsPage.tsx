import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  clientsData,
  clientPlanOptions,
  clientStatusOptions,
  type ClientPlan,
  type ClientStatus,
  type ClientPurpose,
} from '../data/mockData';

const PAGE_SIZE = 10;

// ── Plan badge ─────────────────────────────────────────────────────────────────
const planBadge: Record<ClientPlan, string> = {
  Enterprise:   'bg-purple-50 text-purple-700 border border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border border-blue-200',
  Starter:      'bg-green-50 text-green-700 border border-green-200',
};

// ── Status badge ───────────────────────────────────────────────────────────────
const statusBadge: Record<ClientStatus, string> = {
  Active:   'bg-green-50 text-green-700 border border-green-200',
  Inactive: 'bg-slate-100 text-slate-600 border border-slate-200',
  Pending:  'bg-yellow-50 text-yellow-700 border border-yellow-200',
};

// ── Purpose badge ──────────────────────────────────────────────────────────────
const purposeBadge: Record<'Monitoring' | 'Remediation', string> = {
  Monitoring:  'bg-blue-50 text-blue-700 border border-blue-200',
  Remediation: 'bg-orange-50 text-orange-700 border border-orange-200',
};

export function ClientsPage() {
  const [search, setSearch]           = useState('');
  const [planFilter, setPlanFilter]   = useState('All Plans');
  const [statusFilter, setStatus]     = useState('All Status');
  const [statusPill, setStatusPill]   = useState('');
  const [page, setPage]               = useState(1);

  const filtered = useMemo(() => {
    return clientsData.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.contactEmail.toLowerCase().includes(search.toLowerCase());
      const matchPlan   = planFilter   === 'All Plans'  || c.plan   === planFilter;
      const matchStatus = statusFilter === 'All Status' || c.status === statusFilter;
      const matchPill   = statusPill === '' || c.status === statusPill;
      return matchSearch && matchPlan && matchStatus && matchPill;
    });
  }, [search, planFilter, statusFilter, statusPill]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  // counts for summary pills
  const counts = useMemo(() => ({
    Active:   clientsData.filter((c) => c.status === 'Active').length,
    Pending:  clientsData.filter((c) => c.status === 'Pending').length,
    Inactive: clientsData.filter((c) => c.status === 'Inactive').length,
  }), []);

  const pillConfig: { label: ClientStatus; dot: string; className: string; activeClass: string }[] = [
    { label: 'Active',   dot: 'bg-green-500',  className: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', activeClass: 'bg-green-50 text-green-700 border-green-200 ring-2 ring-offset-1 ring-green-400' },
    { label: 'Pending',  dot: 'bg-yellow-400', className: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', activeClass: 'bg-yellow-50 text-yellow-700 border-yellow-200 ring-2 ring-offset-1 ring-yellow-400' },
    { label: 'Inactive', dot: 'bg-slate-400',  className: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300', activeClass: 'bg-slate-100 text-slate-700 border-slate-300 ring-2 ring-offset-1 ring-slate-400' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Clients &amp; Teams</h1>
          <p className="text-sm text-slate-500 mt-0.5">{clientsData.length} clients onboarded</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors">
          <PlusIcon className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Summary pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {pillConfig.map(({ label, dot, className, activeClass }) => (
          <button
            key={label}
            onClick={() => { setStatusPill(statusPill === label ? '' : label); resetPage(); }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
              statusPill === label ? activeClass : className
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
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <FunnelIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <SelectFilter value={planFilter}   onChange={(v) => { setPlanFilter(v);  resetPage(); }} options={clientPlanOptions} />
            <SelectFilter value={statusFilter} onChange={(v) => { setStatus(v);      resetPage(); }} options={clientStatusOptions} />
          </div>

          <span className="text-xs text-slate-400">{filtered.length} clients</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Assets</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Open Findings</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Purpose</th>
                <th className="px-5 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                    No clients match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/60 transition-colors group">
                    {/* Client name + email */}
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <BuildingOfficeIcon className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{client.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{client.contactEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-5 py-3.5 text-center">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        planBadge[client.plan]
                      )}>
                        {client.plan}
                      </span>
                    </td>

                    {/* Status */}
                    {/* <td className="px-5 py-3.5 text-center">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusBadge[client.status]
                      )}>
                        {client.status}
                      </span>
                    </td> */}

                    {/* Assets */}
                    <td className="px-5 py-3.5 text-center text-slate-700 font-medium">
                      {client.assetsCount}
                    </td>

                    {/* Open Findings */}
                    <td className="px-5 py-3.5 text-center">
                      <span className={cn(
                        'font-medium',
                        client.openFindings > 5 ? 'text-red-600' : client.openFindings > 0 ? 'text-orange-600' : 'text-slate-400'
                      )}>
                        {client.openFindings}
                      </span>
                    </td>

                    {/* Purpose */}
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {(client.purpose === 'Monitoring' || client.purpose === 'Both') && (
                          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', purposeBadge['Monitoring'])}>
                            Monitoring
                          </span>
                        )}
                        {(client.purpose === 'Remediation' || client.purpose === 'Both') && (
                          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', purposeBadge['Remediation'])}>
                            Remediation
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-center">
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
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} clients
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
