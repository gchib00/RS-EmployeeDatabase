import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import EmployeeList from './components/EmployeeList'
import AuthPage from './components/AuthPage'
import axios from 'axios'
import { LoggedUser, StandardEmployeeType } from './types'
import { EmployeesContext } from './context/EmployeesContext'
import { Loader } from 'semantic-ui-react'
import {Route, Routes} from "react-router-dom"
import { LoggedUserText } from './components/LoggedUserText'

const App = () => {
  const [employeesData, setEmployeesData] = useState<StandardEmployeeType[]>([])
  const loggedUser: LoggedUser|undefined = JSON.parse(localStorage.getItem('loggedUser') as string)

  useEffect(() => {
    console.log('from App:',loggedUser)
  }, [loggedUser])

  


  const fetchEmployees = async () => {
    try {
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
      <LoggedUserText />
      <Routes>
        <Route path='/' element={employeesData.length === 0 ? <Loader active /> :<EmployeeList />} />
        <Route path='/login' element={loggedUser ? null : <AuthPage />} />
        {/* <Route path='/votes' element={<Votes />} /> */}
      </Routes>
    </EmployeesContext.Provider>
  );
}

export default App;