import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Row, Col, Nav } from 'react-bootstrap'

const Footer = () => {
   return (
      <footer style={{ borderTop: 'solid 1px lightgray' }}>
         <Container>
            <Row>
               <Col className='text-left py-3'>
                  <p>Ligas internas</p>
                  <LinkContainer to='/admin'>
                     <Nav.Link>Login Personal Omega</Nav.Link>
                  </LinkContainer>
               </Col>
               <Col className='text-center py-3'>
                  Copyright &copy; Almacen Omega
               </Col>
            </Row>
         </Container>
      </footer>
   )
}

export default Footer
