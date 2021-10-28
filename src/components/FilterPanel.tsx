import React, { useContext, useEffect, useState } from 'react'
// import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { StandardEmployeeType } from '../types'
import DepartmentDropdown from './dropdowns/DepartmentDropdown'


//Styling:
const MainContainer = styled.div`
  border: 2px solid #5a5a5a28;
  border-radius: 3px;
  background-color: #ffffff7a;
  margin: 10px 0px 10px 0px;
  padding: 14px;
  width: 100%;
  height: 300px;
`
/////

interface Props {
  setPanelList: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>
}

const FilterPanel = ({setPanelList}: Props) => {
  const [filteredByDep, setFilteredByDep] = useState<StandardEmployeeType[]>([])
  const {employeesData} = useContext(EmployeesContext)

  const mainFilter = () => { //funnels all the filters into one array
    let arr = employeesData
    if (filteredByDep.length > 0) {
      arr = arr.filter(employee => {
        return filteredByDep.includes(employee)
      })
    }
    setPanelList(arr)
  }

  useEffect(() => {
    mainFilter()
  }, [filteredByDep])

  return(
    <MainContainer>
      <DepartmentDropdown 
        setFilteredByDep={setFilteredByDep}
      />
      {/* <Dropdown
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e, {value}: any) => setDepartment(value)}
        options={departmentOptions}
        placeholder='Select Department'
        selection
        value={department}
      /> */}
    </MainContainer>
  )
}

export default FilterPanel