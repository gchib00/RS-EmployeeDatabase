import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'

//styling:
const Logout = styled.p`
  font-weight: bold;
  cursor: pointer;
  margin-left: 4px;
`
const CancelBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: green;
  color: white;
  border-radius: 2px;
  border: 1px solid green;
  font-family: 'Montserrat', sans-serif;
  margin-right: 3px;
  cursor: pointer;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: green;
  }
  &:active {
    opacity: 0.25;
  }
`
const LogoutBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: grey;
  color: white;
  border-radius: 2px;
  border: 1px solid grey;
  font-family: 'Montserrat', sans-serif;
  margin-left: 3px;
  cursor: pointer;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: grey;
  }
  &:active {
    opacity: 0.25;
  }
`
/////////

interface Props {
  logoutModalStatus: boolean,
  setLogoutModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutModal = ({logoutModalStatus, setLogoutModalStatus}: Props) => {
  const {setUser} = useContext(UserContext)

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    setUser(undefined)
    setLogoutModalStatus(false)
  }

  return (
    <Modal
      onClose={() => setLogoutModalStatus(false)}
      onOpen={() => setLogoutModalStatus(true)}
      trigger={<Logout>Logout</Logout>}
      open={logoutModalStatus}
      style={{width: 300}}
    >
      <h4 style={{textAlign: 'center', margin: 10}}>Are you sure you want to log-out?</h4>
      <Modal.Actions style={{display: 'flex', justifyContent: 'center'}}>
        <CancelBtn onClick={() => setLogoutModalStatus(false)}>Cancel</CancelBtn>
        <LogoutBtn onClick={handleLogout}>Yes</LogoutBtn>
      </Modal.Actions>
    </Modal>
  )
}
