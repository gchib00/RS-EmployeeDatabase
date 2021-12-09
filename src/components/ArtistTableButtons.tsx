import React from 'react'
import styled from 'styled-components'
import { TableStatus } from '../types'

//styling:
const TableButtons = styled.div`
  display: flex;
  justify-content: flex-start;
`
const TableBtn = styled.button`
  cursor: pointer;
  width: 90px;
  border-radius: 3px 3px 0px 0px;
  border: 2px solid rgba(214, 214, 214, 0.6);
  border-bottom: none;
  background-color: rgba(214, 214, 214, 0.6);
  color: grey;
  font-size: 1rem;
  font-weight: bold;
  padding: 5px;
  &:hover {
    border-color: #5a5a5a6c;
    color: black;
  }
`
////////

interface Props {
  activeTable: TableStatus;
  setActiveTable: React.Dispatch<React.SetStateAction<TableStatus>>;
}

export const ArtistTableButtons = ({activeTable, setActiveTable}: Props) => {
  //returns specific styling to help user see which category is selected at that moment:
  const activeStyle = (category: TableStatus) => { 
    if (category === activeTable) {
      return {borderColor: '#5a5a5a6c', color: 'black'}
    }
  }

  return (
    <TableButtons>
      <TableBtn style={activeStyle('new')} onClick={() => setActiveTable('new')}>New</TableBtn>
      <TableBtn style={activeStyle('rejected')} onClick={() => setActiveTable('rejected')}>Rejected</TableBtn>
      <TableBtn style={activeStyle('sleeping')} onClick={() => setActiveTable('sleeping')}>Sleeping</TableBtn>
    </TableButtons>
  )
}