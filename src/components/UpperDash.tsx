import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { EmployeeBase } from '../types'

//Styling:
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0px 30px 0px;
`
////////

interface Props {
  setFilteredList: React.Dispatch<React.SetStateAction<EmployeeBase[]>>
}

const UpperDash = ({setFilteredList}: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const {employeesData} = useContext(EmployeesContext)
  const employeesCount = employeesData.length;

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  
  useEffect(() => {
    const filteredList: EmployeeBase[] = employeesData.filter(employee => {
      const name = employee.name.toLocaleLowerCase()
      if(name.includes(searchValue.toLocaleLowerCase())){
        return employee
      }
    }) as EmployeeBase[];
    setFilteredList(filteredList as EmployeeBase[] )
  }, [searchValue])

  return(
    <MainContainer>
      <Input icon='search' placeholder='Search...' value={searchValue} onChange={(e) => filterList(e)} />
      <p>Employee Count: <strong>{employeesCount}</strong></p>
    </MainContainer>
  )
}

export default UpperDash