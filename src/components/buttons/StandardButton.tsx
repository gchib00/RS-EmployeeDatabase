import React from 'react'
import styled from 'styled-components'

interface Props {
  width?: string;
  height?: string;
  color?: string;
  text?: string;
  textColor?: string;
  clickEvent?: () => void;
}

const StandardButton = ({width, height, color, text, textColor}: Props) => {
  const btnWidth = !width ? '100px' : width
  const btnHeight = !height ? '50px' : height
  const btnColor = !color ? 'grey' : color
  const btnText = !text ? 'sample text' : text
  const btnTextColor = !textColor ? 'white' : textColor

  const StyledButton = styled.button`
    transition: 400ms;
    width: ${btnWidth};
    height: ${btnHeight};
    background-color: 'none';
    color: ${btnColor};
    border-radius: 1px;
    border: 1px solid ${btnColor};
    font-family: 'Montserrat', sans-serif;
    &:hover {
      transition: 400ms;
      background-color: ${btnColor};
      color: ${btnTextColor};
    }
    &:active {
      opacity: 0.35
    }
  `
  return (
    <StyledButton>
      {btnText}
    </StyledButton>
  )
}

export default StandardButton
