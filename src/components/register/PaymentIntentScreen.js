import React, { useEffect } from 'react'
import { Button, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createPaymentIntent } from '../../actions/stripeActions'
import Message from '../Message'

const PaymentIntentScreen = ({ setStage }) => {
   const dispatch = useDispatch()

   const { error, loading, intentData } = useSelector(
      (state) => state.stripeCreatePaymentIntent
   )

   useEffect(() => {
      if (intentData) {
         setStage(4)
      }
   }, [intentData])

   return (
      <>
         <h5>
            Para registrar tu método de pago debemos hacer un cobro único de
         </h5>
         <h1>$ 10.99 MXN pesos</h1>
         {error && <Message variant='danger'>{error}</Message>}
         <Row>
            <Button onClick={(_) => dispatch(createPaymentIntent())}>
               {loading ? <Spinner size='sm' animation='border' /> : 'Aceptar'}
            </Button>
         </Row>
      </>
   )
}

export default PaymentIntentScreen
