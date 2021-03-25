import React from 'react'
// import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const logoutHandler = () => {
      dispatch(logout())
   }

   return (
      <Navbar bg='light' expand='lg'>
         <Container>
            <LinkContainer to='/'>
               <Navbar.Brand>Almacen Omega</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse
               id='basic-navbar-nav'
               className='justify-content-end'
            >
               {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username' className=''>
                     <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                     </LinkContainer>
                     <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                     </NavDropdown.Item>
                  </NavDropdown>
               ) : (
                  <LinkContainer to='/login'>
                     <Nav.Link>
                        <i className='fas fa-user'></i> Sign In
                     </Nav.Link>
                  </LinkContainer>
               )}
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default Header
