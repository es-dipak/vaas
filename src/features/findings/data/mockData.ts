export type FindingSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type FindingStatus   = 'Open' | 'In Progress' | 'Resolved' | 'Accepted Risk' | 'False Positive';

export interface Finding {
  id: string;
  severity: FindingSeverity;
  title: string;
  asset: string;
  status: FindingStatus;
  discovered: string;
  cve?: string;
  cvss?: number;
  description?: string;
}

export const findingsData: Finding[] = [
  {
    id: '1',
    severity: 'Critical',
    title: 'SQL Injection',
    asset: 'api.example.com',
    status: 'Open',
    discovered: 'May 26, 2024',
    cvss: 9.8,
    description: 'A SQL injection vulnerability was found in the login endpoint allowing attackers to execute arbitrary SQL commands.',
  },
  {
    id: '2',
    severity: 'High',
    title: 'Outdated OpenSSL (CVE-2023-5448)',
    asset: 'example.com',
    status: 'Open',
    discovered: 'May 31, 2024',
    cve: 'CVE-2023-5448',
    cvss: 8.1,
    description: 'The server is running an outdated version of OpenSSL with known vulnerabilities.',
  },
  {
    id: '3',
    severity: 'High',
    title: 'Directory Listing Enabled',
    asset: 'shop.example.com',
    status: 'Open',
    discovered: 'May 31, 2024',
    cvss: 7.5,
    description: 'Directory listing is enabled on the web server, exposing file structure.',
  },
  {
    id: '4',
    severity: 'Medium',
    title: 'Missing Security Headers',
    asset: 'shop.example.com',
    status: 'Open',
    discovered: 'May 30, 2024',
    cvss: 5.3,
    description: 'Several important security headers are missing including Content-Security-Policy and X-Frame-Options.',
  },
  {
    id: '5',
    severity: 'Medium',
    title: 'TLS Certificate Expiring Soon',
    asset: 'api.example.com',
    status: 'Open',
    discovered: 'May 30, 2024',
    cvss: 5.0,
    description: 'The TLS certificate will expire in 14 days. Renew it to avoid service disruption.',
  },
  {
    id: '6',
    severity: 'Low',
    title: 'Server Information Disclosure',
    asset: '192.168.1.13',
    status: 'Open',
    discovered: 'May 30, 2024',
    cvss: 3.1,
    description: 'The server is revealing version information in HTTP response headers.',
  },
  {
    id: '7',
    severity: 'Critical',
    title: 'Remote Code Execution via Deserialization',
    asset: 'api.example.com',
    status: 'In Progress',
    discovered: 'May 28, 2024',
    cvss: 9.9,
    cve: 'CVE-2023-1001',
    description: 'Unsafe deserialization allows remote code execution without authentication.',
  },
  {
    id: '8',
    severity: 'High',
    title: 'Cross-Site Scripting (Stored XSS)',
    asset: 'shop.example.com',
    status: 'Open',
    discovered: 'May 27, 2024',
    cvss: 7.2,
    description: 'Stored XSS found in the product review section.',
  },
  {
    id: '9',
    severity: 'Medium',
    title: 'Insecure Direct Object Reference',
    asset: 'api.example.com',
    status: 'Resolved',
    discovered: 'May 24, 2024',
    cvss: 6.5,
    description: 'IDOR vulnerability allows access to other users\' data by manipulating IDs.',
  },
  {
    id: '10',
    severity: 'Low',
    title: 'Verbose Error Messages',
    asset: 'example.com',
    status: 'Accepted Risk',
    discovered: 'May 22, 2024',
    cvss: 2.6,
    description: 'Detailed error messages expose internal application information.',
  },
  {
    id: '11',
    severity: 'High',
    title: 'Broken Authentication — Weak Passwords',
    asset: 'admin.example.com',
    status: 'Open',
    discovered: 'May 20, 2024',
    cvss: 8.0,
    description: 'No password complexity requirements enforced. Common passwords accepted.',
  },
  {
    id: '12',
    severity: 'Medium',
    title: 'CSRF Token Not Validated',
    asset: 'shop.example.com',
    status: 'In Progress',
    discovered: 'May 18, 2024',
    cvss: 5.8,
    description: 'CSRF tokens are present but not validated server-side on sensitive endpoints.',
  },
  {
    id: '13',
    severity: 'Info',
    title: 'HTTP Used Instead of HTTPS',
    asset: 'dev.example.com',
    status: 'Open',
    discovered: 'May 15, 2024',
    cvss: 0.0,
    description: 'Development server serving content over unencrypted HTTP.',
  },
  {
    id: '14',
    severity: 'Critical',
    title: 'Authentication Bypass via JWT None Algorithm',
    asset: 'api.example.com',
    status: 'Open',
    discovered: 'May 12, 2024',
    cve: 'CVE-2023-0002',
    cvss: 9.4,
    description: 'JWT "none" algorithm accepted allowing complete authentication bypass.',
  },
  {
    id: '15',
    severity: 'High',
    title: 'Open Redirect',
    asset: 'example.com',
    status: 'Resolved',
    discovered: 'May 10, 2024',
    cvss: 7.4,
    description: 'Unvalidated redirect allows phishing attacks via trusted domain.',
  },
];

export const severityOptions = ['All Severities', 'Critical', 'High', 'Medium', 'Low', 'Info'];
export const statusOptions    = ['All Status', 'Open', 'In Progress', 'Resolved', 'Accepted Risk', 'False Positive'];
export const assetOptions     = ['All Assets', 'api.example.com', 'example.com', 'shop.example.com', 'admin.example.com', 'dev.example.com', '192.168.1.13'];
