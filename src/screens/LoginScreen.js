import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   // const redirect = '/'

   useEffect(() => {
      if (userInfo) {
         history.push('/')
      }
   }, [history, userInfo])

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
   }

   return (
      <FormContainer>
         <h1>Sign In</h1>
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='id'>
               <Form.Label>Email o Celular</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter email or phone number'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
               <Form.Label>Contraseña</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Contraseña'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
               Sign In
            </Button>
         </Form>

         <Row className='py-3'>
            <Col>
               Nuevo usuario u olvidó su contraseña?{' '}
               <Link to={'/register'}>Registrarse o entrar sin contraseña</Link>
            </Col>
         </Row>
      </FormContainer>
   )
}

export default LoginScreen
