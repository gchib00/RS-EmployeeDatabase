import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { CSEmployeeType, EditorEmployeeType } from '../../types'

//Styling:
const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 4px 0px 18px 0px;
`
/////////
interface Type {
  key: string;
  text: string;
  value: string;
}
interface Props {
  selectedDepartment: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string|undefined>>;
}

const TypesDropdownForForm = ({selectedDepartment, setSelectedType}: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [dropdownDisabled, setDropdownDisabled] = useState(true)

  const typeOptions: Type[] = []
  //populate typeOptions according to the selected department
  switch(selectedDepartment){
    case('operations'): {
      null
      break
    }
    case('cs'): {
      Object.values(CSEmployeeType).map(value => {
        return typeOptions.push({
          key: value,
          text: value,
          value: value
        })
      })
      break
    }
    case('editing'): {
      Object.values(EditorEmployeeType).map(value => {
        return typeOptions.push({
          key: value,
          text: value,
          value: value
        })
      })
      break
    }
  }
  useEffect(() => {
    setSelectedType(selectedOption)
  }, [selectedOption])
  
  useEffect(() => {
    setSelectedType(undefined)
    if (selectedDepartment !== '') {
      setDropdownDisabled(false)
    } else {
      setSelectedOption('')
      setDropdownDisabled(true)
    }
  }, [selectedDepartment]) 

  if(dropdownDisabled === true || selectedDepartment === 'operations') {return null}
  return (
    <DropdownContainer>
      <strong style={{marginBottom: 5}}>
        Type:
      </strong>
      <Dropdown
        disabled={dropdownDisabled}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e, {value}: any) => setSelectedOption(value)}
        value={selectedOption}
        options={typeOptions}
        placeholder='Select'
        selection
      />
    </DropdownContainer>
  )
}

export default TypesDropdownForForm
