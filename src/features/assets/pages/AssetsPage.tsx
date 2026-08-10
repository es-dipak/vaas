import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  assetsData,
  assetTypeOptions,
  assetStatusOptions,
  type AssetType,
  type AssetStatus,
} from '../data/mockData';

const PAGE_SIZE = 10;

const typeColors: Record<AssetType, string> = {
  'Domain':    'bg-blue-50 text-blue-700',
  'Subdomain': 'bg-violet-50 text-violet-700',
  'IP Range':  'bg-teal-50 text-teal-700',
  'Web App':   'bg-orange-50 text-orange-700',
  'API':       'bg-yellow-50 text-yellow-700',
  'Cloud':     'bg-sky-50 text-sky-700',
};

const statusColors: Record<AssetStatus, string> = {
  'Active':   'bg-green-50 text-green-700',
  'Inactive': 'bg-slate-100 text-slate-500',
  'Pending':  'bg-yellow-50 text-yellow-700',
};

const statusDot: Record<AssetStatus, string> = {
  'Active':   'bg-green-500',
  'Inactive': 'bg-slate-400',
  'Pending':  'bg-yellow-500',
};

export function AssetsPage() {
  const [search, setSearch]             = useState('');
  const [typeFilter, setTypeFilter]     = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage]                 = useState(1);

  const filtered = useMemo(() => {
    return assetsData.filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter   === 'All Types'   || a.type   === typeFilter;
      const matchStatus = statusFilter === 'All Status'  || a.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-slate-900">Assets</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Import Assets
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors">
            <PlusIcon className="w-4 h-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filters toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); resetPage(); }}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              {assetTypeOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronUpDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); resetPage(); }}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              {assetStatusOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronUpDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <span className="ml-auto text-xs text-slate-400">{filtered.length} assets</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Scanned</th>
                <th className="px-5 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                    No assets match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-5 py-3.5 font-medium text-slate-800">{asset.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', typeColors[asset.type])}>
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[asset.status])}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', statusDot[asset.status])} />
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{asset.lastScanned}</td>
                    <td className="px-5 py-3.5">
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100">
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
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
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
