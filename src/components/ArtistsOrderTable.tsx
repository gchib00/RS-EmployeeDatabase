import React from 'react'
import styled from 'styled-components'
import { TableStatus } from '../types'
import { ActionsSlider } from './ActionsSlider'

const fakeData = [
  {
    orderID: '82311123342334_434269',
    medium: 'oil',
    signature: true,
    status: 'normal'
  },
  {
    orderID: '22311123342334_434261',
    medium: 'oil',
    signature: true,
    status: 'normal'
  },
  {
    orderID: '499921834711366_994243',
    medium: 'oil',
    signature: false,
    status: 'normal'
  },
  {
    orderID: '231412341234123_432111',
    medium: 'oil',
    signature: true,
    status: 'normal'
  },
  {
    orderID: '6541123342334_423445',
    medium: 'acrylic',
    signature: true,
    status: 'normal'
  },
  {
    orderID: '5342534211324_156621',
    medium: 'oil',
    signature: false,
    status: 'normal'
  },
  {
    orderID: '4123412342134_874723',
    medium: 'oil',
    signature: true,
    status: 'rejected'
  },
  {
    orderID: '7655672341111_432477',
    medium: 'acrylic',
    signature: true,
    status: 'sleeping'
  },
  {
    orderID: '223435581881_999414',
    medium: 'oil',
    signature: false,
    status: 'sleeping'
  },
  {
    orderID: '166543412431234_943134',
    medium: 'oil',
    signature: false,
    status: 'normal'
  },
]

//styling:
const MainTable = styled.table`
  height: 96%;
  width: 100%;
  border-radius: 3px;
  background-color: white;
  padding: 14px;
  border: 2px solid #5a5a5a6c;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.152);
`
const TableRow = styled.tr`
  display: grid;
  grid-template-columns: 5% 30% 15% 15% 35%;
  height: 50px;
`
const THCell = styled.th`
  font-weight: bold;
  color: green;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TDCell = styled.td`
  border: 1px dotted grey;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
`
/////////

interface Props {
  activeTable: TableStatus;
}

export const ArtistsOrderTable = ({activeTable}: Props) => {  
  const filteredArr = fakeData.filter(item => {
    switch(activeTable){
      case('new'): {
        if (item.status === 'normal') {return item}
        break
      }
      case('rejected'): {
        if (item.status === 'rejected') {return item}
        break
      }
      case('sleeping'): {
        if (item.status === 'sleeping'){return item}
        break
      }
    }
  })

  return (
    <MainTable>
      <thead>
        <TableRow>
          <THCell />
          <THCell>Order ID</THCell>
          <THCell>Medium</THCell>
          <THCell>Signature</THCell>
          <THCell />
        </TableRow>
      </thead>
      <tbody>
        {filteredArr.map((order, index) => {
          return( 
            <TableRow key={order.orderID}>
              <TDCell>{index+1}</TDCell>
              <TDCell>{order.orderID}</TDCell>
              <TDCell>{order.medium}</TDCell>
              <TDCell>{(order.signature) ? 'YES' : 'NO'}</TDCell>
              <TDCell><ActionsSlider /></TDCell>
            </TableRow>)
        })}
      </tbody>
    </MainTable>
  )
}