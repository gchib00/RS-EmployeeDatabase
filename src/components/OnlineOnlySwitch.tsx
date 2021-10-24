import React, { useContext, useEffect } from 'react'
import { Radio } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { StandardEmployeeType } from '../types'

//Styling:
const OnlineEmployees = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 165px;
`
////

interface Props {
  filterByShift: boolean;
  setFilterByShift: React.Dispatch<React.SetStateAction<boolean>>;
  filteredList: StandardEmployeeType[];
  setFilteredList: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>
}

const localTimeGE = new Date().getHours()+2 //app follows CET time, need to add +2 to adjust for GE time. needs to be changed to +3 after Oct. due to daylight savings time

const OnlineOnlySwitch = ({filterByShift, setFilterByShift, filteredList, setFilteredList}: Props) => {
  const {employeesData} = useContext(EmployeesContext)


  useEffect(() => {
    if (filterByShift) {
      showOnlineEmployeesOnly()
    } else {
      showAllEmployees()
    }
  }, [filterByShift])

  const showAllEmployees = () => {
    setFilteredList(employeesData)
  }

  const showOnlineEmployeesOnly = () =>{
    const filteredArr: StandardEmployeeType[] = filteredList.filter(employee => {
      if(employee.shift && localTimeGE<12) {
        const start = Number(employee.shift.start.substring(0, 2));
        if(start<12){
          const shiftLength = 8
          const end = start+shiftLength
          if (localTimeGE >= start && localTimeGE < end){
            return employee
          }
        }
        const shiftLength = 8
        const end = start+shiftLength
        if (localTimeGE+24 >= start && localTimeGE+24 < end){
          return employee
        }
      }
      if(employee.shift && localTimeGE>=12) {
        const start = Number(employee.shift.start.substring(0, 2));
        const shiftLength = 8
        const end = start+shiftLength
        if (localTimeGE >= start && localTimeGE < end){
          return employee
        }
      }         
    }) 
    setFilteredList(filteredArr)
    console.log('arr after filtering = ', filteredArr)
  }

  return(
    <OnlineEmployees>
        Currently Online 
        <Radio slider 
          style={{marginTop:2}} 
          checked={filterByShift} 
          onChange={() => setFilterByShift(!filterByShift)}/>
    </OnlineEmployees>
  )
}

export default OnlineOnlySwitch