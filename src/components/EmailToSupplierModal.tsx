import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Loader, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'

//styling:
const SubmitBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: rgb(23, 158, 18);
  color: white;
  border-radius: 2px;
  border: 1px solid rgb(23, 158, 18);
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(23, 158, 18);
  }
  &:active {
    opacity: 0.25;
  }
`
const CancelBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: grey;
  color: white;
  border-radius: 2px;
  border: 1px solid grey;
  font-family: 'Montserrat', sans-serif;
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
const formStyling = {
  width: '80%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '40px auto 40px auto'
}
const BtnContainer = styled.div`
  margin-top: 20px;
  width: 148px;
  display: flex;
  justify-content: space-between;
`
/////////

interface Props {
  emailModalStatus: boolean;
  setEmailModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  activeOrder: string|undefined;
}
interface FormData {
  emailContent: string;
}

export const EmailToSupplierModal = ({emailModalStatus, setEmailModalStatus, activeOrder}: Props) => {
  const {register, handleSubmit, reset} = useForm()
  const {user} = useContext(UserContext)
  const [loader, setLoader] = useState<boolean>(false)

  const processFormData = async (data: FormData) => {
    const dataObj = {
      message: data.emailContent,
      emailSender: user?.email,
      orderID: activeOrder
    } 
    try {
      setLoader(true)
      const response = await axios.post('/email/artistToSupplier', dataObj)
      setLoader(false)
      setEmailModalStatus(false)
      alert(response.data)
    } catch(err: any) {
      setLoader(false)
      alert(err)
    }
  }
  //show loader animation while email is being sent:
  if (loader) {return <Modal><Loader/></Modal>}
  return (
    <Modal
      onClose={() => setEmailModalStatus(false)}
      onOpen={() => setEmailModalStatus(true)}
      open={emailModalStatus}
      style={{width:600, minHeight: 300}}
    >
      <Form onSubmit={handleSubmit(processFormData)} style={formStyling}>
        <textarea placeholder='Your Message...' {...register('emailContent')} />
        <BtnContainer>
          <CancelBtn type='button' onClick={() => {
            setEmailModalStatus(false)
            reset()}}>Cancel
          </CancelBtn>
          <SubmitBtn type='submit'>Submit</SubmitBtn> 
        </BtnContainer>
      </Form>
    </Modal>
  )
}
