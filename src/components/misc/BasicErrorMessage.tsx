import React from 'react'
import styled from 'styled-components'

//styling:
const Error = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
  color: red;
`
/////////
interface Props {
  text: string;
  visibility: boolean;
}

const BasicErrorMessage = ({text, visibility}: Props) => {
  if(!visibility) {return null}
  return (
    <Error>{text}</Error>
  )
}
export default BasicErrorMessage