import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import {
  assetsData,
  assetTypeOptions,
  assetStatusOptions,
  assetClientOptions,
  type Asset,
  type AssetType,
  type AssetStatus,
} from '../data/mockData';
import { AddAssetModal } from '../components/AddAssetModal';

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
  const [assets, setAssets]             = useState<Asset[]>(assetsData);
  const [search, setSearch]             = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [typeFilter, setTypeFilter]     = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage]                 = useState(1);
  const [modalOpen, setModalOpen]       = useState(false);

  const handleAdd = (newAsset: { name: string; client: string; type: AssetType; status: AssetStatus; environment: string }) => {
    const asset: Asset = {
      id:          String(Date.now()),
      name:        newAsset.name,
      client:      newAsset.client,
      type:        newAsset.type,
      status:      newAsset.status,
      environment: newAsset.environment,
      lastScanned: '—',
    };
    setAssets((prev) => [asset, ...prev]);
    setModalOpen(false);
  };

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.client.toLowerCase().includes(search.toLowerCase());
      const matchClient = clientFilter === 'All Clients' || a.client === clientFilter;
      const matchType   = typeFilter   === 'All Types'   || a.type   === typeFilter;
      const matchStatus = statusFilter === 'All Status'  || a.status === statusFilter;
      return matchSearch && matchClient && matchType && matchStatus;
    });
  }, [assets, search, clientFilter, typeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const resetPage  = () => setPage(1);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assets</h1>
          <p className="text-sm text-slate-500 mt-0.5">{assets.length} assets registered</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filters toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-48">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets or clients..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <FunnelIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <SelectFilter value={clientFilter} onChange={(v) => { setClientFilter(v); resetPage(); }} options={assetClientOptions} />
            <SelectFilter value={typeFilter}   onChange={(v) => { setTypeFilter(v);   resetPage(); }} options={assetTypeOptions} />
            <SelectFilter value={statusFilter} onChange={(v) => { setStatusFilter(v); resetPage(); }} options={assetStatusOptions} />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} assets</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Environment</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Scanned</th>
                <th className="px-5 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                    No assets match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Asset name */}
                    <td className="px-5 py-3.5 font-mono text-sm font-medium text-slate-800 whitespace-nowrap">
                      {asset.name}
                    </td>

                    {/* Client */}
                    <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">{asset.client}</td>

                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', typeColors[asset.type])}>
                        {asset.type}
                      </span>
                    </td>

                    {/* Environment */}
                    <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{asset.environment}</td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[asset.status])}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', statusDot[asset.status])} />
                        {asset.status}
                      </span>
                    </td>

                    {/* Last scanned */}
                    <td className="px-5 py-3.5 text-slate-500 text-sm whitespace-nowrap">{asset.lastScanned}</td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">
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

      {modalOpen && (
        <AddAssetModal
          onClose={() => setModalOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}

// ── Reusable select ───────────────────────────────────────────────────────────
function SelectFilter({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
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
