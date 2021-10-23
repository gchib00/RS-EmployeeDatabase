import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { EmployeeBase } from '../types'
import EmployeeCard from './EmployeeCard'
import UpperDash from './UpperDash'
import { EmployeesContext } from '../context/EmployeesContext'


//Styling:
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
  margin-left: 40px;
`
///////

const EmployeeList = () => {
  const {employeesData} = useContext(EmployeesContext)
  const [filteredList, setFilteredList] = useState<EmployeeBase[]>([])
  
  useEffect(() => {
    setFilteredList(employeesData)
  }, [employeesData])
  
  if (!employeesData){return <h1>Loading...</h1>}
  return(
    <MainContainer>
      <UpperDash setFilteredList={setFilteredList} />
      <section>
        {filteredList.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
      </section>
    </MainContainer>
  )
}

export default EmployeeList