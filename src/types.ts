export interface EmployeeBase {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string | number;
  status: string;
  shift?: {
    start: string;
    length: number;
  }
}

export interface EmployeeEditor extends EmployeeBase {
  department: 'editors';
  team?: string;
  type: 'Editor' | 'QC' | 'Painting Editor';
}

export interface EmployeeCS extends EmployeeBase {
  department: 'cs';
  team?: string;
  type: 'Agent' | 'Foreign Language Agent' | 'Team Leader' | 'Other';
}

export interface EmployeeOperation extends EmployeeBase {
  department: 'operations';
  subDepartment: 'Technical Department' | 'Logistics' | 'Billing Department' | 'Other';
}

export type StandardEmployeeType = EmployeeOperation | EmployeeCS | EmployeeEditor;