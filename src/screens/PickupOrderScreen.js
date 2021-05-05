import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Image, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
   getOrderDetails,
   deleteItemFromOrder,
   deliverOrder,
} from '../actions/orderActions'
import Message from '../components/Message'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'
import Radium from 'radium'
import Barcode from 'react-barcode'

const styles = {
   back: {
      margin: '10px',
      ':hover': {
         cursor: 'pointer',
      },
   },
}

const PickupOrderScreen = ({ history, match }) => {
   const [products, setProducts] = useState([])
   const [show, setShow] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const [itemToDelete, setItemToDelete] = useState('')
   const [missingPicture, setMissingPicture] = useState(false)

   const dispatch = useDispatch()

   const orderDetailsState = useSelector((state) => state.orderDetails)
   const { loading, error, order } = orderDetailsState

   const orderDeleteItemState = useSelector((state) => state.orderDeleteItem)
   const { loading: deleteLoading, error: deleteError } = orderDeleteItemState

   const orderDeliverState = useSelector((state) => state.orderDeliver)
   const {
      loading: deliverLoading,
      error: deliverError,
      success: deliverSuccess,
   } = orderDeliverState

   const orderId = match.params.order
   const redirect = `${match.url.split(orderId)[0]}`
   const barcodeUrl = `${match.url.split('/')[0]}`

   useEffect(() => {
      dispatch(getOrderDetails(orderId))
   }, [orderId])

   useEffect(() => {
      setShow(false)
      if (order && order.orderItems) {
         setProducts(order.orderItems)
         // console.log(order.orderItems)
         // console.log(order)
         if (!order.validated) {
            setMissingPicture(true)
         } else {
            setMissingPicture(false)
         }
      }
   }, [order])

   useEffect(() => {
      setShow(false)
      setErrorMsg(error || deleteError || deliverError)
   }, [error, deleteError, deliverError])

   useEffect(() => {
      // console.log(deliverSuccess)
      if (deliverSuccess) {
         // console.log('deliver success')
         history.push(redirect)
         dispatch({ type: ORDER_DELIVER_RESET })
      }
   }, [deliverSuccess])

   const handleShowModal = (item) => {
      setItemToDelete(item)
      setShow(true)
   }

   const handleFinalizar = () => {
      if (missingPicture) return setErrorMsg('Al menos un item no tiene imagen')
      dispatch(deliverOrder(orderId))
   }

   return (
      <>
         <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
               <Modal.Title>
                  ¿Está seguro que desea borrar este item?
               </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
               <Button
                  onClick={(_) =>
                     dispatch(
                        deleteItemFromOrder({
                           item: itemToDelete,
                           order: orderId,
                        })
                     )
                  }
               >
                  {deleteLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'Aceptar'
                  )}
               </Button>
               <Button onClick={(_) => setShow(false)}>Cancelar</Button>
            </Modal.Footer>
         </Modal>
         {errorMsg && <Message variant='danger'>{errorMsg}</Message>}
         <Row className='justify-content-between'>
            <p onClick={(_) => history.push(redirect)} style={styles.back}>
               {'<<< Back'}
            </p>
            <Button onClick={(_) => history.push(`${match.url}/agregar-item`)}>
               Agregar Producto
            </Button>
         </Row>
         <Table striped bordered hover responsive className='table-sm my-3'>
            <thead>
               <tr>
                  <th>NOMBRE</th>
                  <th>QTY</th>
                  <th>MARCA</th>
                  <th>DESCRIPCION</th>
                  {/* <th>CONDICION</th> */}
                  <th>ELIMINAR</th>
                  <th>FOTO</th>
                  <th>BARCODE</th>
               </tr>
            </thead>
            <tbody>
               {products?.map((product) => {
                  // if (
                  //    product.item.images &&
                  //    product.item.images.length === 0 &&
                  //    !missingPicture
                  // )
                  //    setMissingPicture(true)
                  return (
                     <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.qty}</td>
                        <td>{product.brand}</td>
                        <td>{product.description}</td>
                        {/* <td>{product.condition}</td> */}
                        <td>
                           <Button
                              onClick={(_) => handleShowModal(product.item)}
                              variant='danger'
                              className='btn-sm'
                           >
                              <i
                                 className='fas fa-trash-alt'
                                 style={{ color: 'white' }}
                              ></i>
                           </Button>
                        </td>
                        <td>
                           <div>
                              {product.item.images &&
                              product.item.images.length > 0 ? (
                                 <Image
                                    style={{ height: '100px', width: '100px' }}
                                    src={`https://aoitems.s3.us-east-1.amazonaws.com/${product.item.images[0]}`}
                                    onClick={(_) =>
                                       history.push(
                                          `${match.url}/${product.item._id}/imagenes`
                                       )
                                    }
                                 />
                              ) : (
                                 <Button
                                    className='btn-sm'
                                    onClick={(_) =>
                                       history.push(
                                          `${match.url}/${product.item._id}/imagenes`
                                       )
                                    }
                                 >
                                    <i className='fas fa-camera-retro'></i>
                                 </Button>
                              )}
                           </div>
                        </td>
                        <td>
                           <Button
                              className='btn-sm'
                              onClick={(_) =>
                                 window.open(
                                    `${barcodeUrl}/barcode/${product.barcode}`,
                                    'Barcode'
                                 )
                              }
                           >
                              <i className='fas fa-barcode'></i>
                           </Button>
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </Table>
         {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
         {products.length > 0 && (
            <Button onClick={handleFinalizar}>
               {deliverLoading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Finalizar Recolección'
               )}
            </Button>
         )}
      </>
   )
}

export default Radium(PickupOrderScreen)
