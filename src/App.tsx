import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import EmployeeList from './components/EmployeeList'
import employeeList from './data/fakeEmployeeData.json'
import { EmployeeBase } from './types'
import { EmployeesContext } from './context/EmployeesContext'


const employeeData: EmployeeBase[] = employeeList

const App = () => {
  const [employeesData, setEmployeesData] = useState<EmployeeBase[]>([])
  useEffect(() => {
    if(employeesData.length === 0) {
      setEmployeesData(employeeData)
    }
  },[])
  return(
    <EmployeesContext.Provider value='Hello from provider :)'>
      <Navbar />
      <EmployeeList employeesData={employeesData} />
    </EmployeesContext.Provider>
  );
}

export default App;