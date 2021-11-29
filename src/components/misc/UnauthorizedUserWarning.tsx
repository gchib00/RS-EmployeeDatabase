import React from 'react'
import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

//styling:
const MainContainer = styled.div`
  margin: 10px auto 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`
const CloseModalBtn = styled.button`
  transition: 650ms;
  width: 100px;
  margin: auto;
  height: 26px;
  background-color: green;
  color: white;
  border-radius: 2px;
  border: 1px solid green;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.96rem;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: green;
  }
  &:active {
    opacity: 0.25;
  }
`
/////////

interface Props {
  UUModalStatus: boolean;
  setUUModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const UnauthorizedUserWarning = ({UUModalStatus, setUUModalStatus}: Props) => {
  return (
    <Modal
      style={{height: 100, width: 380}}
      onClose={() => setUUModalStatus(false)}
      onOpen={() => setUUModalStatus(true)}
      open={UUModalStatus}
    >
    <MainContainer>
      <h4 style={{textAlign: 'center'}}>To perform this action, you must be logged in as an admin user.</h4>
      <CloseModalBtn onClick={() => setUUModalStatus(false)}>Go Back</CloseModalBtn>
    </MainContainer>
    </Modal>
  )
}
