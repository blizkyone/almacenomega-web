import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Image, Modal, Spinner } from 'react-bootstrap'
import { getPaymentMethods } from '../actions/stripeActions'
import { updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'

const PaymentMethodsScreen = ({ history }) => {
   // const [show, setShow] = useState()
   const [errMessage, setErrMessage] = useState('')
   const dispatch = useDispatch()

   const { loading, error, paymentMethods } = useSelector(
      (state) => state.stripeGetPaymentMethods
   )

   const { loading: deleteLoading, error: deleteError, success } = useSelector(
      (state) => state.stripeDeletePaymentMethod
   )

   const { loading: updateLoading, error: updateError } = useSelector(
      (state) => state.userUpdateProfile
   )

   const { userInfo } = useSelector((state) => state.userLogin)

   useEffect(() => {
      dispatch(getPaymentMethods())
   }, [dispatch, userInfo])

   useEffect(() => {
      if (error) setErrMessage(error)
      if (updateError) setErrMessage(updateError)
   }, [error, updateError])

   return loading ? (
      <Spinner size='sm' animation='border' />
   ) : errMessage ? (
      <Message variant='danger'>{errMessage}</Message>
   ) : (
      <>
         {/* <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
               <Modal.Title>
                  Para agregar un nuevo método de pago se hará un cobro de $
                  10.99 MXN pesos
               </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
               <Button onClick={(_) => history.push('/new-payment-method')}>
                  Aceptar
               </Button>
               <Button onClick={(_) => setShow(false)}>Cancelar</Button>
            </Modal.Footer>
         </Modal> */}
         <Table striped bordered hover responsive className='table-sm'>
            <thead>
               <tr>
                  <th>EMISOR</th>
                  <th>CADUCIDAD</th>
                  <th>ULTIMOS 4 DIGITOS</th>
                  <th>ESTADO</th>
               </tr>
            </thead>
            <tbody>
               {paymentMethods.map((method) => (
                  <tr key={method.id}>
                     <td>{method.card.brand}</td>
                     <td>{`${method.card.exp_month}/${method.card.exp_year}`}</td>
                     <td>{method.card.last4}</td>
                     <td>
                        {userInfo.paymentMethod === method.id ? (
                           <p>
                              <i className='fas fa-check-circle'></i>
                              {' Selected'}
                           </p>
                        ) : (
                           <Button
                              onClick={(_) =>
                                 dispatch(
                                    updateUserProfile({
                                       paymentMethod: method.id,
                                    })
                                 )
                              }
                           >
                              {updateLoading ? (
                                 <Spinner size='sm' animation='border' />
                              ) : (
                                 'Make default'
                              )}
                           </Button>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
         <Button onClick={(_) => history.push('/new-payment-method')}>
            Nuevo Método de Pago
         </Button>
      </>
   )
}

export default PaymentMethodsScreen
