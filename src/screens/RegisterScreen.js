import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register, validateUsername } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)
   const [buttonActive, setButtonActive] = useState(true)
   const [usernameErrorMessage, setUsernameErrorMessage] = useState()

   const dispatch = useDispatch()

   const userRegister = useSelector((state) => state.userRegister)
   const { loading, error, userInfo } = userRegister

   const usernameValidation = useSelector((state) => state.usernameValidation)
   const {
      loading: usernameValidationLoading,
      error: usernameValidationError,
      validUsername,
   } = usernameValidation

   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      switch (validUsername) {
         case 'Valid username':
            setButtonActive(false)
            setUsernameErrorMessage(null)
            return
         case 'Username already taken':
            setUsernameErrorMessage('Username already taken')
            setButtonActive(true)
            return
         default:
            return
      }
   }, [validUsername])

   useEffect(() => {
      if (userInfo) {
         history.push(redirect)
      }
   }, [history, userInfo, redirect])

   const handleChangeUsername = (e) => {
      setUsername(e.target.value)
      setButtonActive(true)
   }

   const callValidateUsername = () => {
      if (username && /^[a-zA-Z0-9_.-]*$/.test(username)) {
         dispatch(validateUsername(username))
      } else {
         setUsernameErrorMessage('Invalid username characters')
      }
   }

   const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
         setMessage('Passwords do not match')
      } else if (buttonActive) {
         setMessage('Please validate username')
      } else {
         dispatch(register(name, username, email, password))
      }
   }

   return (
      <FormContainer>
         <h1>Sign Up</h1>
         {message && <Message variant='danger'>{message}</Message>}
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
               <Form.Label>Name</Form.Label>
               <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='username'>
               <Form.Label>Username</Form.Label>
               <InputGroup>
                  <InputGroup.Prepend>
                     <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                     type='username'
                     placeholder='Enter username'
                     value={username}
                     onChange={handleChangeUsername}
                  ></Form.Control>
                  <InputGroup.Append>
                     {usernameValidationLoading ? (
                        <Button disabled>
                           <Spinner animation='border' />
                        </Button>
                     ) : buttonActive ? (
                        <Button variant='info' onClick={callValidateUsername}>
                           Validate
                        </Button>
                     ) : (
                        <Button disabled>Success</Button>
                     )}
                  </InputGroup.Append>
               </InputGroup>
               <Form.Text className='text-muted'>
                  Username must use '.-_' and alphanumeric characters only.
               </Form.Text>
            </Form.Group>
            {usernameErrorMessage && (
               <p style={{ color: 'red' }}>{usernameErrorMessage}</p>
            )}

            <Form.Group controlId='email'>
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
               Register
            </Button>
         </Form>

         <Row className='py-3'>
            <Col>
               Have an Account?{' '}
               <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Login
               </Link>
            </Col>
         </Row>
      </FormContainer>
   )
}

export default RegisterScreen
