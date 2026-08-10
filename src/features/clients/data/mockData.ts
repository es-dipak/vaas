export type ClientStatus  = 'Active' | 'Inactive' | 'Pending';
export type ClientPlan    = 'Enterprise' | 'Professional' | 'Starter';
export type ClientPurpose = 'Monitoring' | 'Remediation' | 'Both';

export interface Client {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  plan: ClientPlan;
  status: ClientStatus;
  purpose: ClientPurpose;
  assetsCount: number;
  openFindings: number;
  onboardedAt: string;
}

export const clientsData: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    contactName: 'James Carter',
    contactEmail: 'james.carter@acme.com',
    plan: 'Enterprise',
    status: 'Active',
    purpose: 'Both',
    assetsCount: 12,
    openFindings: 8,
    onboardedAt: 'Jan 15, 2024',
  },
  {
    id: '2',
    name: 'TechNova Solutions',
    contactName: 'Priya Sharma',
    contactEmail: 'priya@technova.io',
    plan: 'Professional',
    status: 'Active',
    purpose: 'Monitoring',
    assetsCount: 7,
    openFindings: 3,
    onboardedAt: 'Feb 03, 2024',
  },
  {
    id: '3',
    name: 'RetailEdge Inc.',
    contactName: 'Mark Thompson',
    contactEmail: 'm.thompson@retailedge.com',
    plan: 'Enterprise',
    status: 'Active',
    purpose: 'Both',
    assetsCount: 18,
    openFindings: 14,
    onboardedAt: 'Feb 20, 2024',
  },
  {
    id: '4',
    name: 'HealthBridge Ltd.',
    contactName: "Sarah O'Brien",
    contactEmail: 'sobrien@healthbridge.co',
    plan: 'Professional',
    status: 'Pending',
    purpose: 'Remediation',
    assetsCount: 5,
    openFindings: 0,
    onboardedAt: 'Mar 11, 2024',
  },
  {
    id: '5',
    name: 'FinSecure Bank',
    contactName: 'David Lee',
    contactEmail: 'dlee@finsecure.bank',
    plan: 'Enterprise',
    status: 'Active',
    purpose: 'Both',
    assetsCount: 24,
    openFindings: 21,
    onboardedAt: 'Mar 22, 2024',
  },
  {
    id: '6',
    name: 'LogiTrans Group',
    contactName: 'Anna Kowalski',
    contactEmail: 'anna.k@logitrans.eu',
    plan: 'Starter',
    status: 'Active',
    purpose: 'Monitoring',
    assetsCount: 3,
    openFindings: 2,
    onboardedAt: 'Apr 05, 2024',
  },
  {
    id: '7',
    name: 'CloudBase Systems',
    contactName: 'Ethan Brooks',
    contactEmail: 'ethan@cloudbase.dev',
    plan: 'Starter',
    status: 'Inactive',
    purpose: 'Remediation',
    assetsCount: 2,
    openFindings: 0,
    onboardedAt: 'Apr 18, 2024',
  },
  {
    id: '8',
    name: 'MediaStream Co.',
    contactName: 'Lena Fischer',
    contactEmail: 'lena.fischer@mediastream.de',
    plan: 'Professional',
    status: 'Pending',
    purpose: 'Monitoring',
    assetsCount: 0,
    openFindings: 0,
    onboardedAt: 'May 30, 2024',
  },
];

export const clientPlanOptions   = ['All Plans', 'Enterprise', 'Professional', 'Starter'];
export const clientStatusOptions = ['All Status', 'Active', 'Inactive', 'Pending'];
