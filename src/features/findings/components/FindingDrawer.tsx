import { useState, useEffect } from 'react';
import {
  XMarkIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ShieldExclamationIcon } from '@heroicons/react/24/solid';
import { cn } from '@/utils/helpers';
import type { Finding, FindingSeverity, FindingStatus } from '../data/mockData';

// ── Style maps ─────────────────────────────────────────────────────────────────
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

const cvssColor = (score: number) => {
  if (score >= 9.0) return 'bg-red-100 text-red-700 border-red-200';
  if (score >= 7.0) return 'bg-orange-100 text-orange-700 border-orange-200';
  if (score >= 4.0) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  if (score >= 0.1) return 'bg-blue-100 text-blue-700 border-blue-200';
  return 'bg-slate-100 text-slate-600 border-slate-200';
};

const cvssLabel = (score: number) => {
  if (score >= 9.0) return 'Critical';
  if (score >= 7.0) return 'High';
  if (score >= 4.0) return 'Medium';
  if (score >= 0.1) return 'Low';
  return 'None';
};

const statusBadge: Record<FindingStatus, string> = {
  'Open':           'bg-slate-100 text-slate-700 border-slate-200',
  'In Progress':    'bg-blue-50 text-blue-700 border-blue-200',
  'Resolved':       'bg-green-50 text-green-700 border-green-200',
  'Accepted Risk':  'bg-purple-50 text-purple-700 border-purple-200',
  'False Positive': 'bg-gray-100 text-gray-500 border-gray-200',
};

// ── Tabs ───────────────────────────────────────────────────────────────────────
const TABS = ['Overview', 'Evidence', 'Remediation', 'Activity'] as const;
type Tab = (typeof TABS)[number];

interface FindingDrawerProps {
  finding: Finding | null;
  onClose: () => void;
}

export function FindingDrawer({ finding, onClose }: FindingDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<FindingStatus>(finding?.status ?? 'Open');

  // Sync status when finding changes
  useEffect(() => {
    if (finding) {
      setCurrentStatus(finding.status);
      setActiveTab('Overview');
    }
  }, [finding]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const isOpen = !!finding;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {finding && (
          <>
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-lg font-bold text-slate-900 leading-snug">{finding.title}</h2>

                {/* Severity + Status badges */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                    severityBadge[finding.severity]
                  )}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', severityDot[finding.severity])} />
                    {finding.severity}
                  </span>

                  {/* Status — clickable dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setStatusMenuOpen((o) => !o)}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors',
                        statusBadge[currentStatus]
                      )}
                    >
                      {currentStatus}
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>
                    {statusMenuOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 min-w-36">
                        {(['Open', 'In Progress', 'Resolved', 'Accepted Risk', 'False Positive'] as FindingStatus[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => { setCurrentStatus(s); setStatusMenuOpen(false); }}
                            className={cn(
                              'w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors flex items-center justify-between',
                              s === currentStatus ? 'font-semibold text-primary-600' : 'text-slate-700'
                            )}
                          >
                            {s}
                            {s === currentStatus && <CheckCircleIcon className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Discovered */}
                <p className="text-xs text-slate-400 mt-2">
                  Discovered: {finding.discovered}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* ── Tabs ───────────────────────────────────────────────────── */}
            <div className="flex border-b border-slate-100 px-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-1 py-3 text-sm font-medium mr-6 border-b-2 transition-colors -mb-px',
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Tab content ────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {activeTab === 'Overview' && (
                <>
                  {/* Description */}
                  <section>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {finding.description ??
                        'No description available for this finding.'}
                    </p>
                  </section>

                  {/* Asset */}
                  <section>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Asset
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <LinkIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-medium text-slate-700 font-mono">{finding.asset}</span>
                      </div>
                      <a
                        href={`https://${finding.asset}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-mono"
                      >
                        https://{finding.asset}/user/id=1
                        <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                      </a>
                    </div>
                  </section>

                  {/* CVSS */}
                  {finding.cvss !== undefined && (
                    <section>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        CVSS v3.1 Score
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border',
                          cvssColor(finding.cvss)
                        )}>
                          <ShieldExclamationIcon className="w-4 h-4" />
                          {finding.cvss.toFixed(1)} ({cvssLabel(finding.cvss)})
                        </span>
                        <button className="text-xs text-primary-600 hover:text-primary-700 underline">
                          View CVSS Details
                        </button>
                      </div>
                    </section>
                  )}

                  {/* CVE Reference */}
                  {finding.cve && (
                    <section>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        CVE Reference
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono border border-slate-200">
                        {finding.cve}
                      </span>
                    </section>
                  )}
                </>
              )}

              {activeTab === 'Evidence' && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <ShieldExclamationIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">No evidence attached</p>
                  <p className="text-xs text-slate-400 mt-1">Screenshots, logs, and PoC will appear here.</p>
                </div>
              )}

              {activeTab === 'Remediation' && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircleIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Remediation guidance</p>
                  <p className="text-xs text-slate-400 mt-1">Step-by-step fix instructions will appear here.</p>
                </div>
              )}

              {activeTab === 'Activity' && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircleIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">No activity yet</p>
                  <p className="text-xs text-slate-400 mt-1">Comments and status changes will appear here.</p>
                </div>
              )}
            </div>

            {/* ── Footer action ───────────────────────────────────────────── */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStatus('Resolved')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Mark as Closed
                  <ChevronDownIcon className="w-3.5 h-3.5 ml-auto" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
