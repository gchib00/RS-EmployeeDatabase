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
  const [filteredBySearch, setFilteredBySearch] = useState<StandardEmployeeType[]>([])
  const [filteredBySwitch, setFilteredBySwitch] = useState<StandardEmployeeType[]>([])
  const [searchValue, setSearchValue] = useState('')
  const {employeesData} = useContext(EmployeesContext)

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }


  ////CONSOLELOGS:
    console.log('values filtered inside filteredBySearch:', filteredBySearch)
    console.log('values filtered inside filteredBySwitch:', filteredBySwitch)
    console.log('filteredList:', filteredList)
  ////

  useEffect(() => {
    const filteredArr: StandardEmployeeType[] = employeesData.filter(employee => {
      const name = employee.name.toLocaleLowerCase()
      if(name.includes(searchValue.toLocaleLowerCase())){
        return employee
      }
    }) as StandardEmployeeType[];
    setFilteredBySearch(filteredArr as StandardEmployeeType[])
  }, [searchValue])

  const superFilter = () => {
    let arr = employeesData
    if (filteredBySearch.length > 0) {
      arr = arr.filter(employee => {
        return filteredBySearch.includes(employee)
      })
    }
    if (filteredBySwitch.length > 0) {
      arr = arr.filter(employee => {
        return filteredBySwitch.includes(employee)
      })
    }
    // if (arr.length === 0) {
    //   arr = employeesData
    // }
    setFilteredList(arr)
  }

  useEffect(() => {
    superFilter()
  }, [filteredBySearch, filteredBySwitch])

  return(
    <MainContainer>
      <Input icon='search' placeholder='Search...' value={searchValue} onChange={(e) => filterList(e)} />
      <OnlineOnlySwitch 
        filteredList={filteredList}
        filteredBySwitch={filteredBySwitch}
        setFilteredBySwitch={setFilteredBySwitch}
      />
    </MainContainer>
  )
}

export default UpperDash