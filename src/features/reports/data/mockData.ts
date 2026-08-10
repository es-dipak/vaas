export type ReportType   = 'Executive' | 'Technical' | 'Compliance' | 'Summary';
export type ReportStatus = 'Ready' | 'Generating' | 'Failed';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  target: string;
  generatedAt: string;
  size: string;
  status: ReportStatus;
}

export const reportsData: Report[] = [
  {
    id: '1',
    name: 'Weekly Executive Report',
    type: 'Executive',
    target: 'All Assets',
    generatedAt: 'May 21, 2024',
    size: '1.2 MB',
    status: 'Ready',
  },
  {
    id: '2',
    name: 'example.com - Scan Report',
    type: 'Technical',
    target: 'example.com',
    generatedAt: 'May 21, 2024',
    size: '3.4 MB',
    status: 'Ready',
  },
  {
    id: '3',
    name: 'PCI-DSS Compliance Report',
    type: 'Compliance',
    target: 'All Assets',
    generatedAt: 'May 23, 2024',
    size: '2.1 MB',
    status: 'Ready',
  },
  {
    id: '4',
    name: 'api.example.com - Scan Report',
    type: 'Technical',
    target: 'api.example.com',
    generatedAt: 'May 27, 2024',
    size: '4.7 MB',
    status: 'Ready',
  },
  {
    id: '5',
    name: 'Monthly Security Summary',
    type: 'Summary',
    target: 'All Assets',
    generatedAt: 'May 28, 2024',
    size: '0.9 MB',
    status: 'Ready',
  },
  {
    id: '6',
    name: 'shop.example.com - Scan Report',
    type: 'Technical',
    target: 'shop.example.com',
    generatedAt: 'May 29, 2024',
    size: '2.8 MB',
    status: 'Ready',
  },
  {
    id: '7',
    name: 'ISO 27001 Compliance Report',
    type: 'Compliance',
    target: 'All Assets',
    generatedAt: 'May 30, 2024',
    size: '3.2 MB',
    status: 'Ready',
  },
  {
    id: '8',
    name: 'Q2 Executive Summary',
    type: 'Executive',
    target: 'All Assets',
    generatedAt: 'May 31, 2024',
    size: '1.5 MB',
    status: 'Ready',
  },
  {
    id: '9',
    name: 'admin.example.com - Scan Report',
    type: 'Technical',
    target: 'admin.example.com',
    generatedAt: 'May 31, 2024',
    size: '1.9 MB',
    status: 'Generating',
  },
];

export const reportTypeOptions = ['All Types', 'Executive', 'Technical', 'Compliance', 'Summary'];
