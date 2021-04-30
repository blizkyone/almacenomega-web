import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Button } from 'react-bootstrap'
// import Message from '../components/Message'

const AdminScreen = ({ history, match }) => {
   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   useEffect(() => {
      if (!userInfo || !userInfo.isAdmin) {
         history.push('/login')
      }
   }, [userInfo])

   return (
      <>
         <Row className='m-3'>
            <LinkContainer to={`${match.url}/addItem`}>
               <Button
                  type='button'
                  className='btn btn-info btn-lg btn-block'
                  // onClick={() => history.push('/admin/addItem')}
               >
                  Agregar producto
               </Button>
            </LinkContainer>
         </Row>
         <Row className='m-3'>
            <LinkContainer to={`${match.url}/recepcion-de-rutas`}>
               <Button
                  type='button'
                  className='btn btn-info btn-lg btn-block'
                  // onClick={() => history.push('/admin/addItem')}
               >
                  Almacen: recepcionar rutas
               </Button>
            </LinkContainer>
         </Row>
         <Row className='m-3'>
            <LinkContainer to={`${match.url}/solicitudes-recoleccion`}>
               <Button
                  type='button'
                  className='btn btn-info btn-lg btn-block'
                  // onClick={() => history.push('/admin/myRoute')}
               >
                  Solicitudes de Recolección
               </Button>
            </LinkContainer>
         </Row>
         <Row className='m-3'>
            <LinkContainer to={`${match.url}/mi-ruta`}>
               <Button
                  type='button'
                  className='btn btn-info btn-lg btn-block'
                  // onClick={() => history.push('/admin/myRoute')}
               >
                  Mi Ruta
               </Button>
            </LinkContainer>
         </Row>
      </>
   )
}

export default AdminScreen
