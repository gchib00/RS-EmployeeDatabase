import React, { useContext, useEffect, useState } from 'react'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { StandardEmployeeType } from '../types'
import StandardButton from './buttons/StandardButton'
import DepartmentDropdown from './dropdowns/DepartmentDropdown'
import TeamsDropdown from './dropdowns/TeamsDropdown'
import AddEmployeeForm from './AddEmployeeForm'

//Styling:
const MainContainer = styled.div`
  border: 2px solid #5a5a5a28;
  border-radius: 3px;
  background-color: #ffffff7a;
  margin: 10px 0px 10px 0px;
  padding: 14px;
  width: 360px;
  height: 300px;
`
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 88px;
  width: 360px;
`
const DeptDropdownStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
/////

interface Props {
  setPanelList: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>
}

const FilterPanel = ({setPanelList}: Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [filteredByDep, setFilteredByDep] = useState<StandardEmployeeType[]>([])
  const [filteredByEditingTeam, setFilteredByEditingTeam] = useState<StandardEmployeeType[]>([])
  const [filteredByCSTeam, setFilteredByCSTeam] = useState<StandardEmployeeType[]>([])
  const [filteredBySubDep, setFilteredBySubDep] = useState<StandardEmployeeType[]>([])
  const [formModalStatus, setFormModalStatus] = useState<boolean>(false)
  const {employeesData} = useContext(EmployeesContext)

  const mainFilter = () => { //funnels all the filters into one array
    let arr = employeesData
    if (filteredByDep.length > 0) {
      arr = arr.filter(employee => {
        return filteredByDep.includes(employee)
      })
    }
    if (filteredByEditingTeam.length > 0) {
      arr = arr.filter(employee => {
        return filteredByEditingTeam.includes(employee)
      })
    }
    if (filteredByCSTeam.length > 0) {
      arr = arr.filter(employee => {
        return filteredByCSTeam.includes(employee)
      })
    }
    if (filteredBySubDep.length > 0) {
      arr = arr.filter(employee => {
        return filteredBySubDep.includes(employee)
      })
    }
    setPanelList(arr)
  }

  useEffect(() => {
    mainFilter()
  }, [filteredByDep, filteredByEditingTeam, filteredByCSTeam, filteredBySubDep])
  
  return(
    <>
    <MainContainer>
      <DeptDropdownStyle>
        Department:
        <DepartmentDropdown 
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          setFilteredByDep={setFilteredByDep}
        />
      </DeptDropdownStyle>
      <Divider />
      <TeamsDropdown dept='editing' setFilteredArr={setFilteredByEditingTeam} selectedDepartment={selectedDepartment}/> 
      <TeamsDropdown dept='cs' setFilteredArr={setFilteredByCSTeam} selectedDepartment={selectedDepartment}/>
      <TeamsDropdown dept='operations' setFilteredArr={setFilteredBySubDep} selectedDepartment={selectedDepartment}/>
    </MainContainer>
    <BtnContainer>
      <StandardButton 
        color='rgb(23, 158, 18)' 
        hoverColor='rgba(0, 0, 0, 0)'
        width='100%' 
        height='40px' 
        textColor='white' 
        text='Add a New Member' 
        clickEvent={() => setFormModalStatus(true)} />
      <StandardButton 
        color='rgba(202, 47, 47, 0.7)'
        hoverColor='rgba(0, 0, 0, 0)' 
        width='100%' 
        height='40px' 
        textColor='white' 
        text='Delete Member' />
        <AddEmployeeForm formModalStatus={formModalStatus} setFormModalStatus={setFormModalStatus} />
    </BtnContainer>
    </>
  )
}

export default FilterPanel