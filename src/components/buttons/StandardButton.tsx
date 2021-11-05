import React from 'react'
import styled from 'styled-components'

interface Props {
  width?: string;
  height?: string;
  color?: string;
  text?: string;
  textColor?: string;
  hoverColor?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  clickEvent?: () => void;
}

const StandardButton = ({width, height, color, text, textColor, hoverColor, type, clickEvent}: Props) => {
  const btnWidth = !width ? '100px' : width
  const btnHeight = !height ? '50px' : height
  const btnColor = !color ? 'grey' : color
  const btnText = !text ? 'sample text' : text
  const btnTextColor = !textColor ? 'white' : textColor
  const btnHoverColor = !hoverColor ? 'white' : hoverColor
  const btnType = !type ? 'button' : type

  const StyledButton = styled.button`
    transition: 650ms;
    width: ${btnWidth};
    height: ${btnHeight};
    background-color: ${btnColor};
    color: ${btnTextColor};
    border-radius: 2px;
    border: 1px solid ${btnColor};
    font-family: 'Montserrat', sans-serif;
    &:hover {
      transition: 650ms;
      background-color: ${btnHoverColor};
      color: ${btnColor};
      border-radius: 8px;
    }
    &:active {
      opacity: 0.25;
      border-radius: 8px;
    }
  ` 
  return (
    <StyledButton type={btnType} onClick={clickEvent}>
      {btnText}
    </StyledButton>
  )
}

export default StandardButton
