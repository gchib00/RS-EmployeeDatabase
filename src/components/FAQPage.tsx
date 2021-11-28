import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Input, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import { FAQItemType } from '../types'
import { AddFAQForm } from './AddFAQForm'
import { FAQItem } from './FAQItem'
  
//styling:
const MainContainer = styled.main`
  width: 1000px;
  margin: 40px auto auto auto;
`
const Dash = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
`
const ButtonStyling = {
  width: 144,
  textAlign: 'center',
  fontSize: '0.9rem',
  backgroundColor: '#ebebeb',
  border: '2px solid #5a5a5a28',
  borderRadius: '4px'
}
/////////

export const FAQPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [addFormModalStatus, setAddFormModalStatus] = useState<boolean>(false)
  const [FAQItems, setFAQItems] = useState<FAQItemType[]|undefined>([]) 

  const fetchFAQData = async () => {
    const fetchedData = await axios.get('http://localhost:3005/faq/')
    setFAQItems(fetchedData.data)
  }

  useEffect(() => {
    if(!FAQItems || FAQItems.length == 0) {
      fetchFAQData()
    }
  }, [])

  if(!FAQItems || FAQItems.length == 0){return <Loader active />}
  return (
    <MainContainer>
      <Dash>
        <Input 
          style={{width: '100%', marginRight: 10}}
          icon='search' 
          placeholder='Search...' 
          value={searchValue} onChange={(e) => console.log(e)} 
        />
        <Button style={ButtonStyling} onClick={()=>setAddFormModalStatus(true)}>Add Item</Button>
      </Dash>
      {FAQItems.map(item =>  {
        return <FAQItem question={item.question} answer={item.answer} setFAQItems={setFAQItems} key={item.question} />
      })}
      <AddFAQForm addFormModalStatus={addFormModalStatus} setAddFormModalStatus={setAddFormModalStatus} setFAQItems={setFAQItems} />
    </MainContainer>
  )
}