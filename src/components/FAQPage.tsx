import React, { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components'
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
  borderRadius: '4px',
}
/////////

export const FAQPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [addFormModalStatus, setAddFormModalStatus] = useState<boolean>(false)

  const array = [
    {question: 'What are the paper-based mediums?', answer: 'Paper-based mediums are: pencil, charcoal, etc ... '},
    {question: 'What\'s the email address of the technical department?', answer: 'tech.support@paintyourlife.com'},
    {question: 'Which suppliers can offer video service?', answer: 'Currently only GE and UKR offer video service'}
  ]

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
        <Button style={ButtonStyling} onClick={()=>alert('Clicked REMOVE')}>Remove Item</Button>
      </Dash>
      {/* <Divider /> */}
      {array.map(item =>  {
        return <FAQItem question={item.question} answer={item.answer} key={item.question} />
      })}
      <AddFAQForm addFormModalStatus={addFormModalStatus} setAddFormModalStatus={setAddFormModalStatus} />
    </MainContainer>
  )
}
