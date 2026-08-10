import { useState } from 'react';
import {
  XMarkIcon,
  XCircleIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';
import { type AssetType, type AssetStatus } from '../data/mockData';

// ── Constants ─────────────────────────────────────────────────────────────────
const CLIENTS = [
  'Acme Corporation',
  'TechNova Solutions',
  'RetailEdge Inc.',
  'FinSecure Bank',
  'LogiTrans Group',
];

const ASSET_TYPES: AssetType[] = ['Domain', 'Subdomain', 'IP Range', 'Web App', 'API', 'Cloud'];

const TYPE_PLACEHOLDER: Record<AssetType, string> = {
  'Domain':    'e.g. example.com',
  'Subdomain': 'e.g. api.example.com',
  'IP Range':  'e.g. 192.168.1.0/24',
  'Web App':   'e.g. https://app.example.com',
  'API':       'e.g. https://api.example.com/v1',
  'Cloud':     'e.g. s3://my-bucket',
};

const TYPE_LABEL: Record<AssetType, string> = {
  'Domain':    'Domain name',
  'Subdomain': 'Subdomain',
  'IP Range':  'IP address / CIDR',
  'Web App':   'Application URL',
  'API':       'API endpoint URL',
  'Cloud':     'Cloud resource identifier',
};

const ENVIRONMENTS = ['Production', 'Staging', 'Development', 'Testing'];

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  client:      string;
  name:        string;
  type:        AssetType | '';
  status:      AssetStatus;
  environment: string;
  tagInput:    string;
  tags:        string[];
  description: string;
}

interface FormErrors {
  client?: string;
  name?:   string;
  type?:   string;
}

interface Props {
  onClose: () => void;
  onAdd: (asset: { name: string; client: string; type: AssetType; status: AssetStatus; environment: string }) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function AddAssetModal({ onClose, onAdd }: Props) {
  const [form, setForm]     = useState<FormState>({
    client: '', name: '', type: '', status: 'Pending',
    environment: 'Production', tagInput: '', tags: [], description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const clearError = (key: keyof FormErrors) =>
    setErrors((e) => ({ ...e, [key]: undefined }));

  const addTag = () => {
    const val = form.tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (val && !form.tags.includes(val)) set('tags', [...form.tags, val]);
    set('tagInput', '');
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.client)       e.client = 'Please select a client.';
    if (!form.name.trim())  e.name   = 'Asset name / URL is required.';
    if (!form.type)         e.type   = 'Please select an asset type.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    setTouched(true);
    if (!validate()) return;
    onAdd({
      name: form.name.trim(),
      client: form.client,
      type: form.type as AssetType,
      status: form.status,
      environment: form.environment,
    });
  };

  const namePlaceholder = form.type ? TYPE_PLACEHOLDER[form.type as AssetType] : 'Select a type first...';
  const nameLabel       = form.type ? TYPE_LABEL[form.type as AssetType] : 'Asset name / URL';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Add Asset</h2>
            <p className="text-xs text-slate-400 mt-0.5">Register a new asset for scanning and monitoring</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* ── Client ── */}
          <Field label="Client" required error={errors.client}>
            <select
              value={form.client}
              onChange={(e) => { set('client', e.target.value); clearError('client'); }}
              className={inputCls(!!errors.client)}
            >
              <option value="">Select client...</option>
              {CLIENTS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>

          {/* ── Asset Type ── */}
          <Field label="Asset Type" required error={errors.type}>
            <div className="flex flex-wrap gap-2">
              {ASSET_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { set('type', t); set('name', ''); clearError('type'); }}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors',
                    form.type === t
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>

          {/* ── Asset Name / URL ── */}
          <Field label={nameLabel} required error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => { set('name', e.target.value); clearError('name'); }}
              placeholder={namePlaceholder}
              disabled={!form.type}
              className={inputCls(!!errors.name, !form.type)}
            />
          </Field>

          {/* ── Status + Environment ── */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <div className="flex gap-1.5">
                {(['Active', 'Pending', 'Inactive'] as AssetStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set('status', s)}
                    className={cn(
                      'flex-1 py-2 text-xs font-medium rounded-lg border transition-colors',
                      form.status === s
                        ? s === 'Active'
                          ? 'bg-green-600 border-green-600 text-white'
                          : s === 'Pending'
                          ? 'bg-yellow-500 border-yellow-500 text-white'
                          : 'bg-slate-500 border-slate-500 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Environment">
              <select
                value={form.environment}
                onChange={(e) => set('environment', e.target.value)}
                className={inputCls(false)}
              >
                {ENVIRONMENTS.map((env) => <option key={env}>{env}</option>)}
              </select>
            </Field>
          </div>

          {/* ── Tags ── */}
          <Field label="Tags" hint="optional — press Enter or comma to add">
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.tagInput}
                  onChange={(e) => set('tagInput', e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                  placeholder="e.g. external, pci, critical"
                  className={inputCls(false)}
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={!form.tagInput.trim()}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                      <TagIcon className="w-3 h-3 text-slate-400" />
                      {t}
                      <button
                        type="button"
                        onClick={() => set('tags', form.tags.filter((x) => x !== t))}
                        className="text-slate-400 hover:text-red-500 transition-colors ml-0.5"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* ── Description ── */}
          <Field label="Description" hint="optional">
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              placeholder="Brief notes about this asset..."
              className={cn(inputCls(false), 'resize-none')}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          {/* Required fields hint */}
          {touched && Object.keys(errors).length > 0 && (
            <span className="flex items-center gap-1 text-xs text-red-500">
              <XCircleIcon className="w-3.5 h-3.5" />
              Fill in required fields
            </span>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            Add Asset
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function inputCls(hasError: boolean, disabled = false) {
  return cn(
    'w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors',
    hasError
      ? 'border-red-300 bg-red-50 focus:ring-red-400'
      : 'border-slate-200 bg-slate-50 focus:ring-primary-500',
    disabled && 'opacity-40 cursor-not-allowed'
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline gap-1.5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-slate-400 normal-case font-normal">— {hint}</span>}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <XCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
