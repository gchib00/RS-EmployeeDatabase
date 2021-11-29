import React, { useContext, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
import { FAQItemType } from '../types'
import { DeleteFAQModal } from './DeleteFAQModal'
import { UnauthorizedUserWarning } from './misc/UnauthorizedUserWarning'

//styling:
const FAQCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #5a5a5a28;
  border-radius: 3px;
  background-color: white;
  margin: 10px 0px 10px 0px;
  padding: 14px;
  &:hover {
    transition: 400ms;
    border: 2px solid #5a5a5a6c;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.152);
  }
`
const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  cursor: pointer;
`
const Question = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  color: black;
`
const AnswerContainer = styled.div`
  margin-top: 10px;
  margin: 20px 0px 5px 0px;
`
const Answer = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
`
const DeleteFAQBtn = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  position: relative;
  left: 93%;
  height: 0;
  bottom: 12px;
  cursor: pointer;
  text-decoration: underline grey;
  color: grey;
`
/////////

interface Props {
  answer: string;
  question: string;
  setFAQItems: React.Dispatch<React.SetStateAction<FAQItemType[] | undefined>>;
}

export const FAQItem = ({answer, question, setFAQItems}: Props) => {
  const [visibility, setVisibility] = useState<'none'|'block'>('none')
  const [chevron, setChevron] = useState<'chevron down'|'chevron up'>('chevron down')
  const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false)
  const [UUModalStatus, setUUModalStatus] = useState<boolean>(false)
  const {user} = useContext(UserContext)

  const handleCardClick = () => {
    setChevron(visibility === 'none' ? 'chevron up' : 'chevron down')
    setVisibility(visibility === 'none' ? 'block' : 'none')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteItem = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation() //disabled the onClick event of parent component
    if (!user || user.adminRights === false){ 
      setUUModalStatus(true) //shows UU modal if user is either not logged in or doesn't have admin rights
    } else {
      setDeleteModalStatus(true) //shows DeleteFAQModal, which asks user to confirm the action
    }
  }

  return (
    <FAQCard onClick={handleCardClick}>
      <QuestionContainer>
        <Question>{question}</Question>
        <Icon name={chevron} />
      </QuestionContainer>
      <AnswerContainer style={{display: visibility}}>
        <Answer>{answer}</Answer>
        <DeleteFAQBtn onClick={(e)=> deleteItem(e)}>Delete FAQ</DeleteFAQBtn>
      </AnswerContainer>
      <DeleteFAQModal 
        deleteModalStatus={deleteModalStatus} 
        setDeleteModalStatus={setDeleteModalStatus} 
        setFAQItems={setFAQItems} 
        question={question} 
      />
      <UnauthorizedUserWarning UUModalStatus={UUModalStatus} setUUModalStatus={setUUModalStatus} />
    </FAQCard>
  )
}
