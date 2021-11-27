import React, { useState } from 'react'
import {  Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import { FAQItemType } from '../types'

//stlying:
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
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: green;
  }
  &:active {
    opacity: 0.25;
  }
`
const ConfirmBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: grey;
  color: white;
  border-radius: 2px;
  border: 1px solid grey;
  font-family: 'Montserrat', sans-serif;
  margin-left: 3px;
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
  deleteModalStatus: boolean;
  setDeleteModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  FAQItems: FAQItemType[];
}

export const DeleteFAQModal = ({deleteModalStatus, setDeleteModalStatus, FAQItems}: Props) => {
  const deleteFAQ = (data: any) => {
    console.log('deleting this Q:', data)
  }

  return (
    <Modal
      style={{maxHeight: 470, width: 420}}
      onClose={() => {
        setDeleteModalStatus(false) 
      }}
      onOpen={() => setDeleteModalStatus(true)}
      open={deleteModalStatus}
    >
      <h4 style={{textAlign: 'center', margin: 10}}>Are you sure you want to delete this FAQ item?</h4>
      <Modal.Actions style={{display: 'flex', justifyContent: 'center'}}>
        <CancelBtn onClick={() => setDeleteModalStatus(false)}>Cancel</CancelBtn>
        <ConfirmBtn onClick={deleteFAQ}>Yes</ConfirmBtn>
      </Modal.Actions>
    </Modal>
  )
}
