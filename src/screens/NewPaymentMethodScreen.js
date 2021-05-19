import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Form,
   Button,
   Row,
   Col,
   InputGroup,
   Spinner,
   Alert,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { createPaymentIntent } from '../actions/stripeActions'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { updateUserProfile } from '../actions/userActions'

const style = {
   base: {
      //   color: '#32325d',
      //   margin: 10,
   },
}

const PaymentMethodScreen = ({ history }) => {
   const stripe = useStripe()
   const elements = useElements()

   const dispatch = useDispatch()

   const { error, loading, intentData } = useSelector(
      (state) => state.stripeCreatePaymentIntent
   )
   const { userInfo } = useSelector((state) => state.userLogin)
   // console.log(userInfo)

   useEffect(() => {
      dispatch(createPaymentIntent(1099))
   }, [dispatch])

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!stripe || !elements) return

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
         console.log('[error]', error)
      } else {
         console.log('[PaymentMethod]', paymentMethod)

         const {
            error: confirmError,
            paymentIntent,
         } = await stripe.confirmCardPayment(intentData.clientSecret, {
            payment_method: paymentMethod.id,
            receipt_email: userInfo.email,
            setup_future_usage: 'off_session',
         })

         if (confirmError) {
            console.log(confirmError)
            console.log(confirmError.message)
            return
         }
         console.log(paymentIntent)
         if (paymentIntent.status === 'succeeded') {
            dispatch(
               updateUserProfile({
                  paymentMethod: paymentIntent.payment_method,
               })
            )
            history.push('/payment-methods')
         }
      }
   }

   return loading ? (
      <Spinner size='sm' animation='border' />
   ) : (
      <FormContainer>
         {error && <Alert variant='danger'>{error}</Alert>}
         {intentData && (
            <Form onSubmit={handleSubmit}>
               {/* //4000 0027 6000 3184 */}
               <CardElement />
               <Button type='submit' disabled={!stripe} className='my-3'>
                  Agregar tarjeta
               </Button>
            </Form>
         )}
      </FormContainer>
   )
}

export default PaymentMethodScreen
