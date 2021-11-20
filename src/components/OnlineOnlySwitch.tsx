import React, { useContext, useEffect, useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
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
  upperDashList: StandardEmployeeType[];
  setFilteredBySwitch: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

//app follows CET time (localhost - Italy), need to add +2 to adjust for GE time. needs to be changed to +3 after Oct. due to daylight savings time
const localTimeGE = 0
// new Date().getHours()+2 

const OnlineOnlySwitch = ({upperDashList, setFilteredBySwitch, setCurrentPage}: Props) => {
  const [filterByShift, setFilterByShift] = useState(false)
  const {employeesData} = useContext(EmployeesContext)

  useEffect(() => {
    if (filterByShift) {
      showOnlineEmployeesOnly()
    } else {
      showAllEmployees()
    }
    setCurrentPage(1)
  }, [filterByShift])


  const showAllEmployees = () => {
    setFilteredBySwitch(employeesData)
  }

  const showOnlineEmployeesOnly = async () =>{
    const filteredArr: StandardEmployeeType[] = upperDashList.filter(employee => {
      if(!employee.shift) {return null}
      const start = Number(employee.shift.start.substring(0, 2)) //convert 'hh:mm' format to hh num value
      const shiftLength = 8
      const end = start+shiftLength
      if(localTimeGE<12) { //formula that calculates if employee is supposed to be online (shift start + shift length)
        if(start<12){
          if (localTimeGE >= start && localTimeGE < end){
            return employee
          }
        }
        if (localTimeGE+24 >= start && localTimeGE+24 < end){
          return employee
        }
      }
      if(localTimeGE>=12) { //formula that calculates if employee is supposed to be online (shift hours + shift length)
        if (localTimeGE >= start && localTimeGE < end){
          return employee
        }
      }         
    }) 
    setFilteredBySwitch(filteredArr)
  }

  return(
    <>
    <OnlineEmployees>
        Currently Online 
        <Checkbox slider 
          style={{marginTop:2}} 
          checked={filterByShift} 
          onChange={() => setFilterByShift(!filterByShift)}/>
    </OnlineEmployees>
    </>
  )
}

export default OnlineOnlySwitch