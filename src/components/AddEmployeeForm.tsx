import React, { useState } from 'react'
import { Dropdown, Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import TeamsDropdownForForm from './dropdowns/TeamsDropdownForForm'
import TypesDropdownForForm from './dropdowns/TypesDropdownForForm'
import { useForm } from "react-hook-form";

//styling:
const MainContainer = styled.div`
  width: 390px;
  max-height: 400px;
  margin: 40px auto 40px auto;
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
  margin: 30px auto auto auto;
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
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)
  const {register, handleSubmit} = useForm()
  
  const processFormData = (data: Record<string, unknown>) => {
    const fullData = {...data, team: selectedTeam, type: selectedType}
    console.log(fullData)
  }

  // console.log('selected team rn = ', selectedTeam)

  return (
    <Modal
    style={{maxHeight: 470, width: 510}}
      onClose={() => setFormModalStatus(false)}
      onOpen={() => setFormModalStatus(true)}
      open={formModalStatus}
    > 
    {/* <form onSubmit={handleSubmit(processFormData)}>
      <input {...register('test')} />
      <button type='submit'>submit</button>
    </form> */}
    <MainContainer>
      <Form onSubmit={handleSubmit(processFormData)}>
        <FirstDiv>
          <Form.Field>
            <label>Alias Name:</label>
            <input placeholder='Alias Name...' {...register('name')} />
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
            <TeamsDropdownForForm selectedDepartment={selectedDepartment} setSelectedTeam={setSelectedTeam} />
          </Form.Field>
          <Form.Field>
            <TypesDropdownForForm selectedDepartment={selectedDepartment} setSelectedType={setSelectedType} />
          </Form.Field>
        </SecondDiv>
        <ThirdDiv>
          <ContactInfo>
            <Form.Field>
              <label>Email:</label>
              <input placeholder='Email...' {...register('email')} />
            </Form.Field>
            <Form.Field>
              <label>Phone:</label>
              <input placeholder='Phone...' {...register('phone')} />
            </Form.Field>
          </ContactInfo>
          <ShiftInfo>
            <Form.Field>
              <label>Shift start:</label>
              <input type='time' defaultValue='10:00' style={{height: 37}} {...register('shiftStart')} />
            </Form.Field>
            <Form.Field>
              <label>Shift duration (in hours):</label>
              <input type='number' min='0' max='24' defaultValue='8' {...register('shiftDuration')} />
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