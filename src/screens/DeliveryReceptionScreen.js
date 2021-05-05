import React, { useEffect, useState, useReducer, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
   Row,
   Col,
   Form,
   Button,
   Spinner,
   Card,
   Image,
   Table,
} from 'react-bootstrap'
import Radium from 'radium'
import {
   deleteOrderReceipt,
   getOrderReceipt,
   uploadOrderReceipt,
} from '../actions/mediaActions'
import { deliverOrder } from '../actions/orderActions'
import Message from '../components/Message'
import { GET_ORDER_RECEIPT_RESET } from '../constants/mediaConstants'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'

const DeliveryReceptionScreen = ({ history, match }) => {
   const [errorMsg, setErrorMsg] = useState('')

   const dispatch = useDispatch()

   const hiddenFileInput = useRef(null)

   const { orderItems } = history.location.state

   const orderId = match.params.order
   const redirect = `${match.url.split(orderId)[0]}`

   const mediaUploadOrderReceiptState = useSelector(
      (state) => state.mediaUploadOrderReceipt
   )
   const { loading, error, photo } = mediaUploadOrderReceiptState

   const mediaGetOrderReceiptState = useSelector(
      (state) => state.mediaGetOrderReceipt
   )
   const {
      loading: getOrderReceiptLoading,
      error: getOrderReceiptError,
      orderReceipt,
   } = mediaGetOrderReceiptState

   const mediaDeleteOrderReceiptState = useSelector(
      (state) => state.mediaDeleteOrderReceipt
   )
   const {
      loading: deleteLoading,
      error: deleteError,
      photo: deleteReceiptPhoto,
   } = mediaDeleteOrderReceiptState

   const orderDeliverState = useSelector((state) => state.orderDeliver)
   const {
      loading: deliverLoading,
      error: deliverError,
      success: deliverSuccess,
   } = orderDeliverState

   useEffect(() => {
      dispatch({ type: GET_ORDER_RECEIPT_RESET })
   }, [])

   useEffect(() => {
      dispatch(getOrderReceipt(match.params.order))
   }, [photo, deleteReceiptPhoto])

   //    useEffect(() => {
   //       console.log(orderReceipt)
   //    }, [orderReceipt])

   useEffect(() => {
      setErrorMsg(error || getOrderReceiptError || deleteError || deliverError)
   }, [error, getOrderReceiptError, deleteError, deliverError])

   useEffect(() => {
      // console.log(deliverSuccess)
      if (deliverSuccess) {
         //    console.log('deliver success')
         history.push(redirect)
         dispatch({ type: ORDER_DELIVER_RESET })
      }
   }, [deliverSuccess])

   const handleClick = () => {
      hiddenFileInput.current.click()
   }

   const handleAddPhoto = async (e) => {
      // console.log(newImgEl.current)
      const selectedFile = e.target.files[0]
      //   console.log(selectedFile)
      if (!selectedFile) {
         setErrorMsg('No image was selected')
         return
      }

      // const reader = new FileReader()
      // reader.onload = (function(aImg) { return function(e) {
      //     aImg.style.backgroundImage = `url(${e.target.result})`
      // }; })(newImgEl.current);
      // reader.readAsDataURL(selectedFile)

      // fd.append('upload_preset', 'react_upload')
      // fd.append('tags', match.params.item)
      // fd.append('folder', match.params.item)

      dispatch(uploadOrderReceipt(selectedFile, match.params.order))
   }

   const handleFinalizar = () => {
      dispatch(deliverOrder(orderId))
   }

   return (
      <Col>
         {errorMsg && <Message variant='danger'>{errorMsg}</Message>}
         <Button onClick={handleFinalizar}>
            {deliverLoading ? (
               <Spinner animation='border' size='sm' />
            ) : (
               'Finalizar Entrega'
            )}
         </Button>
         <Table striped bordered hover responsive className='table-sm'>
            <thead>
               <tr>
                  <th>QTY</th>
                  <th>NOMBRE</th>
                  <th>MARCA</th>
                  <th>DESCRIPCION</th>
               </tr>
            </thead>
            <tbody>
               {orderItems.map((item) => (
                  <tr key={item.item}>
                     <td>{item.qty}</td>
                     <td>{item.name}</td>
                     <td>{item.brand}</td>
                     <td>{item.description}</td>
                  </tr>
               ))}
            </tbody>
         </Table>
         {orderReceipt && (
            <Image
               style={{ height: '300px', width: '300px' }}
               src={orderReceipt}
            />
         )}
         <Form>
            <Button onClick={handleClick}>
               {loading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Upload a picture'
               )}
            </Button>
            <input
               type='file'
               ref={hiddenFileInput}
               style={{ display: 'none' }}
               onChange={handleAddPhoto}
            />
         </Form>
      </Col>
   )
}

export default DeliveryReceptionScreen
