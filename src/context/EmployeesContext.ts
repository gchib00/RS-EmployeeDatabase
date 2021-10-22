import { createContext } from 'react'
import { EmployeeBase } from '../types'

interface EmployeesListProp {
  employeesData: EmployeeBase[];
  setEmployeesData: React.Dispatch<React.SetStateAction<EmployeeBase[]>>
}

export const EmployeesContext = createContext<EmployeesListProp>({} as EmployeesListProp)