import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox, Divider, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import BasicErrorMessage from './misc/BasicErrorMessage'

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
const LoginBtn = styled.button`
  transition: 650ms;
  width: 240px;
  height: 40px;
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
/////////

const LoginPage = () => {
  const {register, handleSubmit} = useForm()
  const {register: register2, handleSubmit: handleSubmit2} = useForm()
  const [adminRights, setAdminRights] = useState<boolean>(false)
  const [loginErr, setLoginErr] = useState<string>('')
  const [registrationErr, setRegistrationErr] = useState<string>('')
  const [showLoginErr, setShowLoginErr] = useState<boolean>(false)
  const [showRegistrationErr, setShowRegistrationErr] = useState<boolean>(false)

  const lognFormSubmit = async (data: any) => {
    // console.log('login data:', data)
    await axios.post('http://localhost:3005/auth/login', data)
  }
  const registrationFormSubmit = async (data: any) => {
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
      console.log(err.response.data)
    }
  }
  const changeAdminRights = (value: any) => {
    if (value.checked !== undefined){setAdminRights(value.checked)}
  }

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(lognFormSubmit)} style={{margin: 'auto'}} autoComplete="off">
        <h4 style={{textAlign: 'center'}}>Login with an existing user</h4>
        <Form.Field>
            <input placeholder='Username' {...register('username')} style={{width:240}}/>
          </Form.Field>
          <Form.Field>
            <input type='password' placeholder='Password' {...register('password')} />
        </Form.Field>
        <LoginBtn type='submit'>Login</LoginBtn>
        <BasicErrorMessage text={loginErr} visibility={showLoginErr} />
      </Form>
      <Divider vertical style={dividerStyle}>Or</Divider>
      <Form onSubmit={handleSubmit2(registrationFormSubmit)} style={{margin: 'auto'}} autoComplete="off">
        <h4 style={{textAlign: 'center'}}>Register a new user</h4>
        <Form.Field>
          <input placeholder='Choose Username' {...register2('username')} style={{width:240}} />
        </Form.Field>
        <Form.Field>
          <input type='email' placeholder='Email' {...register2('email')} style={{width:240}} />
        </Form.Field>
        <Form.Field>
          <input type='password' placeholder='Choose Password' {...register2('password1')} />
        </Form.Field>
        <Form.Field>
          <input type='password' placeholder='Repeat Password' {...register2('password2')} />
        </Form.Field>
        <Form.Field>
          <Checkbox 
            label='Request admin rights' 
            style={{marginLeft: '40px'}} 
            onChange={(e, value) => changeAdminRights(value)}
          />
          <BasicErrorMessage text={registrationErr} visibility={showRegistrationErr} />
        </Form.Field>
        <RegisterBtn type='submit'>Register</RegisterBtn>
      </Form>
    </MainContainer>
  )
}

export default LoginPage