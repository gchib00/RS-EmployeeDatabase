import React, { useContext, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
import { CreateTeamsModal } from './CreateTeamsModal'
import { UnauthorizedUserWarning } from './misc/UnauthorizedUserWarning'

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
  const [UUModalStatus, setUUModalStatus] = useState<boolean>(false)
  const {user} = useContext(UserContext)

  const handleEditorOption = () => {
    if (!user || user.adminRights === false){ 
      return setUUModalStatus(true) //shows UU modal if user is either not logged in or doesn't have admin rights
    }
    setFormModalStatus(true)
    setDepartment('editing')
  }
  const handleCsOption = () => {
    if (!user || user.adminRights === false){ 
      return setUUModalStatus(true) //shows UU modal if user is either not logged in or doesn't have admin rights
    }
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
      <UnauthorizedUserWarning UUModalStatus={UUModalStatus} setUUModalStatus={setUUModalStatus} />
    </MainContainer>
  )
}

export default CreateTeamsBtn

