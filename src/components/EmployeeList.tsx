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
  margin: 40px auto 40px auto;
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
  const [upperDashList, setUpperDashList] = useState<StandardEmployeeType[]>([]) //filtered list from UpperDash
  const [panelList, setPanelList] = useState<StandardEmployeeType[]>([]) //filtered list from FilterPanel
  const [filteredArray, setFilteredArray] = useState<StandardEmployeeType[]>([]) //main array to funnel filtered arrays into
  const [currentPage, setCurrentPage] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cardsPerPage, setCardsPerPage] = useState<number>(5)

  const funnelArrays = () => {
    let arr = employeesData
    arr = arr.filter(employee => {
      return upperDashList.includes(employee)
    })
    arr = arr.filter(employee => {
      return panelList.includes(employee)
    })
    setFilteredArray(arr)
  }

  useEffect(() => {
    funnelArrays()
  }, [upperDashList ,panelList])

  useEffect(() => {
    setUpperDashList(employeesData)
    setPanelList(employeesData)
  }, [employeesData])

  //Pagination:
  const listSize = filteredArray.length
  const indexOfLastItem = currentPage * cardsPerPage
  const indexOfFirstItem = indexOfLastItem - cardsPerPage
  const paginatedItems = filteredArray.slice(indexOfFirstItem, indexOfLastItem)
  ////////////

  const paginate = (pageNum: number) => {setCurrentPage(pageNum)}

  if (!employeesData){return <h1>Loading...</h1>}
  return(
    <MainContainer>
      <FirstDiv>
        <UpperDash upperDashList={upperDashList} setUpperDashList={setUpperDashList} setCurrentPage={setCurrentPage}/>
        <section>
          {paginatedItems.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
        </section>
        <PaginationTab cardsPerPage={cardsPerPage} listSize={listSize} paginate={paginate}/>
      </FirstDiv>
      <SecondDiv>
        <FilterPanel setPanelList={setPanelList} />
      </SecondDiv>
    </MainContainer>
  )
}

export default EmployeeList