import React from 'react'
import styled from 'styled-components'
import { EmployeeBase } from '../types'
import EmployeeCard from './EmployeeCard'
import UpperDash from './UpperDash'

//Styling:
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
  margin-left: 40px;
`
///////

interface Props {
  employeesData: EmployeeBase[];
  // setEmployeesData: (value: EmployeeBase) => void
}

const EmployeeList = ({employeesData}: Props) => {
  // if (!employeesData){return <h1>Loading...</h1>}
  return(
    <MainContainer>
      <UpperDash />
      <section>
        {employeesData.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
      </section>
    </MainContainer>
  )
}

export default EmployeeList