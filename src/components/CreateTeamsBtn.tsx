import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { CreateTeamsModal } from './CreateTeamsModal'

//styling:
const MainContainer = styled.div`
  margin-top: 20px;
  height: 37px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`
const ButtonStyling = {
  width:155,
  textAlign: 'left',
  fontSize: '0.87rem',
  backgroundColor: '#ebebeb',
  display: 'flex',
  alignItems: 'center',
}
/////////

const CreateTeamsBtn = () => {
  const [formModalStatus, setFormModalStatus] = useState<boolean>(false)
  const [department, setDepartment] = useState<string>('')

  const handleEditorOption = () => {
    setFormModalStatus(true)
    setDepartment('editing')
  }
  const handleCsOption = () => {
    setFormModalStatus(true)
    setDepartment('cs')
  }

  return (
    <MainContainer>
      <Button compact style={ButtonStyling} onClick={handleEditorOption}>
        <Icon name='add' size='large' color='grey' />
        New Editors Team
      </Button>
      <Button compact style={ButtonStyling} onClick={handleCsOption}>
        <Icon name='add' size='large' color='grey' />
        New CS Team
      </Button>
      <CreateTeamsModal formModalStatus={formModalStatus} setFormModalStatus={setFormModalStatus} department={department}/>
    </MainContainer>
  )
}

export default CreateTeamsBtn

