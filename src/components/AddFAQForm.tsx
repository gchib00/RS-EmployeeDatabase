import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import { FAQItemType } from '../types'
import BasicErrorMessage from './misc/BasicErrorMessage'

//styling:
const MainContainer = styled.div`
  width: 340px;
  max-height: 320px;
  margin: 40px auto 40px auto;
`
const BtnContainer = styled.div`
  display: flex;
  width: 146px;
  justify-content: space-between;
  margin: 30px auto auto auto;
`
const SubmitBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: rgb(23, 158, 18);
  color: white;
  border-radius: 2px;
  border: 1px solid rgb(23, 158, 18);
  font-family: 'Montserrat', sans-serif;
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
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: grey;
  }
  &:active {
    opacity: 0.25;
  }
`
////////////

interface Props { 
  addFormModalStatus: boolean;
  setAddFormModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setFAQItems: React.Dispatch<React.SetStateAction<FAQItemType[] | undefined>>;
}
interface FormData {
  question: string;
  answer: string;
}

export const AddFAQForm = ({addFormModalStatus, setAddFormModalStatus, setFAQItems}: Props) => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const {register, handleSubmit, reset} = useForm()
  
  const processFormData = async (data: FormData) => {
    const FAQ_Object = {
      question: data.question,
      answer: data.answer
    }
    try {
      const resposne = await axios.post('http://localhost:3005/faq/add', FAQ_Object)
      setFAQItems(resposne.data) //pass updated list to the state
      setAddFormModalStatus(false); reset(); setErrorMsg('') //set form settings to default after submit
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err.response.data)
    }
  }

  return (
    <Modal
      style={{maxHeight: 400, width: 480}}
      onClose={() => {setAddFormModalStatus(false); reset(); setErrorMsg('')}}
      onOpen={() => setAddFormModalStatus(true)}
      open={addFormModalStatus}
    >
    <MainContainer>
      <Form onSubmit={handleSubmit(processFormData)}>
        <Form.Field>
          <label>Question</label>
          <input placeholder='Question for your new FAQ item' {...register('question')} />
        </Form.Field>
        <Form.Field>
          <label>Answer</label>
          <input placeholder='Answer for your new FAQ item' {...register('answer')} />
        </Form.Field>
        <BasicErrorMessage text={errorMsg} visibility={true} />
        <BtnContainer>
          <CancelBtn type='button' onClick={() => {
            setAddFormModalStatus(false)
            setErrorMsg('')
            reset()}}>Cancel
          </CancelBtn>
          <SubmitBtn type='submit'>Submit</SubmitBtn> 
        </BtnContainer>
      </Form>
    </MainContainer>
    </Modal>
  )
}