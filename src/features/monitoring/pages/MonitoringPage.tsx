import { useState, useMemo } from 'react';
import {
  GlobeAltIcon,
  EyeIcon,
  PauseIcon,
  PlayIcon,
  EllipsisVerticalIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  PlusIcon,
  BellAlertIcon,
  SignalIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { cn } from '@/utils/helpers';
import {
  monitoredAssets,
  monitorAlerts,
  monitoringClientOptions,
  type MonitorStatus,
  type AlertSeverity,
  type MonitorAlert,
} from '../data/mockData';

const ALERTS_PAGE_SIZE = 10;

// ── Monitor status ─────────────────────────────────────────────────────────────
const monitorDot: Record<MonitorStatus, string> = {
  Active: 'bg-green-500',
  Paused: 'bg-yellow-400',
  Error:  'bg-red-500',
};
const monitorText: Record<MonitorStatus, string> = {
  Active: 'text-green-700',
  Paused: 'text-yellow-700',
  Error:  'text-red-600',
};

// ── Alert severity ─────────────────────────────────────────────────────────────
const severityBadge: Record<AlertSeverity, string> = {
  Critical: 'bg-red-100 text-red-700 border border-red-200',
  High:     'bg-orange-100 text-orange-700 border border-orange-200',
  Medium:   'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Low:      'bg-blue-100 text-blue-700 border border-blue-200',
};
const severityDot: Record<AlertSeverity, string> = {
  Critical: 'bg-red-500',
  High:     'bg-orange-500',
  Medium:   'bg-yellow-500',
  Low:      'bg-blue-500',
};

export function MonitoringPage() {
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [alertsPage, setAlertsPage]     = useState(1);
  // local acknowledge state
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>(
    () => Object.fromEntries(monitorAlerts.map((a) => [a.id, a.acknowledged]))
  );

  // ── Derived stats ────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total   = monitoredAssets.length;
    const active  = monitoredAssets.filter((a) => a.status === 'Active').length;
    const paused  = monitoredAssets.filter((a) => a.status === 'Paused').length;
    const alerts  = monitorAlerts.filter((a) => !acknowledged[a.id]).length;
    const avgUp   = Math.round(
      monitoredAssets.reduce((sum, a) => sum + a.uptime, 0) / monitoredAssets.length * 10
    ) / 10;
    return { total, active, paused, alerts, avgUp };
  }, [acknowledged]);

  // ── Filtered assets ──────────────────────────────────────────────────────────
  const filteredAssets = useMemo(() =>
    monitoredAssets.filter((a) =>
      clientFilter === 'All Clients' || a.client === clientFilter
    ),
  [clientFilter]);

  // ── Filtered + paginated alerts ──────────────────────────────────────────────
  const filteredAlerts = useMemo(() =>
    monitorAlerts.filter((a) =>
      clientFilter === 'All Clients' || a.client === clientFilter
    ),
  [clientFilter]);

  const totalAlertPages = Math.max(1, Math.ceil(filteredAlerts.length / ALERTS_PAGE_SIZE));
  const pagedAlerts     = filteredAlerts.slice(
    (alertsPage - 1) * ALERTS_PAGE_SIZE,
    alertsPage * ALERTS_PAGE_SIZE
  );

  const handleClientChange = (v: string) => {
    setClientFilter(v);
    setAlertsPage(1);
  };

  const handleAcknowledge = (id: string) => {
    setAcknowledged((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 w-full">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Monitoring</h1>
          <p className="text-sm text-slate-500 mt-0.5">{monitoredAssets.length} assets monitored</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors">
          <PlusIcon className="w-4 h-4" />
          Add Monitor
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Monitored Assets"
          value={stats.total}
          icon={<SignalIcon className="w-5 h-5" />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          valueColor="text-blue-600"
        />
        <StatCard
          label="Active Alerts"
          value={stats.alerts}
          icon={<BellAlertIcon className="w-5 h-5" />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          valueColor={stats.alerts > 0 ? 'text-red-600' : 'text-slate-700'}
        />
        <StatCard
          label="Avg Uptime"
          value={`${stats.avgUp}%`}
          icon={<ShieldExclamationIcon className="w-5 h-5" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          valueColor="text-green-600"
        />
        <StatCard
          label="Paused"
          value={stats.paused}
          icon={<PauseIcon className="w-5 h-5" />}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-600"
          valueColor="text-yellow-600"
        />
      </div>

      {/* Client filter */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500 font-medium flex-shrink-0">Filter by client:</span>
        <SelectFilter
          value={clientFilter}
          onChange={handleClientChange}
          options={monitoringClientOptions}
        />
      </div>

      {/* ── Section 1: Monitored Assets ─────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Monitored Assets</h2>
          <span className="text-xs text-slate-400">{filteredAssets.length} assets</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Checked</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Check</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Uptime</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">Alerts</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-400">
                    No assets match this client filter.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/60 transition-colors group">
                    {/* Asset */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-mono text-sm text-slate-700">{asset.asset}</span>
                      </div>
                    </td>
                    {/* Client */}
                    <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">{asset.client}</td>
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={cn('w-2 h-2 rounded-full flex-shrink-0', monitorDot[asset.status])} />
                        <span className={cn('text-xs font-medium', monitorText[asset.status])}>{asset.status}</span>
                      </div>
                    </td>
                    {/* Last checked */}
                    <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{asset.lastChecked}</td>
                    {/* Next check */}
                    <td className={cn(
                      'px-5 py-3.5 text-xs whitespace-nowrap',
                      asset.status === 'Error' ? 'text-red-500 font-medium' :
                      asset.status === 'Paused' ? 'text-slate-400 italic' : 'text-slate-500'
                    )}>
                      {asset.nextCheck}
                    </td>
                    {/* Uptime */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              asset.uptime >= 99 ? 'bg-green-500' :
                              asset.uptime >= 95 ? 'bg-yellow-400' : 'bg-red-400'
                            )}
                            style={{ width: `${asset.uptime}%` }}
                          />
                        </div>
                        <span className={cn(
                          'text-xs font-medium',
                          asset.uptime >= 99 ? 'text-green-600' :
                          asset.uptime >= 95 ? 'text-yellow-600' : 'text-red-600'
                        )}>
                          {asset.uptime}%
                        </span>
                      </div>
                    </td>
                    {/* Alerts */}
                    <td className="px-5 py-3.5">
                      {asset.alertsCount > 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                          {asset.alertsCount}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title={asset.status === 'Paused' ? 'Resume' : 'Pause'}
                        >
                          {asset.status === 'Paused'
                            ? <PlayIcon className="w-3.5 h-3.5" />
                            : <PauseIcon className="w-3.5 h-3.5" />
                          }
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="View details">
                          <EyeIcon className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="More options">
                          <EllipsisVerticalIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 2: Recent Alerts ─────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Recent Alerts</h2>
          <span className="text-xs text-slate-400">{filteredAlerts.length} alerts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Triggered</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-32">Acknowledged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pagedAlerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">
                    No alerts for this client.
                  </td>
                </tr>
              ) : (
                pagedAlerts.map((alert) => (
                  <AlertRow
                    key={alert.id}
                    alert={{ ...alert, acknowledged: acknowledged[alert.id] ?? alert.acknowledged }}
                    onAcknowledge={handleAcknowledge}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Alerts pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing {filteredAlerts.length === 0 ? 0 : (alertsPage - 1) * ALERTS_PAGE_SIZE + 1}–{Math.min(alertsPage * ALERTS_PAGE_SIZE, filteredAlerts.length)} of {filteredAlerts.length} alerts
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setAlertsPage((p) => Math.max(1, p - 1))}
              disabled={alertsPage === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            {Array.from({ length: totalAlertPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setAlertsPage(n)}
                className={cn(
                  'w-7 h-7 text-xs font-medium rounded-lg transition-colors',
                  n === alertsPage ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setAlertsPage((p) => Math.min(totalAlertPages, p + 1))}
              disabled={alertsPage === totalAlertPages}
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

// ── Alert row ───────────────────────────────────────────────────────────────────
function AlertRow({
  alert,
  onAcknowledge,
}: {
  alert: MonitorAlert & { acknowledged: boolean };
  onAcknowledge: (id: string) => void;
}) {
  return (
    <tr className={cn('transition-colors', alert.acknowledged ? 'bg-white' : 'bg-red-50/30')}>
      {/* Severity */}
      <td className="px-5 py-3.5">
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
          severityBadge[alert.severity]
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', severityDot[alert.severity])} />
          {alert.severity}
        </span>
      </td>
      {/* Message */}
      <td className="px-5 py-3.5 max-w-sm">
        <p className={cn('text-sm truncate', alert.acknowledged ? 'text-slate-500' : 'text-slate-800 font-medium')}>
          {alert.message}
        </p>
      </td>
      {/* Asset */}
      <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">{alert.asset}</td>
      {/* Client */}
      <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">{alert.client}</td>
      {/* Triggered */}
      <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{alert.triggeredAt}</td>
      {/* Acknowledged */}
      <td className="px-5 py-3.5">
        {alert.acknowledged ? (
          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
            <CheckCircleSolid className="w-4 h-4" />
            Acknowledged
          </span>
        ) : (
          <button
            onClick={() => onAcknowledge(alert.id)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <CheckCircleIcon className="w-3.5 h-3.5" />
            Acknowledge
          </button>
        )}
      </td>
    </tr>
  );
}

// ── Stat card ───────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  valueColor,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  valueColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', iconBg)}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      <p className={cn('text-2xl font-bold', valueColor)}>{value}</p>
    </div>
  );
}

// ── Select filter ───────────────────────────────────────────────────────────────
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
