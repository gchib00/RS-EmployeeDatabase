import React, { useContext } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../../context/EmployeesContext'

//Styling:
const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
/////////

interface Team {
  key: string;
  text: string;
  value: string;
}

interface Props {
  dept: string
}

const TeamsDropdown = ({dept}: Props) => {
  const {employeesData} = useContext(EmployeesContext)

  //populate editorTeams with team options
  const deptTeams: Team[] = []
  employeesData.map(employee => {
    if (dept === 'cs' ||dept === 'editing'){
      if (employee.department === dept && employee.team) {
        const teamOption: Team =  {
          key: employee.team,
          text: employee.team,
          value: employee.team
        }
        //add option only if hasn't already been added:
        deptTeams.some(option => option.key === teamOption.key) ? null : deptTeams.push(teamOption)
      }
    }
    if (dept === 'operations'){
      if (employee.department === dept && employee.subDepartment) {
        const teamOption: Team =  {
          key: employee.subDepartment,
          text: employee.subDepartment,
          value: employee.subDepartment
        }
        //add option only if hasn't already been added:
        deptTeams.some(option => option.key === teamOption.key) ? null : deptTeams.push(teamOption)
      }
    }
  })

  const getTitle = () => {
    switch(dept){
      case('editing'): {return 'Editor Teams: '}
      case('cs'): {return 'CS Teams: '}
      case('operations'): {return 'Sub-Department: '}
    }
  }
  
  return (
    <DropdownContainer>
      {getTitle()}
      <Dropdown
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={() => console.log('teams=', deptTeams)}
        options={deptTeams}
        placeholder='Select Department'
        selection
      />
    </DropdownContainer>    
  )
}

export default TeamsDropdown
