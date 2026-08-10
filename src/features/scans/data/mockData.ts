export type ScanType   = 'Full Scan' | 'Web App' | 'Network' | 'API' | 'SSL/TLS';
export type ScanStatus = 'Completed' | 'Running' | 'Failed' | 'Queued' | 'Cancelled';

export interface ScanFindings {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface Scan {
  id: string;
  name: string;
  target: string;
  client: string;
  type: ScanType;
  status: ScanStatus;
  progress?: number;     // 0–100, only for Running
  findings?: ScanFindings;
  startedAt: string;
  duration?: string;     // e.g. "14m 32s" — undefined if Running/Queued
  initiatedBy: string;
}

export const scansData: Scan[] = [
  {
    id: '1',
    name: 'Full Scan — api.example.com',
    target: 'api.example.com',
    client: 'Acme Corporation',
    type: 'Full Scan',
    status: 'Running',
    progress: 64,
    startedAt: 'Today, 10:30 AM',
    initiatedBy: 'James Carter',
  },
  {
    id: '2',
    name: 'Web App Scan — shop.example.com',
    target: 'shop.example.com',
    client: 'RetailEdge Inc.',
    type: 'Web App',
    status: 'Completed',
    findings: { critical: 2, high: 3, medium: 4, low: 1 },
    startedAt: 'Today, 08:15 AM',
    duration: '22m 10s',
    initiatedBy: 'Mark Thompson',
  },
  {
    id: '3',
    name: 'API Scan — api.example.com',
    target: 'api.example.com',
    client: 'FinSecure Bank',
    type: 'API',
    status: 'Completed',
    findings: { critical: 3, high: 2, medium: 1, low: 0 },
    startedAt: 'Yesterday, 11:45 PM',
    duration: '8m 54s',
    initiatedBy: 'David Lee',
  },
  {
    id: '4',
    name: 'SSL/TLS Scan — example.com',
    target: 'example.com',
    client: 'Acme Corporation',
    type: 'SSL/TLS',
    status: 'Completed',
    findings: { critical: 0, high: 1, medium: 2, low: 3 },
    startedAt: 'Yesterday, 04:00 PM',
    duration: '3m 12s',
    initiatedBy: 'James Carter',
  },
  {
    id: '5',
    name: 'Network Scan — 192.168.1.0/24',
    target: '192.168.1.0/24',
    client: 'LogiTrans Group',
    type: 'Network',
    status: 'Failed',
    startedAt: 'Yesterday, 02:30 PM',
    duration: '1m 05s',
    initiatedBy: 'Anna Kowalski',
  },
  {
    id: '6',
    name: 'Full Scan — admin.example.com',
    target: 'admin.example.com',
    client: 'FinSecure Bank',
    type: 'Full Scan',
    status: 'Queued',
    startedAt: 'Scheduled: Today, 12:00 PM',
    initiatedBy: 'David Lee',
  },
  {
    id: '7',
    name: 'Web App Scan — portal.example.com',
    target: 'portal.example.com',
    client: 'RetailEdge Inc.',
    type: 'Web App',
    status: 'Completed',
    findings: { critical: 0, high: 2, medium: 3, low: 2 },
    startedAt: 'May 31, 2024',
    duration: '18m 40s',
    initiatedBy: 'Mark Thompson',
  },
  {
    id: '8',
    name: 'API Scan — dev.example.com',
    target: 'dev.example.com',
    client: 'TechNova Solutions',
    type: 'API',
    status: 'Completed',
    findings: { critical: 0, high: 0, medium: 1, low: 2 },
    startedAt: 'May 30, 2024',
    duration: '5m 22s',
    initiatedBy: 'Priya Sharma',
  },
  {
    id: '9',
    name: 'SSL/TLS Scan — api.example.com',
    target: 'api.example.com',
    client: 'Acme Corporation',
    type: 'SSL/TLS',
    status: 'Completed',
    findings: { critical: 0, high: 0, medium: 1, low: 1 },
    startedAt: 'May 29, 2024',
    duration: '2m 48s',
    initiatedBy: 'James Carter',
  },
  {
    id: '10',
    name: 'Full Scan — example.com',
    target: 'example.com',
    client: 'TechNova Solutions',
    type: 'Full Scan',
    status: 'Cancelled',
    startedAt: 'May 28, 2024',
    duration: '4m 10s',
    initiatedBy: 'Priya Sharma',
  },
  {
    id: '11',
    name: 'Network Scan — admin.example.com',
    target: 'admin.example.com',
    client: 'FinSecure Bank',
    type: 'Network',
    status: 'Completed',
    findings: { critical: 1, high: 1, medium: 0, low: 1 },
    startedAt: 'May 27, 2024',
    duration: '11m 30s',
    initiatedBy: 'David Lee',
  },
  {
    id: '12',
    name: 'Web App Scan — example.com',
    target: 'example.com',
    client: 'Acme Corporation',
    type: 'Web App',
    status: 'Completed',
    findings: { critical: 0, high: 1, medium: 2, low: 0 },
    startedAt: 'May 26, 2024',
    duration: '16m 05s',
    initiatedBy: 'James Carter',
  },
];

export const scanTypeOptions   = ['All Types', 'Full Scan', 'Web App', 'Network', 'API', 'SSL/TLS'];
export const scanStatusOptions = ['All Status', 'Completed', 'Running', 'Failed', 'Queued', 'Cancelled'];
export const scanClientOptions = [
  'All Clients',
  'Acme Corporation',
  'TechNova Solutions',
  'RetailEdge Inc.',
  'FinSecure Bank',
  'LogiTrans Group',
];
