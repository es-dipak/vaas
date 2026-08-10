import { useState } from 'react';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  GlobeAltIcon,
  ServerIcon,
  CodeBracketIcon,
  LockClosedIcon,
  WifiIcon,
  ClockIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import { type ScanType } from '../data/mockData';

// ── Steps ────────────────────────────────────────────────────────────────────
const STEPS = ['Target', 'Scan Type', 'Options', 'Schedule', 'Review'] as const;

// ── Scan type definitions ────────────────────────────────────────────────────
const scanTypeOptions: {
  value: ScanType;
  label: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}[] = [
  {
    value: 'Full Scan',
    label: 'Full Scan',
    description: 'Comprehensive scan covering web, network, SSL/TLS, and API surface.',
    Icon: GlobeAltIcon,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
  {
    value: 'Web App',
    label: 'Web App',
    description: 'OWASP Top 10 — XSS, SQLi, CSRF, broken auth, IDOR, and more.',
    Icon: ServerIcon,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    value: 'Network',
    label: 'Network',
    description: 'Port scanning, open service enumeration, and network-level vulnerabilities.',
    Icon: WifiIcon,
    color: 'text-teal-600 bg-teal-50 border-teal-200',
  },
  {
    value: 'API',
    label: 'API',
    description: 'REST / GraphQL API testing — auth, rate limits, injection, BOLA.',
    Icon: CodeBracketIcon,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  {
    value: 'SSL/TLS',
    label: 'SSL/TLS',
    description: 'Certificate validation, cipher strength, protocol misconfigurations.',
    Icon: LockClosedIcon,
    color: 'text-green-600 bg-green-50 border-green-200',
  },
];

// ── Prop types ───────────────────────────────────────────────────────────────
interface Props {
  onClose: () => void;
}

// ── Wizard ───────────────────────────────────────────────────────────────────
export function NewScanWizard({ onClose }: Props) {
  const [step, setStep]               = useState(0);
  const [mode, setMode]               = useState<'single' | 'bulk'>('single');
  const [targetInput, setTargetInput] = useState('');
  const [assets, setAssets]           = useState<string[]>([]);
  const [scanType, setScanType]       = useState<ScanType | ''>('');
  const [options, setOptions]         = useState({
    followRedirects: true,
    scanDepth: 'Medium',
    authenticatedScan: false,
    skipForms: false,
  });
  const [schedule, setSchedule]       = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [client, setClient]           = useState('');

  const addAsset = () => {
    const val = targetInput.trim();
    if (val && !assets.includes(val)) {
      setAssets((prev) => [...prev, val]);
      setTargetInput('');
    }
  };

  const removeAsset = (a: string) => setAssets((prev) => prev.filter((x) => x !== a));

  const canNext = (): boolean => {
    if (step === 0) return assets.length > 0;
    if (step === 1) return scanType !== '';
    return true;
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">New Scan</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Step {step + 1} of {STEPS.length} — {STEPS[step]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Step progress bar */}
        <div className="flex items-center gap-0 px-6 pt-5">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i >= step}
                className="flex flex-col items-center gap-1 group disabled:cursor-default"
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors',
                  i < step
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : i === step
                    ? 'bg-white border-primary-600 text-primary-600'
                    : 'bg-white border-slate-200 text-slate-400'
                )}>
                  {i < step ? <CheckIcon className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn(
                  'text-xs whitespace-nowrap hidden sm:block',
                  i === step ? 'text-primary-600 font-medium' : i < step ? 'text-slate-500' : 'text-slate-400'
                )}>
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors',
                  i < step ? 'bg-primary-500' : 'bg-slate-200'
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* ── Step 0: Target ── */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Add the asset/s you want to scan.</p>

              {/* Mode toggle */}
              <div className="flex gap-2">
                {(['single', 'bulk'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      'px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors',
                      mode === m
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    )}
                  >
                    {m === 'single' ? 'Single Asset' : 'Bulk / Multiple Assets'}
                  </button>
                ))}
              </div>

              {/* Client selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">Client</label>
                <select
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select client...</option>
                  {['Acme Corporation', 'TechNova Solutions', 'RetailEdge Inc.', 'FinSecure Bank', 'LogiTrans Group'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Target input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  {mode === 'single' ? 'Target (domain / IP / URL)' : 'Add targets one by one'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAsset()}
                    placeholder={mode === 'single' ? 'e.g. api.example.com' : 'e.g. 192.168.1.0/24'}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-slate-400"
                  />
                  <button
                    onClick={addAsset}
                    disabled={!targetInput.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Added assets list */}
              {assets.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-600">Added Assets ({assets.length})</p>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {assets.map((a) => (
                      <div
                        key={a}
                        className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-100"
                      >
                        <span className="text-sm font-mono text-slate-700">{a}</span>
                        <button
                          onClick={() => removeAsset(a)}
                          className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {assets.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
                  <GlobeAltIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No assets added yet</p>
                  <p className="text-xs text-slate-300 mt-0.5">Type a target above and click Add</p>
                </div>
              )}
            </div>
          )}

          {/* ── Step 1: Scan Type ── */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500">Choose the type of scan to run.</p>
              {scanTypeOptions.map(({ value, label, description, Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setScanType(value)}
                  className={cn(
                    'w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all',
                    scanType === value
                      ? 'border-primary-500 bg-primary-50/50'
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  )}
                >
                  <div className={cn('p-2 rounded-lg border flex-shrink-0', color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{label}</span>
                      {scanType === value && (
                        <span className="flex items-center gap-1 text-xs text-primary-600 font-medium">
                          <CheckIcon className="w-3.5 h-3.5" /> Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Step 2: Options ── */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="text-sm text-slate-500">Configure scan behaviour.</p>

              {/* Scan depth */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Scan Depth</label>
                <div className="flex gap-2">
                  {(['Light', 'Medium', 'Deep'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setOptions((o) => ({ ...o, scanDepth: d }))}
                      className={cn(
                        'flex-1 py-2 text-sm font-medium rounded-lg border transition-colors',
                        options.scanDepth === d
                          ? 'bg-primary-600 border-primary-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  {options.scanDepth === 'Light' && 'Fast surface scan — good for quick checks.'}
                  {options.scanDepth === 'Medium' && 'Balanced depth and speed — recommended.'}
                  {options.scanDepth === 'Deep' && 'Thorough crawling and probing — may take longer.'}
                </p>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                {([
                  { key: 'followRedirects' as const,   label: 'Follow Redirects',      sub: 'Crawl redirect chains automatically' },
                  { key: 'authenticatedScan' as const, label: 'Authenticated Scan',     sub: 'Use stored credentials for login-protected pages' },
                  { key: 'skipForms' as const,         label: 'Skip Form Submission',   sub: 'Avoid submitting forms during crawl' },
                ] as const).map(({ key, label, sub }) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                    </div>
                    <button
                      onClick={() => setOptions((o) => ({ ...o, [key]: !o[key] }))}
                      className={cn(
                        'relative flex-shrink-0 w-10 h-5.5 rounded-full transition-colors mt-0.5',
                        options[key] ? 'bg-primary-600' : 'bg-slate-200'
                      )}
                    >
                      <span className={cn(
                        'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                        options[key] ? 'translate-x-5' : 'translate-x-0.5'
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Schedule ── */}
          {step === 3 && (
            <div className="space-y-5">
              <p className="text-sm text-slate-500">When should this scan run?</p>

              <div className="flex gap-3">
                {(['now', 'later'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSchedule(s)}
                    className={cn(
                      'flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      schedule === s
                        ? 'border-primary-500 bg-primary-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    )}
                  >
                    {s === 'now'
                      ? <ClockIcon className={cn('w-6 h-6', schedule === s ? 'text-primary-600' : 'text-slate-400')} />
                      : <CalendarDaysIcon className={cn('w-6 h-6', schedule === s ? 'text-primary-600' : 'text-slate-400')} />
                    }
                    <span className={cn('text-sm font-semibold', schedule === s ? 'text-primary-700' : 'text-slate-600')}>
                      {s === 'now' ? 'Run Now' : 'Schedule'}
                    </span>
                    <span className="text-xs text-slate-400 text-center">
                      {s === 'now' ? 'Start immediately after launch' : 'Pick a date & time'}
                    </span>
                  </button>
                ))}
              </div>

              {schedule === 'later' && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 4: Review ── */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Review your scan configuration before launching.</p>

              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                <ReviewRow label="Client" value={client || '—'} />
                <ReviewRow
                  label="Targets"
                  value={
                    <div className="flex flex-wrap gap-1.5">
                      {assets.map((a) => (
                        <span key={a} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-mono">{a}</span>
                      ))}
                    </div>
                  }
                />
                <ReviewRow
                  label="Scan Type"
                  value={
                    <span className="px-2 py-0.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-full text-xs font-medium">
                      {scanType || '—'}
                    </span>
                  }
                />
                <ReviewRow label="Depth" value={options.scanDepth} />
                <ReviewRow label="Follow Redirects" value={options.followRedirects ? 'Yes' : 'No'} />
                <ReviewRow label="Authenticated" value={options.authenticatedScan ? 'Yes' : 'No'} />
                <ReviewRow label="Skip Forms" value={options.skipForms ? 'Yes' : 'No'} />
                <ReviewRow
                  label="Schedule"
                  value={
                    schedule === 'now'
                      ? 'Run immediately'
                      : scheduleDate && scheduleTime
                      ? `${scheduleDate} at ${scheduleTime}`
                      : 'Scheduled (no date set)'
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={step === 0 ? onClose : () => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {step > 0 && <ChevronLeftIcon className="w-4 h-4" />}
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          <button
            onClick={isLastStep ? onClose : () => setStep((s) => s + 1)}
            disabled={!canNext()}
            className={cn(
              'flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
              isLastStep
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            )}
          >
            {isLastStep ? (
              <>
                <CheckIcon className="w-4 h-4" />
                Launch Scan
              </>
            ) : (
              <>
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Review row helper ─────────────────────────────────────────────────────────
function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 px-4 py-3">
      <span className="text-xs font-medium text-slate-400 w-32 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-700 flex-1">{value}</span>
    </div>
  );
}
