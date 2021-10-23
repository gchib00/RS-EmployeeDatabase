import React, { useContext, useEffect, useState } from 'react'
import { Input, Radio } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { EmployeeBase } from '../types'

//Styling:
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0px 30px 0px;
`
const OnlineEmployees = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 165px;
`
////////

interface Props {
  filteredList: EmployeeBase[]
  setFilteredList: React.Dispatch<React.SetStateAction<EmployeeBase[]>>
}

const localTimeGE = new Date().getHours()+2 //app follows CET time, need to add +2 to adjust for GE time. needs to be changed to +3 after Oct. due to daylight savings time

const UpperDash = ({filteredList, setFilteredList}: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const [filterByShift, setFilterByShift] = useState(true)
  const {employeesData} = useContext(EmployeesContext)

  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  
  useEffect(() => {
    const filteredArr: EmployeeBase[] = employeesData.filter(employee => {
      const name = employee.name.toLocaleLowerCase()
      if(name.includes(searchValue.toLocaleLowerCase())){
        return employee
      }
    }) as EmployeeBase[];
    setFilteredList(filteredArr as EmployeeBase[])
  }, [searchValue])

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
    const filteredArr: EmployeeBase[] = filteredList.filter(employee => {
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


  // if (filterByShift) {
  //   const filteredArr: EmployeeBase[] = filteredList.filter(employee => {
  //     if(employee.shift && localTimeGE<12) {
  //       const start = Number(employee.shift.start.substring(0, 2));
  //       if(start<12){
  //         const shiftLength = 8
  //         const end = start+shiftLength
  //         if (localTimeGE >= start && localTimeGE < end){
  //           return employee
  //         }
  //       }
  //       const shiftLength = 8
  //       const end = start+shiftLength
  //       if (localTimeGE+24 >= start && localTimeGE+24 < end){
  //         return employee
  //       }
  //     }
  //     if(employee.shift && localTimeGE>=12) {
  //       const start = Number(employee.shift.start.substring(0, 2));
  //       const shiftLength = 8
  //       const end = start+shiftLength
  //       if (localTimeGE >= start && localTimeGE < end){
  //         return employee
  //       }
  //     }         
  //   }) 
  //   setFilteredList(filteredArr)
  //   // console.log('arr after filtering = ', filteredArr)
  // }








  return(
    <MainContainer>
      <Input icon='search' placeholder='Search...' value={searchValue} onChange={(e) => filterList(e)} />
      <OnlineEmployees>
        Currently Online 
        <Radio slider 
          style={{marginTop:2}} 
          checked={filterByShift} 
          onChange={() => setFilterByShift(!filterByShift)}/>
      </OnlineEmployees>
    </MainContainer>
  )
}

export default UpperDash