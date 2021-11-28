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
  const [FAQItems, setFAQItems] = useState<FAQItemType[]|undefined>() 
  const [filteredFAQItems, setFilteredFAQItems] = useState<FAQItemType[]|undefined>([]) 

  const fetchFAQData = async () => {
    const fetchedData = await axios.get('http://localhost:3005/faq/')
    setFAQItems(fetchedData.data)
  }

  const utilizeSearchFilter = () => {
    let arr = FAQItems
    //check if user has written anything in search field. if not, show all faq items
    if (searchValue.length>0 && arr){
      arr = arr.filter(faq => {
        const question = faq.question.toLocaleLowerCase()
        if (question.includes(searchValue.toLocaleLowerCase())){return faq}
      })
    } 
    setFilteredFAQItems(arr)
  }

  useEffect(() => { //use search filter fn when user types something
    utilizeSearchFilter()
  }, [FAQItems, searchValue])

  useEffect(() => { 
    if(!FAQItems || FAQItems.length == 0) {
      fetchFAQData()
    }
  }, [])

  if(!FAQItems || FAQItems.length == 0){return <Loader active />} //show loader animation while data is loading
  return (
    <MainContainer>
      <Dash>
        <Input 
          style={{width: '100%', marginRight: 10}}
          icon='search' 
          placeholder='Search...' 
          value={searchValue} onChange={(e, {value}) => setSearchValue(value)} 
        />
        <Button style={ButtonStyling} onClick={()=>setAddFormModalStatus(true)}>Add Item</Button>
      </Dash>
      {filteredFAQItems ? filteredFAQItems.map(item =>  {
        return <FAQItem question={item.question} answer={item.answer} setFAQItems={setFAQItems} key={item.question} />
      }) : null}
      <AddFAQForm addFormModalStatus={addFormModalStatus} setAddFormModalStatus={setAddFormModalStatus} setFAQItems={setFAQItems} />
    </MainContainer>
  )
}