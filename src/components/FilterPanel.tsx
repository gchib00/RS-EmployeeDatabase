import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

const fakeOptions = [
  {
    key: 'Any',
    text: 'Any',
    value: 'any'
  },
  {
    key: 'Editors',
    text: 'Editors',
    value: 'editors'
  },
  {
    key: 'CS',
    text: 'CS',
    value: 'cs'
  },
  {
    key: 'Operations',
    text: 'Operations',
    value: 'operations'
  }
]

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


const FilterPanel = () => {
  const [department, setDepartment] = useState('')
  console.log(department)
  return(
    <MainContainer>
      <Dropdown
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e, {value}: any) => setDepartment(value)}
        options={fakeOptions}
        placeholder='Select Department'
        selection
        value={department}
      />
    </MainContainer>
  )
}

export default FilterPanel