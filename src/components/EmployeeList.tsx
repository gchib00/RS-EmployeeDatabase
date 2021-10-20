import React from 'react'
import { Divider, Icon, SemanticICONS } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeeBase } from '../types'

interface Props {
  employeeData: EmployeeBase[]
}

const EmployeeCard = styled.div`
  display: flex-end;
  justify-content: space-between;
  min-height: 120px;
  width: 600px;
  border: 1px solid #5a5a5a44;
  border-radius: 3px;
  background-color: white;
  margin: 10px;
  padding: 14px;
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

const EmployeeList = ({employeeData}: Props) => {
  const determineIcon = (department: string): SemanticICONS => {
    switch(department){
      case('operations'): {return 'cogs'}
      case('cs'): {return 'wechat'}
      case('editing'): {return 'images'}
      default: {return 'question'}
    }
  }
  return(
    <section>
      {employeeData.map(employee => {
        return(
          <EmployeeCard key={employee.id}>
            <CardDiv>
              <Name>{employee.name}</Name>
              <DeptContainer>
                <Icon name={determineIcon(employee.department)} />
                <DeptName>{employee.department.toLocaleUpperCase()}</DeptName>
              </DeptContainer>
            </CardDiv>
            <Divider style={{marginTop: 5}} />
            <CardDiv>
              <div>
                <p>other content</p>
                <p>more content</p>
              </div>
              <div>
                <h5 style={{marginTop:0}}>test</h5>
              </div>
            </CardDiv>
            <p style={{display: 'flex', justifyContent: 'flex-end'}}>hi</p>
          </EmployeeCard>
        )
      })}
    </section>
  )
}

export default EmployeeList