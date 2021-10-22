import React, { useContext } from 'react'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0px 30px 0px;
`
const UpperDash = () => {
  const {employeesData, setEmployeesData} = useContext(EmployeesContext)
  const employeesCount = employeesData.length;
  return(
    <MainContainer>
      <Input icon='search' placeholder='Search...' />
      <p>Employee Count: <strong>{employeesCount}</strong></p>
    </MainContainer>
  )
}

export default UpperDash