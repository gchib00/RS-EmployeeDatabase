import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { CSEmployeeType } from '../../types'

//Styling:
const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 4px 0px 4px 0px;
`
/////////

interface Type {
  key: string;
  text: string;
  value: string;
}

interface Props {
  selectedDepartment: string;
}

const TypesDropdownForForm = ({selectedDepartment}: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [dropdownDisabled, setDropdownDisabled] = useState(true)

  const typeOptions: Type[] = []

  if(selectedDepartment === 'operations') {return null}
  if(selectedDepartment === 'cs') {
    Object.values(CSEmployeeType).map(value => {
        return typeOptions.push({
          key: value,
          text: value,
          value: value
        })
      }
    )
  }


  useEffect(() => {
    if (selectedDepartment !== '') {
      setDropdownDisabled(false)
    } else {
      setSelectedOption('')
      setDropdownDisabled(true)
    }
  }, [selectedDepartment]) 

  const getTitle = () => {
    switch(selectedDepartment){
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
      <strong style={{marginBottom: 5}}>
        {getTitle()}
      </strong>
      <Dropdown
        disabled={dropdownDisabled}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e, {value}: any) => setSelectedOption(value)}
        value={selectedOption}
        options={typeOptions}
        placeholder={getSpaceholder()}
        selection
      />
    </DropdownContainer>
  )
}

export default TypesDropdownForForm
