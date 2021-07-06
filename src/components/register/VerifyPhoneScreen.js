import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Spinner, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import { requestPhoneCode } from '../../actions/userActions'
import { USER_PHONE_CODE_RESET } from '../../constants/userConstants'

const UserDetailsScreen = ({ setStage, setGlobalPhone }) => {
   const [phone, setPhone] = useState('')
   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const { loading, error, success } = useSelector(
      (state) => state.userRequestPhoneCode
   )

   useEffect(() => {
      dispatch({ type: USER_PHONE_CODE_RESET })
      return () => dispatch({ type: USER_PHONE_CODE_RESET })
   }, [])

   useEffect(() => {
      if (success) {
         setStage(1)
      }
   }, [success])

   useEffect(() => {
      if (error) setMessage(error)
   }, [error])

   const submitHandler = (e) => {
      e.preventDefault()
      // console.log(phone.length)
      if (phone.length !== 10)
         return setMessage('Telefono debe tener 10 digitos')
      dispatch(requestPhoneCode(phone))
      setGlobalPhone(phone)
      // setStage(1)
   }

   return (
      <>
         <h1>Bienvenido</h1>
         {message && <Message variant='danger'>{message}</Message>}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
               <Form.Label>Celular</Form.Label>
               <InputGroup>
                  <InputGroup.Prepend>
                     <InputGroup.Text>+52</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                     type='text'
                     placeholder='Celular a 10 dígitos'
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
               </InputGroup>
               <Form.Text className='text-muted'>
                  Enviaremos un código de confirmación
               </Form.Text>
            </Form.Group>

            <Button type='submit' variant='primary'>
               {loading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Enviar Código'
               )}
            </Button>
         </Form>
      </>
   )
}

export default UserDetailsScreen
