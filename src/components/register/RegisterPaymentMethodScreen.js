import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
   Form,
   Button,
   Row,
   Col,
   InputGroup,
   Spinner,
   Alert,
} from 'react-bootstrap'
import { updateUserProfile } from '../../actions/userActions'

const RegisterPaymentMethodScreen = () => {
   const [cardError, setCardError] = useState()
   const [loading, setLoading] = useState()
   const stripe = useStripe()
   const elements = useElements()

   const dispatch = useDispatch()

   const userRegister = useSelector((state) => state.userRegister)
   const { userInfo } = userRegister

   const { intentData } = useSelector(
      (state) => state.stripeCreatePaymentIntent
   )

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!stripe || !elements) return
      setCardError('')
      setLoading(true)

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement)

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card: cardElement,
      })

      if (error) {
         setLoading(false)
         setCardError(error.message)
         // console.log('[error]', error)
      } else {
         // console.log('[PaymentMethod]', paymentMethod)
         const {
            error: confirmError,
            paymentIntent,
         } = await stripe.confirmCardPayment(intentData.clientSecret, {
            payment_method: paymentMethod.id,
            receipt_email: userInfo.email,
            setup_future_usage: 'off_session',
         })

         if (confirmError) {
            setLoading(false)
            setCardError(confirmError.message)
            return
         }
         // console.log(paymentIntent)
         if (paymentIntent.status === 'succeeded') {
            dispatch(
               updateUserProfile({
                  paymentMethod: paymentIntent.payment_method,
               })
            )
            // paymentIntent.payment_method
         }
      }
   }

   return (
      <>
         {cardError && <Alert variant='danger'>{cardError}</Alert>}
         <Form onSubmit={handleSubmit}>
            <CardElement />
            <Button type='submit' disabled={!stripe} className='my-3'>
               {loading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Agregar tarjeta'
               )}
            </Button>
         </Form>
      </>
   )
}

export default RegisterPaymentMethodScreen
