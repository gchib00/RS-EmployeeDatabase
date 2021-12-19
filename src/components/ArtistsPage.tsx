import React, { useState } from 'react'
import styled from 'styled-components'
import { ArtistsOrderTable } from './ArtistsOrderTable'
import { TableStatus } from '../types'
import { ArtistTableButtons } from './ArtistTableButtons'
import { EmailToSupplierModal } from './EmailToSupplierModal'
import { UploadImageModal } from './UploadImageModal'

//styling:
const MainContainer = styled.main`
  width: 800px;
  min-height: 100px;
  margin: 50px auto 50px auto;
`
/////////

export const ArtistsPage = () => {
  const [activeTable, setActiveTable] = useState<TableStatus>('new') //new, rejected or sleeping tables
  const [activeOrder, setActiveOrder] = useState<string|undefined>() //order selected by user
  const [emailModalStatus, setEmailModalStatus] = useState<boolean>(false) //show or hide email modal
  const [imageModalStatus, setImageModalStatus] = useState<boolean>(false) //show or hide image modal

  console.log('focused order:', activeOrder)

  return (
    <MainContainer>
      <ArtistTableButtons activeTable={activeTable} setActiveTable={setActiveTable} />
      <ArtistsOrderTable 
        activeTable={activeTable} 
        setEmailModalStatus={setEmailModalStatus}
        setImageModalStatus={setImageModalStatus}
        setActiveOrder={setActiveOrder}
        activeOrder={activeOrder}
      />
      <UploadImageModal 
        imageModalStatus={imageModalStatus} 
        setImageModalStatus={setImageModalStatus} 
        activeOrder={activeOrder}
      />
      <EmailToSupplierModal 
        emailModalStatus={emailModalStatus} 
        setEmailModalStatus={setEmailModalStatus} 
        activeOrder={activeOrder}
      />
    </MainContainer>
  )
}