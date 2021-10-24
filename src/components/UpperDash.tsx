import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { StandardEmployeeType } from '../types'
import OnlineOnlySwitch from './OnlineOnlySwitch'

//Styling:
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top:20px;
`
////////

interface Props {
  filteredList: StandardEmployeeType[]
  setFilteredList: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>
}

const UpperDash = ({filteredList, setFilteredList}: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const [filterByShift, setFilterByShift] = useState(true)
  const {employeesData} = useContext(EmployeesContext)

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  
  useEffect(() => {
    const filteredArr: StandardEmployeeType[] = employeesData.filter(employee => {
      const name = employee.name.toLocaleLowerCase()
      if(name.includes(searchValue.toLocaleLowerCase())){
        return employee
      }
    }) as StandardEmployeeType[];
    setFilteredList(filteredArr as StandardEmployeeType[])
  }, [searchValue])

  return(
    <MainContainer>
      <Input icon='search' placeholder='Search...' value={searchValue} onChange={(e) => filterList(e)} />
      <OnlineOnlySwitch 
        filterByShift={filterByShift}
        setFilterByShift={setFilterByShift}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
      />
    </MainContainer>
  )
}

export default UpperDash