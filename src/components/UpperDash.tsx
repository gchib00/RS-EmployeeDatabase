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
  upperDashList: StandardEmployeeType[];
  setUpperDashList: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const UpperDash = ({upperDashList, setUpperDashList, setCurrentPage}: Props) => {
  const [filteredBySearch, setFilteredBySearch] = useState<StandardEmployeeType[]>([])
  const [filteredBySwitch, setFilteredBySwitch] = useState<StandardEmployeeType[]>([])
  const [searchValue, setSearchValue] = useState('')
  const {employeesData} = useContext(EmployeesContext)

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
  }

  useEffect(() => {
    const filteredArr: StandardEmployeeType[] = employeesData.filter(employee => {
      const name = employee.name.toLocaleLowerCase()
      if(name.includes(searchValue.toLocaleLowerCase())){
        return employee
      }
    }) as StandardEmployeeType[];
    setFilteredBySearch(filteredArr as StandardEmployeeType[])
  }, [searchValue])

  const mainFilter = () => { //funnels all the filters into one array
    let arr = employeesData
    if (filteredBySearch.length >= 0 && searchValue.length>0) {
      arr = arr.filter(employee => {
        return filteredBySearch.includes(employee)
      })
    }
    if (filteredBySwitch.length > 0) {
      arr = arr.filter(employee => {
        return filteredBySwitch.includes(employee)
      })
    }
    setUpperDashList(arr)
  }

  useEffect(() => {
    mainFilter()
  }, [filteredBySearch, filteredBySwitch])

  return(
    <MainContainer>
      <Input icon='search' placeholder='Search...' value={searchValue} onChange={(e) => filterList(e)} />
      <OnlineOnlySwitch 
        upperDashList={upperDashList}
        setFilteredBySwitch={setFilteredBySwitch}
        setCurrentPage={setCurrentPage}
      />
    </MainContainer>
  )
}

export default UpperDash