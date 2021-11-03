import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import EmployeeList from './components/EmployeeList'
import { StandardEmployeeType } from './types'
import { EmployeesContext } from './context/EmployeesContext'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'

const App = () => {
  const [employeesData, setEmployeesData] = useState<StandardEmployeeType[]>([])

  const fetchEmployees = async () => {
    try{
      const apiResponse = await axios.get<StandardEmployeeType[]>('http://localhost:3005/employees')
      setEmployeesData(apiResponse.data)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if(employeesData.length == 0 || (!employeesData)) {
      fetchEmployees()
    }
  },[])
  return(
    <EmployeesContext.Provider value={{employeesData, setEmployeesData}}>
      <Navbar />
      {employeesData.length === 0 ? <Loader active /> :<EmployeeList />}
    </EmployeesContext.Provider>
  );
}

export default App;