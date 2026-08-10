export type AssetType   = 'Domain' | 'Subdomain' | 'IP Range' | 'Web App' | 'API' | 'Cloud';
export type AssetStatus = 'Active' | 'Inactive' | 'Pending';

export interface Asset {
  id: string;
  name: string;
  client: string;
  type: AssetType;
  status: AssetStatus;
  environment: string;
  lastScanned: string;
}

export const assetsData: Asset[] = [
  { id: '1',  name: 'example.com',          client: 'Acme Corporation',    type: 'Domain',    status: 'Active',   environment: 'Production',   lastScanned: 'May 31, 2024' },
  { id: '2',  name: 'api.example.com',       client: 'Acme Corporation',    type: 'Subdomain', status: 'Active',   environment: 'Production',   lastScanned: 'May 31, 2024' },
  { id: '3',  name: '192.168.1.0/24',        client: 'LogiTrans Group',     type: 'IP Range',  status: 'Active',   environment: 'Production',   lastScanned: 'May 30, 2024' },
  { id: '4',  name: 'shop.example.com',      client: 'RetailEdge Inc.',     type: 'Web App',   status: 'Active',   environment: 'Production',   lastScanned: 'May 31, 2024' },
  { id: '5',  name: 'app.example.com',       client: 'TechNova Solutions',  type: 'Subdomain', status: 'Inactive', environment: 'Staging',      lastScanned: 'May 10, 2024' },
  { id: '6',  name: 'mail.example.com',      client: 'Acme Corporation',    type: 'Subdomain', status: 'Active',   environment: 'Production',   lastScanned: 'May 29, 2024' },
  { id: '7',  name: 'dev.example.com',       client: 'TechNova Solutions',  type: 'API',       status: 'Inactive', environment: 'Development',  lastScanned: 'May 5, 2024'  },
  { id: '8',  name: '10.0.0.0/16',           client: 'FinSecure Bank',      type: 'IP Range',  status: 'Active',   environment: 'Production',   lastScanned: 'May 28, 2024' },
  { id: '9',  name: 'staging.example.com',   client: 'RetailEdge Inc.',     type: 'Subdomain', status: 'Pending',  environment: 'Staging',      lastScanned: 'Apr 30, 2024' },
  { id: '10', name: 'admin.example.com',     client: 'FinSecure Bank',      type: 'Web App',   status: 'Active',   environment: 'Production',   lastScanned: 'May 27, 2024' },
  { id: '11', name: 'vpn.example.com',       client: 'Acme Corporation',    type: 'Subdomain', status: 'Active',   environment: 'Production',   lastScanned: 'May 26, 2024' },
  { id: '12', name: '172.16.0.0/12',         client: 'LogiTrans Group',     type: 'IP Range',  status: 'Inactive', environment: 'Testing',      lastScanned: 'May 3, 2024'  },
];

export const assetTypeOptions    = ['All Types', 'Domain', 'Subdomain', 'IP Range', 'Web App', 'API', 'Cloud'];
export const assetStatusOptions  = ['All Status', 'Active', 'Inactive', 'Pending'];
export const assetClientOptions  = [
  'All Clients',
  'Acme Corporation',
  'TechNova Solutions',
  'RetailEdge Inc.',
  'FinSecure Bank',
  'LogiTrans Group',
];
