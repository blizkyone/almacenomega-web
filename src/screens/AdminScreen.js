import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Nav } from 'react-bootstrap'
// import Message from '../components/Message'

const AdminScreen = ({ history }) => {
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
            <button
               type='button'
               class='btn btn-info btn-lg btn-block'
               onClick={() => history.push('/admin/addItem')}
            >
               Agregar producto
            </button>
         </Row>
         <Row className='m-3'>
            <button
               type='button'
               class='btn btn-info btn-lg btn-block'
               onClick={() => history.push('/admin/myRoute')}
            >
               Mi Ruta
            </button>
         </Row>
      </>
   )
}

export default AdminScreen
