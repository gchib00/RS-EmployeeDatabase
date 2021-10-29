import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import EmployeeList from './components/EmployeeList'
import employeeList from './data/fakeEmployeeData.json'
import { StandardEmployeeType } from './types'
import { EmployeesContext } from './context/EmployeesContext'

const employeeData: StandardEmployeeType[] = employeeList as StandardEmployeeType[]

const App = () => {
  const [employeesData, setEmployeesData] = useState<StandardEmployeeType[]>([])
  useEffect(() => {
    if(employeesData.length == 0 || (!employeesData)) {
      setEmployeesData(employeeData)
    }
  },[])
  
  return(
    <EmployeesContext.Provider value={{employeesData, setEmployeesData}}>
      <Navbar />
      <EmployeeList />
    </EmployeesContext.Provider>
  );
}

export default App;