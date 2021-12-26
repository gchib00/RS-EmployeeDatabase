import React, { useContext, useEffect, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
import { UnauthorizedUserWarning } from './misc/UnauthorizedUserWarning'

//styling:
const ActionsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`
const ActionsDiv = styled.div`
  background: rgba(214, 214, 214, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: '500ms';
`
const ActionsBtn = styled.button`
  background-color: rgba(214, 214, 214, 0.6);
  border-radius: 0px 10px 10px 0px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 500ms;
  &:active {
    box-shadow: 0px 0px 0px 0px;
  }
`
const IconBtn = styled.a`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  display: flex;
  justify-content: center;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  &:hover{
    filter: brightness(2.75);
    transition: 100ms;
  }
`
////////
interface Props {
  setEmailModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setImageModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveOrder: React.Dispatch<React.SetStateAction<string | undefined>>;
  order: string; //ID of the order to which the slider is attached to
  activeOrder: string|undefined; //ID of the order that the user is trying to interact with
} 

export const ActionsSlider = ({setEmailModalStatus, setImageModalStatus, setActiveOrder, order, activeOrder}: Props) => {
  const [sliderStatus, setSliderStatus] = useState<boolean>(false)
  const [UUModalStatus, setUUModalStatus] = useState<boolean>(false)
  const {user} = useContext(UserContext)
  //display proper icon if slider is on or off:
  const getChevron = sliderStatus ? 'close' : 'chevron right'
  //set focused order to the state so that the emailing and uploading components know about the relevant order: 
  const focusedOrder = () => { 
    if (sliderStatus===true && activeOrder===undefined) {
      return setActiveOrder(order)
    } 
    if (sliderStatus===true && activeOrder!==order) {
      return setActiveOrder(order)
    }
  }
  const handleSliderClick = () => {
    if (!user || user.adminRights === false){ 
      return setUUModalStatus(true) //shows UU modal if user is either not logged in or doesn't have admin rights
    } else if (sliderStatus===true && activeOrder===order) { //when slider is open and user clicks 'X' icon to close it (instead of opening it by closing another slider)
      setActiveOrder(undefined)
      return setSliderStatus(false)
    }
    setSliderStatus(!sliderStatus)
    }
  useEffect(() => {
    focusedOrder()
  }, [sliderStatus])
  //control which orders are/aren't being focused on by the user by switching the slider on/off accordingly:
  useEffect(() => {
    if (sliderStatus===false && activeOrder===order) {
      setSliderStatus(true)
    }
    if (sliderStatus && activeOrder && activeOrder!==order) {
      setSliderStatus(false)
    }
  })

  return (
    <ActionsContainer>
      {sliderStatus ? 
        <ActionsDiv style={{width: 300, transition: '800ms'}}>
          <IconBtn style={{transition: '800ms'}} onClick={() => setEmailModalStatus(true)}>
            <Icon circular name='envelope' color='black' size='large'/>
          </IconBtn>
          <IconBtn style={{transition: '800ms'}} onClick={() => setImageModalStatus(true)}>
            <Icon circular name='photo' color='black' size='large'/>  
          </IconBtn>
        </ActionsDiv>
      : //Otherwise render 'off' version of ActionsDiv, so that transition properties can work conditionally
        <ActionsDiv style={{width: 0, transition: '800ms'}}>
          <IconBtn style={{opacity:0, transition:'300ms', visibility: 'hidden'}}>
            <Icon circular name='envelope' color='black' size='large'/>
          </IconBtn>
          <IconBtn style={{opacity:0, transition:'300ms', visibility: 'hidden'}}>
            <Icon circular name='photo' color='black' size='large'/>
          </IconBtn>
        </ActionsDiv>
      }
      <ActionsBtn onClick={handleSliderClick}>
        <Icon name={getChevron}/>
      </ActionsBtn>
      <UnauthorizedUserWarning UUModalStatus={UUModalStatus} setUUModalStatus={setUUModalStatus} />
    </ActionsContainer>
  )
}