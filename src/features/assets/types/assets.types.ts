import type { Status } from '@/types/common.types';

export type AssetType = 'host' | 'network' | 'web_app' | 'api' | 'cloud' | 'container';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: Status;
  ipAddress?: string;
  hostname?: string;
  url?: string;
  tags: string[];
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}
