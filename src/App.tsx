import React from 'react'
import Navbar from './components/Navbar'
import EmployeeList from './components/EmployeeList'
import employeeList from './data/fakeEmployeeData.json'
import { EmployeeBase } from './types'

const employeeData: Array<EmployeeBase> = employeeList

const App = () => {
  return(
    <>
      <Navbar />
      <EmployeeList employeeData={employeeData} />
    </>
  );
}

export default App;