import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
import { LogoutModal } from './LogoutModal'

//styles:
const MainContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  font-family: 'Montserrat', sans-serif;
  margin: 8px;
`

export const LoggedUserText = () => {
  const [logoutModalStatus, setLogoutModalStatus] = useState<boolean>(false)
  const {user} = useContext(UserContext)

  if (!user) {return null}
  return (
    <MainContainer>
      <p>Logged in as {user.username}.</p>
      <LogoutModal logoutModalStatus={logoutModalStatus} setLogoutModalStatus={setLogoutModalStatus} />
    </MainContainer>
  )
}
