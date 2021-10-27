import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { StandardEmployeeType } from '../types'
import EmployeeCard from './EmployeeCard'
import UpperDash from './UpperDash'
import FilterPanel from './FilterPanel'
import { EmployeesContext } from '../context/EmployeesContext'
import PaginationTab from './PaginationTab'


//Styling:
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 40px;
`
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
`
const SecondDiv = styled.div`
  max-width: 380px;
`
///////

const EmployeeList = () => {
  const {employeesData} = useContext(EmployeesContext)
  const [filteredList, setFilteredList] = useState<StandardEmployeeType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cardsPerPage, setCardsPerPage] = useState<number>(5)

  useEffect(() => {
    setFilteredList(employeesData)
  }, [employeesData])

  //Pagination:
  const listSize = filteredList.length
  const indexOfLastItem = currentPage * cardsPerPage
  const indexOfFirstItem = indexOfLastItem - cardsPerPage
  const paginatedItems = filteredList.slice(indexOfFirstItem, indexOfLastItem)
  ////////////

  const paginate = (pageNum: number) => {setCurrentPage(pageNum)}

  if (!employeesData){return <h1>Loading...</h1>}
  return(
    <MainContainer>
      <FirstDiv>
        <UpperDash filteredList={filteredList} setFilteredList={setFilteredList} setCurrentPage={setCurrentPage}/>
        <section>
          {paginatedItems.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
        </section>
        <PaginationTab cardsPerPage={cardsPerPage} listSize={listSize} paginate={paginate}/>
      </FirstDiv>
      <SecondDiv>
        <FilterPanel filteredList={filteredList} setFilteredList={setFilteredList} />
      </SecondDiv>
    </MainContainer>
  )
}

export default EmployeeList