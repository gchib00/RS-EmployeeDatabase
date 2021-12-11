import React from 'react'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import { LoginForm } from './LoginForm'
import { RegistrationForm } from './RegistrationForm'

//styling:
const MainContainer = styled.div`
  width: 800px;
  height: 400px;
  margin: 60px auto 0px auto;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
`
const dividerStyle = {
  position: 'relative',
  left: 0,
  marginLeft: 20
}
/////////

const AuthPage = () => {
  return(
    <MainContainer>
      <LoginForm />
      <Divider vertical style={dividerStyle}>Or</Divider>
      <RegistrationForm />
    </MainContainer>
  )
}
export default AuthPage