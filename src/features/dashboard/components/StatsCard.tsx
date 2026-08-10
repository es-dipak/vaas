import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { cn } from '@/utils/helpers';

interface StatsCardProps {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down';
  color: 'blue' | 'green' | 'red' | 'orange';
}

const valueColorMap: Record<string, string> = {
  blue:   'text-blue-600',
  green:  'text-green-600',
  red:    'text-red-600',
  orange: 'text-orange-500',
};

export function StatsCard({ label, value, change, changeLabel, trend: _trend, color }: StatsCardProps) {
  const isPositive = change > 0;
  const changeAbs = Math.abs(change);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className={cn('text-3xl font-bold mb-3', valueColorMap[color])}>{value}</p>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded',
            isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          )}
        >
          {isPositive ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
          {changeAbs}
        </span>
        <span className="text-xs text-slate-400">{changeLabel}</span>
      </div>
    </div>
  );
}
