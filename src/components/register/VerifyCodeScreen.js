import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Spinner, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import { verifyPhoneCode, requestPhoneCode } from '../../actions/userActions'
import {
   USER_PHONE_CODE_VALIDATION_RESET,
   USER_PHONE_CODE_RESET,
} from '../../constants/userConstants'

const VerifyCodeScreen = ({ setStage, phone }) => {
   const [code, setCode] = useState('')
   const [message, setMessage] = useState(null)

   const [resendCode, setResendCode] = useState()
   const [activeBtn, setActiveBtn] = useState()

   const [counter, setCounter] = useState(30)

   const dispatch = useDispatch()

   const { loading, error, status } = useSelector(
      (state) => state.userValidatePhoneCode
   )

   const {
      loading: requestCodeLoading,
      error: requestCodeError,
      success,
   } = useSelector((state) => state.userRequestPhoneCode)

   const { userInfo } = useSelector((state) => state.userLogin)

   // useEffect(() => {
   //    if (userInfo) {
   //       setStage(3)
   //    }
   // }, [userInfo])

   useEffect(() => {
      dispatch({ type: USER_PHONE_CODE_VALIDATION_RESET })
      return () => {
         dispatch({ type: USER_PHONE_CODE_RESET })
         dispatch({ type: USER_PHONE_CODE_VALIDATION_RESET })
      }
   }, [])

   useEffect(() => {
      counter > 0
         ? setTimeout(() => setCounter(counter - 1), 1000)
         : setResendCode(true)
   }, [counter])

   useEffect(() => {
      if (status === 'Create a new user') {
         setStage(2)
      }
   }, [status])

   useEffect(() => {
      if (error) setMessage(error)
      if (requestCodeError) setMessage(requestCodeError)
   }, [error, requestCodeError])

   const submitHandler = (e) => {
      e.preventDefault()
      if (code) {
         dispatch(verifyPhoneCode({ phone, code }))
      } else {
         setMessage('Escribe el código que enviamos a tu telefono')
      }
   }

   return (
      <>
         <h1>Bienvenido</h1>
         {message && <Message variant='danger'>{message}</Message>}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
               <Form.Label>{`Escribe el codigo que enviamos al ${phone}`}</Form.Label>
               <InputGroup>
                  <Form.Control
                     type='text'
                     placeholder='Código'
                     value={code}
                     onChange={(e) => setCode(e.target.value)}
                  ></Form.Control>
               </InputGroup>
            </Form.Group>

            {resendCode ? (
               <div>
                  <Button
                     disabled={success}
                     onClick={(_) => dispatch(requestPhoneCode(phone))}
                  >
                     {requestCodeLoading ? (
                        <Spinner animation='border' size='sm' />
                     ) : (
                        'Re-enviar SMS'
                     )}
                  </Button>
                  <p>
                     Si no recibes el código deberás repetir el paso anterior :(
                  </p>
               </div>
            ) : (
               <p>
                  Podemos re enviar el SMS al telefono{' '}
                  <strong>{`+52 ${phone}`}</strong> en{' '}
                  <strong>{counter}</strong>
               </p>
            )}

            <Button type='submit' variant='primary'>
               {loading ? <Spinner animation='border' size='sm' /> : 'Validar'}
            </Button>
         </Form>
      </>
   )
}

export default VerifyCodeScreen
