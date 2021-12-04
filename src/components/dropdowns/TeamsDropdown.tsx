import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../../context/EmployeesContext'
import { StandardEmployeeType } from '../../types'

//Styling:
const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0px 4px 0px;
`
/////////

interface Team {
  key: string;
  text: string;
  value: string;
}

interface Props {
  dept: string;
  selectedDepartment: string;
  setFilteredArr: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>;
}

const TeamsDropdown = ({dept, selectedDepartment, setFilteredArr}: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [dropdownDisabled, setDropdownDisabled] = useState(true)
  const {employeesData} = useContext(EmployeesContext)

  //populate editorTeams with team options
  const deptTeams: Team[] = []
  deptTeams.push({key: 'Any', text: 'Any', value: 'any'}) //mandatory 'any' option to be included in all dropdowns

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

  const filterArray = () => {
    let arr: StandardEmployeeType[] = employeesData
    if (dept === 'cs' || dept === 'editing') {
      arr = arr.filter(employee => {
        if (employee.department == dept) {
          return employee.team === selectedOption
        }
      })
    }
    if (dept === 'operations') {
      arr = arr.filter(employee => {
        if (employee.department == 'operations') {
          return employee.subDepartment === selectedOption
        }
      })
    }
    setFilteredArr(arr)
  }
  
  useEffect(() => {  
    filterArray()
  }, [selectedOption])

  useEffect(() => {
    if (selectedDepartment === dept) {
      setDropdownDisabled(false)
    } else {
      setSelectedOption('')
      setDropdownDisabled(true)
    }
  }, [selectedDepartment]) 

  const getTitle = () => {
    switch(dept){
      case('editing'): {return 'Editor Teams: '}
      case('cs'): {return 'CS Teams: '}
      case('operations'): {return 'Sub-Department: '}
    }
  }

  const getSpaceholder = () => {
    if(dropdownDisabled === false) {
      return 'Select'
    } else {return ''}
  }

  return (
    <DropdownContainer>
      {getTitle()}
      <Dropdown
        disabled={dropdownDisabled}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e, {value}: any) => setSelectedOption(value)}
        value={selectedOption}
        options={deptTeams}
        placeholder={getSpaceholder()}
        selection
      />
    </DropdownContainer>    
  )
}
export default TeamsDropdown