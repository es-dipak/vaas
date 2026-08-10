export type AssetType   = 'Domain' | 'Subdomain' | 'IP Range' | 'Web App' | 'API' | 'Cloud';
export type AssetStatus = 'Active' | 'Inactive' | 'Pending';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  lastScanned: string;
}

export const assetsData: Asset[] = [
  { id: '1',  name: 'example.com',          type: 'Domain',    status: 'Active',   lastScanned: 'May 31, 2024' },
  { id: '2',  name: 'api.example.com',       type: 'Subdomain', status: 'Active',   lastScanned: 'May 31, 2024' },
  { id: '3',  name: '192.168.1.0/24',        type: 'IP Range',  status: 'Active',   lastScanned: 'May 30, 2024' },
  { id: '4',  name: 'shop.example.com',      type: 'Domain',    status: 'Active',   lastScanned: 'May 31, 2024' },
  { id: '5',  name: 'app.example.com',       type: 'Subdomain', status: 'Inactive', lastScanned: 'May 10, 2024' },
  { id: '6',  name: 'mail.example.com',      type: 'Subdomain', status: 'Active',   lastScanned: 'May 29, 2024' },
  { id: '7',  name: 'dev.example.com',       type: 'Subdomain', status: 'Inactive', lastScanned: 'May 5, 2024'  },
  { id: '8',  name: '10.0.0.0/16',           type: 'IP Range',  status: 'Active',   lastScanned: 'May 28, 2024' },
  { id: '9',  name: 'staging.example.com',   type: 'Subdomain', status: 'Pending',  lastScanned: 'Apr 30, 2024' },
  { id: '10', name: 'admin.example.com',     type: 'Subdomain', status: 'Active',   lastScanned: 'May 27, 2024' },
  { id: '11', name: 'vpn.example.com',       type: 'Subdomain', status: 'Active',   lastScanned: 'May 26, 2024' },
  { id: '12', name: '172.16.0.0/12',         type: 'IP Range',  status: 'Inactive', lastScanned: 'May 3, 2024'  },
];

export const assetTypeOptions    = ['All Types', 'Domain', 'Subdomain', 'IP Range', 'Web App', 'API', 'Cloud'];
export const assetStatusOptions  = ['All Status', 'Active', 'Inactive', 'Pending'];
