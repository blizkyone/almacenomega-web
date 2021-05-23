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
   const [cardError, setCardError] = useState()
   const [loading, setLoading] = useState()

   const stripe = useStripe()
   const elements = useElements()

   const dispatch = useDispatch()

   const { error, loading: intentLoading, intentData } = useSelector(
      (state) => state.stripeCreatePaymentIntent
   )
   const { userInfo } = useSelector((state) => state.userLogin)

   useEffect(() => {
      dispatch(createPaymentIntent(1099))
   }, [dispatch])

   useEffect(() => {
      console.log(intentData)
   }, [intentData])

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
      const { error, setupIntent } = await stripe.confirmCardSetup(
         intentData.clientSecret,
         {
            payment_method: {
               card: cardElement,
               billing_details: {
                  name: userInfo.name,
               },
            },
         }
      )

      if (error) {
         setLoading(false)
         setCardError(error.message)
         // console.log('[error]', error)
      } else {
         // console.log('[PaymentMethod]', paymentMethod)
         // console.log(setupIntent)
         dispatch(
            updateUserProfile({
               paymentMethod: setupIntent.payment_method,
            })
         )
         history.push('/payment-methods')
      }
   }

   return intentLoading ? (
      <Spinner size='sm' animation='border' />
   ) : (
      <FormContainer>
         {error && <Alert variant='danger'>{error}</Alert>}
         {intentData && (
            <Form onSubmit={handleSubmit}>
               {/* //4000 0027 6000 3184 */}
               <CardElement
                  options={{
                     style: {
                        base: {
                           fontSize: '18px',
                        },
                     },
                  }}
               />
               <Button type='submit' disabled={!stripe} className='my-3'>
                  {loading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'Agregar tarjeta'
                  )}
               </Button>
            </Form>
         )}
      </FormContainer>
   )
}

export default PaymentMethodScreen
