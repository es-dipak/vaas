export type MonitorStatus  = 'Active' | 'Paused' | 'Error';
export type AlertSeverity  = 'Critical' | 'High' | 'Medium' | 'Low';

export interface MonitoredAsset {
  id: string;
  asset: string;
  client: string;
  status: MonitorStatus;
  lastChecked: string;
  nextCheck: string;
  uptime: number;       // 0–100
  alertsCount: number;
}

export interface MonitorAlert {
  id: string;
  asset: string;
  client: string;
  message: string;
  severity: AlertSeverity;
  triggeredAt: string;
  acknowledged: boolean;
}

export const monitoredAssets: MonitoredAsset[] = [
  {
    id: '1',
    asset: 'api.example.com',
    client: 'Acme Corporation',
    status: 'Active',
    lastChecked: '2 min ago',
    nextCheck: 'in 3 min',
    uptime: 99.8,
    alertsCount: 3,
  },
  {
    id: '2',
    asset: 'example.com',
    client: 'Acme Corporation',
    status: 'Active',
    lastChecked: '1 min ago',
    nextCheck: 'in 4 min',
    uptime: 100,
    alertsCount: 1,
  },
  {
    id: '3',
    asset: 'shop.example.com',
    client: 'RetailEdge Inc.',
    status: 'Active',
    lastChecked: '5 min ago',
    nextCheck: 'in 0 min',
    uptime: 98.4,
    alertsCount: 4,
  },
  {
    id: '4',
    asset: 'admin.example.com',
    client: 'FinSecure Bank',
    status: 'Error',
    lastChecked: '32 min ago',
    nextCheck: 'Retrying...',
    uptime: 91.2,
    alertsCount: 2,
  },
  {
    id: '5',
    asset: 'dev.example.com',
    client: 'TechNova Solutions',
    status: 'Active',
    lastChecked: '3 min ago',
    nextCheck: 'in 2 min',
    uptime: 97.6,
    alertsCount: 0,
  },
  {
    id: '6',
    asset: '192.168.1.13',
    client: 'LogiTrans Group',
    status: 'Paused',
    lastChecked: '2 hrs ago',
    nextCheck: 'Paused',
    uptime: 95.0,
    alertsCount: 0,
  },
  {
    id: '7',
    asset: 'api.example.com',
    client: 'FinSecure Bank',
    status: 'Active',
    lastChecked: '1 min ago',
    nextCheck: 'in 4 min',
    uptime: 99.1,
    alertsCount: 5,
  },
  {
    id: '8',
    asset: 'portal.example.com',
    client: 'RetailEdge Inc.',
    status: 'Active',
    lastChecked: '4 min ago',
    nextCheck: 'in 1 min',
    uptime: 99.9,
    alertsCount: 0,
  },
];

export const monitorAlerts: MonitorAlert[] = [
  {
    id: '1',
    asset: 'api.example.com',
    client: 'FinSecure Bank',
    message: 'New Critical finding detected: Authentication Bypass via JWT None Algorithm',
    severity: 'Critical',
    triggeredAt: 'Today, 10:42 AM',
    acknowledged: false,
  },
  {
    id: '2',
    asset: 'admin.example.com',
    client: 'FinSecure Bank',
    message: 'Monitor health check failed — connection timeout after 30s',
    severity: 'High',
    triggeredAt: 'Today, 10:28 AM',
    acknowledged: false,
  },
  {
    id: '3',
    asset: 'shop.example.com',
    client: 'RetailEdge Inc.',
    message: 'Stored XSS payload detected in product review submission',
    severity: 'High',
    triggeredAt: 'Today, 09:15 AM',
    acknowledged: false,
  },
  {
    id: '4',
    asset: 'api.example.com',
    client: 'Acme Corporation',
    message: 'TLS certificate expiring in 14 days — renewal required',
    severity: 'Medium',
    triggeredAt: 'Today, 08:50 AM',
    acknowledged: true,
  },
  {
    id: '5',
    asset: 'shop.example.com',
    client: 'RetailEdge Inc.',
    message: 'Directory listing still exposed on /uploads path',
    severity: 'High',
    triggeredAt: 'Yesterday, 11:30 PM',
    acknowledged: true,
  },
  {
    id: '6',
    asset: 'api.example.com',
    client: 'FinSecure Bank',
    message: 'Unusual spike in 401 Unauthorized responses — possible brute force',
    severity: 'Critical',
    triggeredAt: 'Yesterday, 09:05 PM',
    acknowledged: false,
  },
  {
    id: '7',
    asset: 'example.com',
    client: 'Acme Corporation',
    message: 'Content-Security-Policy header missing on main domain',
    severity: 'Medium',
    triggeredAt: 'Yesterday, 04:20 PM',
    acknowledged: true,
  },
  {
    id: '8',
    asset: 'dev.example.com',
    client: 'TechNova Solutions',
    message: 'HTTP endpoint serving sensitive endpoints — upgrade to HTTPS',
    severity: 'Low',
    triggeredAt: 'May 31, 2024',
    acknowledged: true,
  },
  {
    id: '9',
    asset: 'api.example.com',
    client: 'Acme Corporation',
    message: 'Remote Code Execution risk via unsafe deserialization confirmed',
    severity: 'Critical',
    triggeredAt: 'May 30, 2024',
    acknowledged: true,
  },
  {
    id: '10',
    asset: 'shop.example.com',
    client: 'RetailEdge Inc.',
    message: 'CSRF token validation bypass found on /checkout endpoint',
    severity: 'Medium',
    triggeredAt: 'May 29, 2024',
    acknowledged: true,
  },
];

export const monitoringClientOptions = [
  'All Clients',
  'Acme Corporation',
  'TechNova Solutions',
  'RetailEdge Inc.',
  'FinSecure Bank',
  'LogiTrans Group',
];
