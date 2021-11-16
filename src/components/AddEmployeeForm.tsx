import React, { useContext, useState } from 'react'
import { Dropdown, Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import TeamsDropdownForForm from './dropdowns/TeamsDropdownForForm'
import TypesDropdownForForm from './dropdowns/TypesDropdownForForm'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { EmployeesContext } from '../context/EmployeesContext'
import BasicErrorMessage from './misc/BasicErrorMessage'

//styling:
const MainContainer = styled.div`
  width: 390px;
  max-height: 420px;
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
const BtnContainer = styled.div`
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
const ShiftInfo = styled.div``
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
  const [selectedTeam, setSelectedTeam] = useState<string|undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string|undefined>(undefined)
  const [showReqError, setShowReqError] = useState(false)
  const {setEmployeesData} = useContext(EmployeesContext)
  const {register, handleSubmit, reset} = useForm()
  
  const processFormData = async (data: Record<string, unknown>) => {
    //adding team & type separately from form hooks because it's not compatable with semantic ui:
    const requestObj = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: selectedDepartment,
      subDepartment: selectedTeam,
      team: selectedTeam,
      type: selectedType,
      status: 'active',
      shift: {
        start: data.shiftStart,
        length: data.shiftDuration
      }
    }
    try {
      const response = await axios.post('http://localhost:3005/employees/add', requestObj)
      setEmployeesData(response.data)
      setFormModalStatus(false)
      setShowReqError(false)
      reset()
    } catch {
      setShowReqError(true)
    }
  }

  return (
    <Modal
    style={{maxHeight: 540, width: 510}}
      onClose={() => {setFormModalStatus(false); reset()}}
      onOpen={() => setFormModalStatus(true)}
      open={formModalStatus}
    > 
    <MainContainer>
      <Form autoComplete="off" onSubmit={handleSubmit(processFormData)}>
        <FirstDiv>
          <Form.Field required>
            <label>Alias Name:</label>
            <input placeholder='Alias Name...' {...register('name',{required: true})} />
          </Form.Field>
          <Form.Field required>
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
            <Form.Field required>
              <label>Email:</label>
              <input placeholder='Email...' {...register('email',{required: true})} />
            </Form.Field>
            <Form.Field>
              <label>Phone:</label>
              <input placeholder='Phone...' {...register('phone')} />
            </Form.Field>
          </ContactInfo>
          <ShiftInfo>
            <Form.Field required>
              <label>Shift start:</label>
              <input type='time' defaultValue='10:00' style={{height: 37}} {...register('shiftStart',{required: true})} />
            </Form.Field>
            <Form.Field required>
              <label>Shift duration (in hours):</label>
              <input type='number' min='0' max='24' defaultValue='8' {...register('shiftDuration',{required: true})} />
            </Form.Field>
          </ShiftInfo>
        </ThirdDiv>
        <BasicErrorMessage text='All the required(*) fields must be filled' visibility={showReqError} />
        <BtnContainer>
          <CancelBtn type='button' onClick={() => {setFormModalStatus(false); reset()}}>Cancel</CancelBtn>
          <SubmitBtn type='submit'>Submit</SubmitBtn> 
        </BtnContainer>
      </Form>
    </MainContainer>
    </Modal>
  )
}

export default AddEmployeeForm