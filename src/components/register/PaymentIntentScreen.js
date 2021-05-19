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
         setStage(2)
      }
   }, [intentData])

   return (
      <>
         <h5>
            Para registrar tu método de pago debemos hacer un cobro único de
         </h5>
         <h1>$ 10.99 MXN</h1>
         {error && <Message variant='danger'>{error}</Message>}
         <Row>
            <Button onClick={(_) => dispatch(createPaymentIntent(1099))}>
               {loading ? <Spinner size='sm' animation='border' /> : 'Aceptar'}
            </Button>
            <Button onClick={(_) => setStage(0)} variant='secondary'>
               Atras
            </Button>
         </Row>
      </>
   )
}

export default PaymentIntentScreen
