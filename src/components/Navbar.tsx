import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../static/images/logo.png'
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router'

//styling:
const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  height: 70px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
` 
const Logo = styled.img`
  margin-left: 24px;
  height: 46px;
  width: 84px;
  cursor: pointer;
`
const Nav = styled.nav`
  margin-right: 14px;
  height: 100%;
  /* max-width: 400px; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const NavItem = styled(Link)`
  color: #cc1b1b;
  border-bottom: 3px solid white;
  min-width: 90px;
  font-size: 1.2rem;
  padding: 22px 0px 22px 0px;
  text-align: center;
  &:hover {
    border: none;
    color: #cc1b1b;
    border-bottom: 3px solid #cc1b1b;
  }
`
//////////
const Navbar = () => { 
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate('/')
  }
  return(
    <Header>
      <Logo src={logo} onClick={handleLogoClick}/>
      <Nav>
        <NavItem to="/">Main</NavItem>
        <NavItem to="/artist">Artists</NavItem>
        <NavItem to="/faq">FAQ</NavItem>
        {!user ? <NavItem to="/login">Login</NavItem> : null}
      </Nav>
    </Header>
  )
}
export default Navbar