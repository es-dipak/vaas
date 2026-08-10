import type { Severity } from '@/types/common.types';

export type FindingStatus =
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'accepted_risk'
  | 'false_positive';

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: FindingStatus;
  assetId: string;
  assessmentId: string;
  cve?: string;
  cvssScore?: number;
  createdAt: string;
  updatedAt: string;
}
