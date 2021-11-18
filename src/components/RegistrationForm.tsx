import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import BasicErrorMessage from './misc/BasicErrorMessage'

//styling:
const RegisterBtn = styled.button`
  text-align: center;
  transition: 650ms;
  width: 240px;
  height: 40px;
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
const ErrorContainer = styled.div`
  max-width: 240px;
  margin-top: 10px;
`
/////////

export const RegistrationForm = () => {
  const {register, handleSubmit} = useForm()
  const [adminRights, setAdminRights] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorVisibility, setErrorVisibility] = useState<boolean>(false)

  const registrationFormSubmit = async (data: any) => {
    setErrorVisibility(false)
    if(data.password1 !== data.password2) {
      return alert(`Passwords don't match!`)
    } 
    const processedData = {
      ...data, 
      password: data.password1,
      adminRights: adminRights
    }
    // console.log('registration data:', processedData)
    try {
      await axios.post('http://localhost:3005/auth/register', processedData)
    } catch (err: any) {
      setErrorMsg(err.response.data)
      setErrorVisibility(true)
    }
  }
  const changeAdminRights = (value: any) => {
    if (value.checked !== undefined){setAdminRights(value.checked)}
  }

  return (
    <Form onSubmit={handleSubmit(registrationFormSubmit)} style={{margin: 'auto'}} autoComplete="off">
      <h4 style={{textAlign: 'center'}}>Register a new user</h4>
      <Form.Field>
        <input placeholder='Choose Username' {...register('username')} style={{width:240}} />
      </Form.Field>
      <Form.Field>
        <input type='email' placeholder='Email' {...register('email')} style={{width:240}} />
      </Form.Field>
      <Form.Field>
        <input type='password' placeholder='Choose Password' {...register('password1')} style={{width:240}} />
      </Form.Field>
      <Form.Field>
        <input type='password' placeholder='Repeat Password' {...register('password2')} style={{width:240}} />
      </Form.Field>
      <Form.Field>
        <Checkbox 
          label='Request admin rights' 
          style={{marginLeft: '40px'}} 
          onChange={(e, value) => changeAdminRights(value)}
        />
      </Form.Field>
      <RegisterBtn type='submit'>Register</RegisterBtn>
      <ErrorContainer>
        <BasicErrorMessage text={errorMsg} visibility={errorVisibility} />
      </ErrorContainer>
    </Form>
  )
}