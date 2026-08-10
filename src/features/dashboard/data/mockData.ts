export const statsData = [
  { id: 'total-assets',      label: 'Total Assets',      value: 128, change: 12,  changeLabel: 'this month', trend: 'up'   as const, color: 'blue'   as const },
  { id: 'scans-run',         label: 'Scans Run',          value: 56,  change: 18,  changeLabel: 'this month', trend: 'up'   as const, color: 'green'  as const },
  { id: 'critical-findings', label: 'Critical Findings',  value: 23,  change: -6,  changeLabel: 'this month', trend: 'down' as const, color: 'red'    as const },
  { id: 'high-findings',     label: 'High Findings',      value: 67,  change: 8,   changeLabel: 'this month', trend: 'up'   as const, color: 'orange' as const },
];

export const findingsBySeverityData = [
  { name: 'Critical', value: 71, color: '#ef4444', pct: 29 },
  { name: 'High',     value: 67, color: '#f97316', pct: 27 },
  { name: 'Medium',   value: 68, color: '#eab308', pct: 27 },
  { name: 'Low',      value: 42, color: '#3b82f6', pct: 17 },
];

export const findingsOverTimeData = [
  { date: 'May 1',  findings: 45  },
  { date: 'May 5',  findings: 72  },
  { date: 'May 8',  findings: 95  },
  { date: 'May 12', findings: 130 },
  { date: 'May 15', findings: 148 },
  { date: 'May 19', findings: 175 },
  { date: 'May 22', findings: 195 },
  { date: 'May 26', findings: 220 },
  { date: 'May 29', findings: 248 },
  { date: 'May 31', findings: 248 },
];

export const recentScansData = [
  { id: '1', target: 'example.com',      scanType: 'Web Application', status: 'completed' as const, findings: 24,   startedAt: 'May 31, 2024 13:08 AM' },
  { id: '2', target: 'api.example.com',  scanType: 'Web Application', status: 'completed' as const, findings: 18,   startedAt: 'May 31, 2024 09:15 AM' },
  { id: '3', target: '192.168.1.0/24',   scanType: 'Network',         status: 'completed' as const, findings: 30,   startedAt: 'May 30, 2024 11:45 PM' },
  { id: '4', target: 'shop.example.com', scanType: 'Web Application', status: 'running'   as const, findings: null, startedAt: 'May 31, 2024 11:05 AM' },
];
