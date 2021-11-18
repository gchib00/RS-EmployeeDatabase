import { createContext } from 'react'
import { StandardEmployeeType } from '../types'

interface EmployeesListProp {
  employeesData: StandardEmployeeType[];
  setEmployeesData: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>
}

export const EmployeesContext = createContext({} as EmployeesListProp)