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
import { UserContext } from './context/UserContext'
import { FAQPage } from './components/FAQPage'
import { ArtistsPage } from './components/ArtistsPage'

const App = () => {
  const [employeesData, setEmployeesData] = useState<StandardEmployeeType[]>([])
  const [user, setUser] = useState<LoggedUser|undefined>()

  const fetchEmployees = async () => {
    try {
      const apiResponse = await axios.get<StandardEmployeeType[]>('/employees')
      setEmployeesData(apiResponse.data)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => { //fetch employee data on app start 
    if(employeesData.length == 0 || (!employeesData)) {
      fetchEmployees()
    }
  },[])
  const getLoggedUser = async (token: string) =>{ 
    if (!token) {return null}
    try {
      const loggedUser = await axios.post('/auth/loggedUser', {token: token})
      setUser(loggedUser.data[0])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response.data)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {getLoggedUser(token)} //if token exists, find its user and set it to the state
  }, [])

  return(
    <UserContext.Provider value={{user, setUser}}>
    <EmployeesContext.Provider value={{employeesData, setEmployeesData}}>
      <Navbar />
      <LoggedUserText />
      <Routes>
        <Route path='/' element={employeesData.length === 0 ? <Loader active /> :<EmployeeList />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/login' element={user ? null : <AuthPage />} />
        <Route path='/artist' element={<ArtistsPage />} />
      </Routes>
    </EmployeesContext.Provider>
    </UserContext.Provider>
  );
}
export default App;