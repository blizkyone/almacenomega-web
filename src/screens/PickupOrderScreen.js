import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Image, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, deleteItemFromOrder } from '../actions/orderActions'
import Message from '../components/Message'

const PickupOrderScreen = ({ history, match }) => {
   const [products, setProducts] = useState([])
   const [show, setShow] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const [itemToDelete, setItemToDelete] = useState('')

   const dispatch = useDispatch()

   const orderDetailsState = useSelector((state) => state.orderDetails)
   const { loading, error, order } = orderDetailsState

   const orderDeleteItemState = useSelector((state) => state.orderDeleteItem)
   const { loading: deleteLoading, error: deleteError } = orderDeleteItemState

   const orderId = match.params.order
   const redirect = `${match.url.split(orderId)[0]}`

   useEffect(() => {
      dispatch(getOrderDetails(orderId))
   }, [orderId])

   useEffect(() => {
      setShow(false)
      if (order && order.orderItems) {
         setProducts(order.orderItems)
      }
   }, [order])

   useEffect(() => {
      setShow(false)
      setErrorMsg(error || deleteError)
   }, [error, deleteError])

   const handleShowModal = (item) => {
      setItemToDelete(item)
      setShow(true)
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
            <Button onClick={(_) => history.push(`${match.url}/agregar-item`)}>
               Agregar Producto
            </Button>
         </Row>
         <Table striped bordered hover responsive className='table-sm my-3'>
            <thead>
               <tr>
                  <th>NAME</th>
                  <th>MARCA</th>
                  <th>DESCRIPCION</th>
                  <th>CONDICION</th>
                  <th>ELIMINAR</th>
                  <th>FOTO</th>
               </tr>
            </thead>
            <tbody>
               {products?.map((product) => (
                  <tr key={product._id}>
                     <td>{product.name}</td>
                     <td>{product.brand}</td>
                     <td>{product.description}</td>
                     <td>{product.condition}</td>
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
                        <Button
                           className='btn-sm'
                           onClick={(_) =>
                              history.push(
                                 `${match.url}/${product.item}/imagenes`
                              )
                           }
                        >
                           <i class='fas fa-camera-retro'></i>
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
         {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
         {products.length > 0 && (
            <Button onClick={(_) => history.push(redirect)}>
               Finalizar Recolección
            </Button>
         )}
      </>
   )
}

export default PickupOrderScreen
