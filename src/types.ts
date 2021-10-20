export interface EmployeeBase {
  id: string;
  name: string;
  department: string;
  subDepartment?: string;
  team?: string;
  phone: string | number;
  status: string;
  shift?: {
    start: string;
    end: string;
  }
}