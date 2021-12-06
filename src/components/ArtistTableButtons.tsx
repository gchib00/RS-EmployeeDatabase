import React from 'react'
import styled from 'styled-components'
import { TableStatus } from '../types'

//styling:
const TableButtons = styled.div`
  display: flex;
  justify-content: flex-start;
`
////////

interface Props {
  setActiveTable: React.Dispatch<React.SetStateAction<TableStatus>>;
}

export const ArtistTableButtons = ({setActiveTable}: Props) => {
  return (
    <TableButtons>
      <button onClick={() => setActiveTable('new')}>New</button>
      <button onClick={() => setActiveTable('rejected')}>Rejected</button>
      <button onClick={() => setActiveTable('sleeping')}>Sleeping</button>
    </TableButtons>
  )
}
