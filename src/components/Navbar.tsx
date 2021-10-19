import React from 'react'
import styled from 'styled-components'

const Test = styled.p`
  color: red;
  height: 2rem;
` 

const Navbar = () => { 
  return(
    <nav>
      <Test>test</Test>
    </nav>
  )
}

export default Navbar