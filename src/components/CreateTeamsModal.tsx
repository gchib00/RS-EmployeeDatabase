import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
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
////////

interface Props {
  formModalStatus: boolean;
  setFormModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  department: string;
}

export const CreateTeamsModal = ({formModalStatus, setFormModalStatus, department}: Props) => {
  const {register, handleSubmit, reset} = useForm()
  const {employeesData, setEmployeesData} = useContext(EmployeesContext)
  const [errorMsg, setErrorMsg] = useState<string>('')
  
  const processFormData = async (data: any) => {
    const teamLeader = employeesData.find(employee => employee.name === data.teamLeader)
    if(!teamLeader){return setErrorMsg(`Alias was not found. Please use an existing alias.`)}
    const newObj = {
      team: data.newTeamName,
      leader: data.teamLeader,
      department: department
    }
    try {
      const response = await axios.patch(`http://localhost:3005/employees/createTeam/${teamLeader.id}`, newObj)
      setEmployeesData(response.data)
      //reset form and close it:
      reset(); setErrorMsg(''); setFormModalStatus(false)
    } catch (err: any) {
      setErrorMsg(err.response.data)
    }
  }

  return (
    <Modal
    style={{maxHeight: 400, width: 480}}
      onClose={() => {setFormModalStatus(false); reset(); setErrorMsg('')}}
      onOpen={() => setFormModalStatus(true)}
      open={formModalStatus}
    > 
    <MainContainer>
      <Form autoComplete="off" onSubmit={handleSubmit(processFormData)}>
        <Form.Field>
          <label style={{marginBottom: 5}}>Name of the new {department === 'cs' ? 'CS' : 'editor' } team:</label>
          <input {...register('newTeamName')} />
        </Form.Field>
        <Form.Field>
          <label>Team Leader (must be an existing member):</label>
          <input {...register('teamLeader')} />
        </Form.Field>
        <BasicErrorMessage text={errorMsg} visibility={true} />
        <BtnContainer>
          <CancelBtn type='button' onClick={() => {
            setFormModalStatus(false)
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
