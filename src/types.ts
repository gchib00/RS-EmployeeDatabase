//Employees:
export interface EmployeeBase {
  id: string;
  name: string;
  department: AcceptableDepartment;
  email: string;
  phone?: string | number;
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
export enum CSEmployeeType {
  agent = 'Agent', 
  foreignLanguageAgent = 'Foreign Language Agent',
  teamLeader = 'Team Leader', 
  other = 'Other'
}
export enum EditorEmployeeType {
  editor = 'Editor', 
  qc = 'QC',
  paintingEditor = 'Painting Editor' 
}
export enum AcceptableSubDepartment {
  technicalDepartment = 'Technical Department',
  logistics = 'Logistics',
  billingDepartment = 'Billing Department',
  other = 'Other'
}
export enum AcceptableDepartment {
  operations = 'operations',
  cs = 'cs',
  editing = 'editing'
}
export type StandardEmployeeType = EmployeeOperation | EmployeeCS | EmployeeEditor;

//Users:
export interface LoggedUser {
  _id: string,
  username: string,
  email: string,
  password: string,
  adminRights: boolean
}

//FAQ:
export interface FAQItemType {
  question: string;
  answer: string;
}