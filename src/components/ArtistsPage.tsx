import React, { useState } from 'react'
import styled from 'styled-components'
import { ArtistsOrderTable } from './ArtistsOrderTable'
import { TableStatus } from '../types'
import { ArtistTableButtons } from './ArtistTableButtons'

//styling:
const MainContainer = styled.main`
  background-color: grey;
  width: 800px;
  height: 600px;
  margin: 50px auto 50px auto;
`
/////////

export const ArtistsPage = () => {
  const [activeTable, setActiveTable] = useState<TableStatus>('new')

  return (
    <MainContainer>
      <ArtistTableButtons setActiveTable={setActiveTable} />
      <ArtistsOrderTable activeTable={activeTable} />
    </MainContainer>
  )
}