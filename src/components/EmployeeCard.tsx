import React from 'react'
import { Divider, Icon, SemanticICONS } from 'semantic-ui-react'
import styled from 'styled-components'
import { StandardEmployeeType } from '../types'

interface Props {
  employee: StandardEmployeeType;
  key: string;
}

//Styling:
const Container = styled.div`
  display: flex-end;
  justify-content: space-between;
  min-height: 120px;
  width: 600px;
  border: 2px solid #5a5a5a28;
  border-radius: 3px;
  background-color: white;
  margin: 10px 0px 10px 0px;
  padding: 14px;
  &:hover {
    transition: 700ms;
    border: 2px solid #5a5a5a6c;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.152);;
  }
`
const Name = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
`
const CardDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const DeptContainer = styled.div`
  display: flex;
  justify-content: center;
`
const DeptName = styled.p`
  font-size: 0.9rem;
  margin-left: 3px;
`
const Status = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  align-self: end;
`
////////

const EmployeeCard = ({employee}: Props) => {
  const determineIcon = (department: string): SemanticICONS => {
    switch(department){
      case('operations'): {return 'cogs'}
      case('cs'): {return 'talk'}
      case('editing'): {return 'images'}
      default: {return 'question'}
    }
  }
  const currentStatus = (status: string) => {
    if (status === 'active'){
      return <p style={{color:'green'}}>Active</p>
    }
    if (status === 'onVacation'){
      return <p style={{color:'red'}}>On Vacation</p>
    }
  }
  const workingHours = () => {
    if (employee.shift) {
      const shiftStart = employee.shift.start
      const calculateEndShift = (length: number): string => {
        const start = Number(shiftStart.substring(0,2))
        const end = (start>=16) ? (length-(24-start)) : (start+length)
        return end<10? `0${end}:00` : `${end}:00`
      }
      const shiftEnd = calculateEndShift(employee.shift.length)
      return <div><Icon name='wait' size='small'/> {shiftStart} - {shiftEnd}</div> 
    }
  }


  return(
    <Container key={employee.id}>
      <CardDiv>
        <Name>{employee.name}</Name>
        <DeptContainer>
          <Icon name={determineIcon(employee.department)}/>
          <DeptName>{employee.department.toLocaleUpperCase()}</DeptName>
        </DeptContainer>
      </CardDiv>
      <Divider style={{marginTop: 5}} />
      <CardDiv>
        <div>
          <div style={{marginBottom: 10}}><Icon name='mail' size='small'/> {employee.email}</div>
          <div>{workingHours()}</div>
        </div>
        <Status>{currentStatus(employee.status)}</Status>
      </CardDiv>
    </Container>
  )
}

export default EmployeeCard