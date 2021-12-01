import React, { useContext, useEffect, useState } from 'react'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { StandardEmployeeType } from '../types'
import DepartmentDropdown from './dropdowns/DepartmentDropdown'
import TeamsDropdown from './dropdowns/TeamsDropdown'
import AddEmployeeForm from './AddEmployeeForm'
import DeleteEmployeeForm from './DeleteEmployeeForm'
import CreateTeamsBtn from './CreateTeamsBtn'
import { UserContext } from '../context/UserContext'
import { UnauthorizedUserWarning } from './misc/UnauthorizedUserWarning'

//Styling:
const MainContainer = styled.div`
  border: 2px solid #5a5a5a28;
  border-radius: 3px;
  background-color: #ffffff7a;
  margin: 10px 0px 10px 0px;
  padding: 14px;
  width: 360px;
  height: 280px;
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
const AddMemberBtn = styled.button`
    transition: 650ms;
    width: 100%;
    height: 40px;
    background-color: rgb(23, 158, 18);
    color: white;
    border-radius: 2px;
    border: 1px solid rgb(23, 158, 18);
    font-family: 'Montserrat', sans-serif;
    &:hover {
      transition: 650ms;
      background-color: rgba(0, 0, 0, 0);
      color: rgb(23, 158, 18);
      border-radius: 8px;
    }
    &:active {
      opacity: 0.25;
      border-radius: 8px;
    }
`
const DeleteMemberBtn = styled.button`
    transition: 650ms;
    width: 100%;
    height: 40px;
    background-color: rgba(202, 47, 47, 0.7);
    color: white;
    border-radius: 2px;
    border: 1px solid rgba(202, 47, 47, 0.7);
    font-family: 'Montserrat', sans-serif;
    &:hover {
      transition: 650ms;
      background-color: rgba(0, 0, 0, 0);
      color: rgba(202, 47, 47, 0.7);
      border-radius: 8px;
    }
    &:active {
      opacity: 0.25;
      border-radius: 8px;
    }
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
  const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false)
  const [UUModalStatus, setUUModalStatus] = useState<boolean>(false)
  const {user} = useContext(UserContext)
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

  const addMemberBtnClick = () => {
    if (!user || user.adminRights === false){ 
      return setUUModalStatus(true) //shows UU modal if user is either not logged in or doesn't have admin rights
    }
    setFormModalStatus(true) //shows modal for adding new members
  }
  const deleteMemberBtnClick = () => {
    if (!user || user.adminRights === false){ 
      return setUUModalStatus(true) //shows UU modal if user is either not logged in or doesn't have admin rights
    }
    setDeleteModalStatus(true) //shows modal for deleting members
  }

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
      <CreateTeamsBtn />
    </MainContainer>
    <BtnContainer>
      <AddMemberBtn onClick={() => addMemberBtnClick()}>Add a New Member</AddMemberBtn>
      <DeleteMemberBtn onClick={() => deleteMemberBtnClick()}>Delete Member</DeleteMemberBtn>
      <AddEmployeeForm formModalStatus={formModalStatus} setFormModalStatus={setFormModalStatus} />
      <DeleteEmployeeForm deleteModalStatus={deleteModalStatus} setDeleteModalStatus={setDeleteModalStatus}  />
    </BtnContainer>
    <UnauthorizedUserWarning UUModalStatus={UUModalStatus} setUUModalStatus={setUUModalStatus} />
    </>
  )
}  

export default FilterPanel