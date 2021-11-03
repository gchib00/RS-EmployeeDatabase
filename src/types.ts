export interface EmployeeBase {
  id: string;
  name: string;
  department: AcceptableDepartment;
  email: string;
  phone: string | number;
  status: string;
  shift?: {
    start: string;
    length: number;
  }
}

export interface EmployeeEditor extends EmployeeBase {
  department: AcceptableDepartment.editing;
  team?: string;
  type: EditorEmployeeType;
}

export interface EmployeeCS extends EmployeeBase {
  department: AcceptableDepartment.cs;
  team?: string;
  type: CSEmployeeType;
}

export interface EmployeeOperation extends EmployeeBase {
  department: AcceptableDepartment.operations;
  subDepartment: AcceptableSubDepartment;
}

enum CSEmployeeType {
  agent = 'Agent', 
  foreignLanguageAgent = 'Foreign Language Agent',
  teamLeader = 'Team Leader', 
  other = 'Other'
}
enum EditorEmployeeType {
  editor = 'Editor', 
  qc = 'QC',
  paintingEditor = 'Painting Editor' 
}
enum AcceptableSubDepartment {
  technicalDepartment = 'Technical Department',
  logistics = 'Logistics',
  billingDepartment = 'Billing Department',
  other = 'Other'
}
enum AcceptableDepartment {
  operations = 'operations',
  cs = 'cs',
  editing = 'editing'
}
export type StandardEmployeeType = EmployeeOperation | EmployeeCS | EmployeeEditor;