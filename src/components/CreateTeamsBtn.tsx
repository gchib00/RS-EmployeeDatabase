import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

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
  return (
    <MainContainer>
      <Button compact style={ButtonStyling}>
        <Icon name='add' size='large' color='grey' />
        New Editors Team
      </Button>
      <Button compact style={ButtonStyling}>
        <Icon name='add' size='large' color='grey' />
        New CS Team
      </Button>
    </MainContainer>
  )
}

export default CreateTeamsBtn

