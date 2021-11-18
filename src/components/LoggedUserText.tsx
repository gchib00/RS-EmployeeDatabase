import React, { useState } from 'react'
import styled from 'styled-components'
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
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser') as string)

  if (!loggedUser) {return null}
  return (
    <MainContainer>
      <p>Logged in as {loggedUser.username}.</p>
      <LogoutModal logoutModalStatus={logoutModalStatus} setLogoutModalStatus={setLogoutModalStatus} />
    </MainContainer>
  )
}
