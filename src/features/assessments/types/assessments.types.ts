export type AssessmentStatus =
  | 'scheduled'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type AssessmentType =
  | 'vulnerability_scan'
  | 'penetration_test'
  | 'compliance_audit';

export interface Assessment {
  id: string;
  name: string;
  type: AssessmentType;
  status: AssessmentStatus;
  targetAssets: string[];
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}
