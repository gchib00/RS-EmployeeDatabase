import React, { useState } from 'react'
import { Dropdown, Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import TeamsDropdownForForm from './dropdowns/TeamsDropdownForForm'
import TypesDropdownForForm from './dropdowns/TypesDropdownForForm'

//styling:
const MainContainer = styled.div`
  width: 400px;
  height: 380px;
  margin: auto;
  margin-top: 10%;
`
const FirstDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -10px;
`
const SecondDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const ThirdDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const BtnDiv = styled.div`
  display: flex;
  width: 146px;
  justify-content: space-between;
  margin: 16px auto auto auto;
`
const ContactInfo = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`
const ShiftInfo = styled.div`
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
    border-radius: 8px;
  }
  &:active {
    opacity: 0.25;
    border-radius: 8px;
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
    border-radius: 6px;
  }
  &:active {
    opacity: 0.25;
    border-radius: 6px;
  }
`
/////////
const departmentOptions = [
  {key: 'Editors', text: 'Editors', value: 'editing'},
  {key: 'CS', text: 'CS', value: 'cs'},
  {key: 'Operations', text: 'Operations', value: 'operations'}
]

interface Props {
  formModalStatus: boolean;
  setFormModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployeeForm = ({formModalStatus, setFormModalStatus}: Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  
  return (
    <Modal
    style={{height: 470, width: 510}}
      onClose={() => setFormModalStatus(false)}
      onOpen={() => setFormModalStatus(true)}
      open={formModalStatus}
    > 
    <MainContainer>
      <Form>
        <FirstDiv>
          <Form.Field>
            <label>Alias Name:</label>
            <input placeholder='Alias Name...' />
          </Form.Field>
          <Form.Field>
            <label>Department:</label>
            <Dropdown
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e, {value}: any) => setSelectedDepartment(value)}
              options={departmentOptions}
              placeholder='Select Department'
              selection
              value={selectedDepartment}
            />
          </Form.Field>
        </FirstDiv>
        <SecondDiv>
          <Form.Field>
            <TeamsDropdownForForm selectedDepartment={selectedDepartment} />
          </Form.Field>
          <Form.Field>
            <TypesDropdownForForm selectedDepartment={selectedDepartment} />
          </Form.Field>
        </SecondDiv>
        <ThirdDiv>
          <ContactInfo>
            <Form.Field>
              <label>Email:</label>
              <input placeholder='Email...' />
            </Form.Field>
            <Form.Field>
              <label>Phone:</label>
              <input placeholder='Phone...' />
            </Form.Field>
          </ContactInfo>
          <ShiftInfo>
            <Form.Field>
              <label>Shift start:</label>
              <input type='time' defaultValue='10:00' style={{height: 37}} />
            </Form.Field>
            <Form.Field>
              <label>Shift duration (in hours):</label>
              <input type='number' min='0' max='24' defaultValue='8' />
            </Form.Field>
          </ShiftInfo>
        </ThirdDiv>
        <BtnDiv>
          <CancelBtn>Cancel</CancelBtn>
          <SubmitBtn type='submit'>Submit</SubmitBtn> 
        </BtnDiv>
      </Form>
    </MainContainer>
    </Modal>
  )
}

export default AddEmployeeForm
