import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

//styling:
const ActionsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`
const ActionsDiv = styled.div`
  background: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: '500ms';
`
const ActionsBtn = styled.button`
  background-color: grey;
  display: flex;
  align-items: center;
`
////////

export const ActionsSlider = () => {
  const [sliderStatus, setSliderStatus] = useState<boolean>(false)

  return (
    <ActionsContainer>
      {sliderStatus ? 
        <ActionsDiv style={{width: 300, transition: '800ms'}}>
          <Button circular icon style={{background: 'none', transition: '800ms'}}>
            <Icon name='envelope' color='grey' size='big'/>
          </Button>
          <Button circular icon style={{background: 'none', transition: '800ms'}}>
            <Icon name='photo' color='grey' size='big'/>  
          </Button>
        </ActionsDiv>
      : //Other wise render 'off' version of ActionsDiv, so that transition properties can work conditionally
        <ActionsDiv style={{width: 0, transition: '800ms'}}>
          <Button circular icon style={{opacity:0, transition:'300ms', visibility: 'hidden'}}>
            <Icon name='envelope' color='grey' size='big'/>
          </Button>
          <Button circular icon style={{opacity:0, transition:'300ms', visibility: 'hidden'}}>
            <Icon name='photo' color='grey' size='big'/>
          </Button>
        </ActionsDiv>
      }
      <ActionsBtn onClick={() => setSliderStatus(!sliderStatus)}><Icon name='chevron right' /></ActionsBtn>
    </ActionsContainer>
  )
}