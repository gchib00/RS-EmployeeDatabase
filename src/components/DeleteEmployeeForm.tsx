import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

//stlying:
const MainContainer = styled.form`
  width: 390px;
  max-height: 400px;
  margin: 40px auto 40px auto;
`
const BtnContainer = styled.div`
  display: flex;
  width: 146px;
  justify-content: space-between;
  margin: 15px auto auto auto;
`
const DeleteBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: rgba(202, 47, 47, 0.7);
  color: white;
  border-radius: 2px;
  border: 1px solid rgba(202, 47, 47, 0.7);
  font-family: 'Montserrat', sans-serif;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: rgba(202, 47, 47, 0.7);
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
}

const DeleteEmployeeForm = ({deleteModalStatus, setDeleteModalStatus}: Props) => {
  const {register, handleSubmit} = useForm()

  const processForm = (data: unknown) => {
    console.log(data)
  }

  return (
    <Modal
      style={{maxHeight: 470, width: 510}}
      onClose={() => setDeleteModalStatus(false)}
      onOpen={() => setDeleteModalStatus(true)}
      open={deleteModalStatus}
    >
    <MainContainer>
      <Form onSubmit={handleSubmit(processForm)}>
        <Form.Field>
          <label>Alias of the member that should be deleted:</label>
          <input {...register('name')} />
        </Form.Field>
        <BtnContainer>
          <CancelBtn type='button'>Cancel</CancelBtn>
          <DeleteBtn type='submit'>Delete</DeleteBtn>
        </BtnContainer>
      </Form>
    </MainContainer>
    </Modal>
  )
}

export default DeleteEmployeeForm
