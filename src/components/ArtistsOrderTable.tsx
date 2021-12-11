import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { TableStatus } from '../types'
import { ActionsSlider } from './ActionsSlider'

const fakeData = [
  {
    orderID: '82311123342334_434269',
    medium: 'Oil',
    signature: true,
    size: '20x24',
    status: 'normal'
  },
  {
    orderID: '22311123342334_434261',
    medium: 'Oil',
    signature: true,
    size: '20x30',
    status: 'normal'
  },
  {
    orderID: '499921834711366_994243',
    medium: 'Oil',
    signature: false,
    size: '8x16',
    status: 'normal'
  },
  {
    orderID: '231412341234123_432111',
    medium: 'Oil',
    signature: true,
    size: '32x48',
    status: 'normal'
  },
  {
    orderID: '6541123342334_423445',
    medium: 'Acrylic',
    signature: true,
    size: '20x24',
    status: 'rejected'
  },
  {
    orderID: '5342534211324_156621',
    medium: 'Oil',
    signature: false,
    size: '30x48',
    status: 'sleeping'
  },
  {
    orderID: '4123412342134_874723',
    medium: 'Oil',
    signature: true,
    size: '12x16',
    status: 'rejected'
  },
  {
    orderID: '7655672341111_432477',
    medium: 'Acrylic',
    signature: true,
    size: '8x10',
    status: 'sleeping'
  },
  {
    orderID: '223435581881_999414',
    medium: 'Oil',
    signature: false,
    size: '8x10',
    status: 'sleeping'
  },
  {
    orderID: '166543412431234_943134',
    medium: 'Oil',
    signature: false,
    size: '20x24',
    status: 'sleeping'
  },
]

//styling:
const MainTable = styled.table`
  min-height: 96%;
  width: 100%;
  border-radius: 3px;
  background-color: white;
  border: 2px solid #5a5a5a6c;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.152);
  padding: 14px;
`
const GreyDivider = styled.div`
  height: 10px;
  background-color: rgba(214, 214, 214, 0.6);
`
const TableRow = styled.tr`
  display: grid;
  grid-template-columns: 5% 35% 12% 12% 11% 25%;
  height: 60px;
`
const THCell = styled.th`
  background-color: rgba(34,36,38,.1);
  font-weight: bold;
  color: black;
  border: 3px solid rgba(214, 214, 214, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
`
const TDCell = styled.td`
  border: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
`
/////////

interface Props {
  activeTable: TableStatus;
  setEmailModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArtistsOrderTable = ({activeTable, setEmailModalStatus}: Props) => {  
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
          <THCell>Size</THCell>
          <THCell>Signature</THCell>
          <THCell>Actions</THCell>
        </TableRow>
        <GreyDivider />
      </thead>
      <tbody>
        {filteredArr.map((order, index) => {
          return( 
            <TableRow key={order.orderID}>
              <TDCell style={{backgroundColor: 'rgba(34,36,38,.1)'}}>{index+1}</TDCell>
              <TDCell>{order.orderID}</TDCell>
              <TDCell>{order.medium}</TDCell>
              <TDCell>{order.size}</TDCell>
              <TDCell>{(order.signature) ? <Icon name='checkmark'/> : null}</TDCell>
              <TDCell>
                <ActionsSlider setEmailModalStatus={setEmailModalStatus} />
              </TDCell>
            </TableRow>)
        })}
      </tbody>
    </MainTable>
  )
}