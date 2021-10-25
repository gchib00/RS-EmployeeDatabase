import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { StandardEmployeeType } from '../types'
import EmployeeCard from './EmployeeCard'
import UpperDash from './UpperDash'
import FilterPanel from './FilterPanel'
import { EmployeesContext } from '../context/EmployeesContext'


//Styling:
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 40px;
`
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
`
const SecondDiv = styled.div`
  max-width: 380px;
`
///////

const EmployeeList = () => {
  const {employeesData} = useContext(EmployeesContext)
  const [filteredList, setFilteredList] = useState<StandardEmployeeType[]>([])
  
  useEffect(() => {
    setFilteredList(employeesData)
  }, [employeesData])

  // if(filteredList.length === 0) {
  //   return null
  // }
  
  if (!employeesData){return <h1>Loading...</h1>}
  return(
    <MainContainer>
      <FirstDiv>
        <UpperDash filteredList={filteredList} setFilteredList={setFilteredList} />
        <section>
          {filteredList.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
        </section>
      </FirstDiv>
      <SecondDiv>
        <FilterPanel filteredList={filteredList} setFilteredList={setFilteredList} />
      </SecondDiv>
    </MainContainer>
  )
}

export default EmployeeList