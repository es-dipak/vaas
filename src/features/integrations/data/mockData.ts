export type IntegrationCategory = 'Ticketing' | 'Communication' | 'CI/CD' | 'Cloud' | 'SIEM' | 'Scanner';
export type IntegrationStatus   = 'Connected' | 'Not Connected' | 'Error';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  connectedAt?: string;  // only when Connected
  iconBg: string;        // tailwind bg color class
  iconText: string;      // tailwind text color class
  initials: string;      // short 2-3 char icon fallback
}

export const integrationsData: Integration[] = [
  // Ticketing
  {
    id: '1',
    name: 'Jira',
    description: 'Automatically create and track Jira issues from findings.',
    category: 'Ticketing',
    status: 'Connected',
    connectedAt: 'Apr 10, 2024',
    iconBg: 'bg-blue-600',
    iconText: 'text-white',
    initials: 'JR',
  },
  {
    id: '2',
    name: 'ServiceNow',
    description: 'Push findings into ServiceNow incidents for IT workflow.',
    category: 'Ticketing',
    status: 'Not Connected',
    iconBg: 'bg-green-600',
    iconText: 'text-white',
    initials: 'SN',
  },
  {
    id: '3',
    name: 'GitHub Issues',
    description: 'Open GitHub issues directly from remediation tasks.',
    category: 'Ticketing',
    status: 'Not Connected',
    iconBg: 'bg-slate-800',
    iconText: 'text-white',
    initials: 'GH',
  },
  // Communication
  {
    id: '4',
    name: 'Slack',
    description: 'Get real-time alerts and scan summaries in Slack channels.',
    category: 'Communication',
    status: 'Connected',
    connectedAt: 'Mar 22, 2024',
    iconBg: 'bg-purple-600',
    iconText: 'text-white',
    initials: 'SL',
  },
  {
    id: '5',
    name: 'Microsoft Teams',
    description: 'Send notifications and reports to Teams channels.',
    category: 'Communication',
    status: 'Error',
    connectedAt: 'Feb 14, 2024',
    iconBg: 'bg-indigo-600',
    iconText: 'text-white',
    initials: 'MT',
  },
  {
    id: '6',
    name: 'PagerDuty',
    description: 'Trigger PagerDuty incidents on critical findings.',
    category: 'Communication',
    status: 'Not Connected',
    iconBg: 'bg-green-700',
    iconText: 'text-white',
    initials: 'PD',
  },
  // CI/CD
  {
    id: '7',
    name: 'GitHub Actions',
    description: 'Run security scans as part of your GitHub CI pipeline.',
    category: 'CI/CD',
    status: 'Connected',
    connectedAt: 'May 01, 2024',
    iconBg: 'bg-slate-900',
    iconText: 'text-white',
    initials: 'GA',
  },
  {
    id: '8',
    name: 'GitLab CI',
    description: 'Integrate security checks into GitLab merge request pipelines.',
    category: 'CI/CD',
    status: 'Not Connected',
    iconBg: 'bg-orange-600',
    iconText: 'text-white',
    initials: 'GL',
  },
  {
    id: '9',
    name: 'Jenkins',
    description: 'Add scan stages to Jenkins build pipelines.',
    category: 'CI/CD',
    status: 'Not Connected',
    iconBg: 'bg-red-700',
    iconText: 'text-white',
    initials: 'JK',
  },
  // Cloud
  {
    id: '10',
    name: 'AWS Security Hub',
    description: 'Forward findings to AWS Security Hub for unified cloud visibility.',
    category: 'Cloud',
    status: 'Connected',
    connectedAt: 'Apr 28, 2024',
    iconBg: 'bg-yellow-500',
    iconText: 'text-white',
    initials: 'AWS',
  },
  {
    id: '11',
    name: 'Azure Defender',
    description: 'Sync scan results with Microsoft Defender for Cloud.',
    category: 'Cloud',
    status: 'Not Connected',
    iconBg: 'bg-blue-500',
    iconText: 'text-white',
    initials: 'AZ',
  },
  // SIEM
  {
    id: '12',
    name: 'Splunk',
    description: 'Stream security events and findings to Splunk for SIEM analysis.',
    category: 'SIEM',
    status: 'Not Connected',
    iconBg: 'bg-black',
    iconText: 'text-green-400',
    initials: 'SP',
  },
  {
    id: '13',
    name: 'Elastic SIEM',
    description: 'Push scan events to Elasticsearch for threat correlation.',
    category: 'SIEM',
    status: 'Not Connected',
    iconBg: 'bg-pink-600',
    iconText: 'text-white',
    initials: 'ES',
  },
  // Scanner
  {
    id: '14',
    name: 'Nessus',
    description: 'Import Nessus scan results directly into findings.',
    category: 'Scanner',
    status: 'Not Connected',
    iconBg: 'bg-teal-600',
    iconText: 'text-white',
    initials: 'NS',
  },
  {
    id: '15',
    name: 'Qualys',
    description: 'Sync Qualys vulnerability data with VaaS findings.',
    category: 'Scanner',
    status: 'Not Connected',
    iconBg: 'bg-red-600',
    iconText: 'text-white',
    initials: 'QL',
  },
];

export const integrationCategories: IntegrationCategory[] = [
  'Ticketing', 'Communication', 'CI/CD', 'Cloud', 'SIEM', 'Scanner',
];
