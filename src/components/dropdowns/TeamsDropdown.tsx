import React, { useContext, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { EmployeesContext } from '../../context/EmployeesContext'


interface Team {
  key: string;
  text: string;
  value: string;
}


const TeamsDropdown = () => {
  // const [editorTeams, setEditorTeams] = useState<Team[]>([])
  const {employeesData} = useContext(EmployeesContext)

  //populate editorTeams with team options

  const editorTeams: Team[] = []
  employeesData.map(employee => {
    if (employee.department === 'editing' && employee.team) {
      const teamOption: Team =  {
        key: employee.team,
        text: employee.team,
        value: employee.team
      }
      //add option only if hasn't already been added:
      editorTeams.some(option => option.key === teamOption.key) ? null : editorTeams.push(teamOption)
    }
  })
  
  console.log('editorTeams=', editorTeams)


  return (
    <Dropdown
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={() => console.log('editorTeams=', editorTeams)}
      options={editorTeams}
      placeholder='Select Department'
      selection
      // value={department}
    />
  )
}

export default TeamsDropdown
