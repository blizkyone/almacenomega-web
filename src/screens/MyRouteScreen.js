import React, { useEffect, useState } from 'react'
import {
   Table,
   Row,
   Alert,
   Spinner,
   Col,
   Card,
   Button,
   Modal,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyRoute, removeOrderFromRoute } from '../actions/routesActions.js'
import PlaceMapIcon from '../components/PlaceMapIcon'

const MyRouteScreen = ({ history }) => {
   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })
   const [markers, setMarkers] = useState([])
   const [errorMessage, setErrorMessage] = useState('')
   const [show, setShow] = useState(false)
   const [orderToRemove, setOrderToRemove] = useState()

   const dispatch = useDispatch()

   const myRouteState = useSelector((state) => state.myRoute)
   const { loading, error, myRoute } = myRouteState

   const routeRemoveOrderState = useSelector((state) => state.routeRemoveOrder)
   const {
      loading: removeLoading,
      error: removeError,
      success: removeSuccess,
   } = routeRemoveOrderState

   // useEffect(() => {
   //    dispatch(getMyRoute())
   // }, [])

   useEffect(() => {
      dispatch(getMyRoute())
   }, [removeSuccess, dispatch])

   useEffect(() => {
      if (error) setErrorMessage(error)
      if (removeError) setErrorMessage(removeError)
   }, [error, removeError])

   useEffect(() => {
      // console.log(myRoute)
      //Agregamos la cualidad de hover a los marcadores del mapa
      let newMarkers = myRoute.map((x) => ({
         ...x,
         hover: false,
         selected: false,
      }))
      setMarkers(newMarkers)

      //Centramos el mapa en la primera solicitud de recolección pendiente
      if (myRoute && myRoute[0]) {
         setMapCenter({
            lat: myRoute[0].location.coordinates[1],
            lng: myRoute[0].location.coordinates[0],
         })
      }
   }, [myRoute])

   const mouseEnterRow = ({ index, coords }) => {
      let newMarkers = markers.map((x, i) => {
         if (i === index) return { ...x, hover: true }
         return { ...x, hover: false }
      })
      setMarkers(newMarkers)
      setMapCenter({ lat: coords[1], lng: coords[0] })
   }

   const handleRemoveOrder = () => {
      dispatch(removeOrderFromRoute(orderToRemove))
      setShow(false)
   }

   const preHandleRemoveOrder = (order) => {
      setOrderToRemove(order)
      setShow(true)
   }

   return (
      <Row>
         <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
               <Modal.Title>
                  ¿Está seguro que desea borrar esta orden?
               </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
               <Button onClick={handleRemoveOrder}>Aceptar</Button>
               <Button onClick={(_) => setShow(false)}>Cancelar</Button>
            </Modal.Footer>
         </Modal>
         <Col lg={6}>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Row className='align-items-center'>
               <Col>
                  <h3 className='my-3'>Mi Ruta</h3>
               </Col>
               {/* <Col>
                  {deleteMyRouteLoading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     <Button onClick={(_) => setShow(true)}>Borrar Ruta</Button>
                  )}
               </Col> */}
            </Row>
            {loading ? (
               <Loader />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <div style={{ maxHeight: '80vh', overflow: 'scroll' }}>
                  <Table striped bordered hover responsive className='table-sm'>
                     <thead>
                        <tr>
                           <th>TIPO</th>
                           <th>CONTACTO</th>
                           <th>TELEFONO</th>
                           <th>DIRECCION</th>
                           <th>MANEJO</th>
                           <th>ESTADO</th>
                           <th>ACCION</th>
                           <th>BORRAR</th>
                        </tr>
                     </thead>

                     {loading ? (
                        <Loader />
                     ) : error ? (
                        <Message variant='danger'>{error}</Message>
                     ) : (
                        <tbody>
                           {markers?.map((x, i) => (
                              <tr
                                 key={i}
                                 className={`${
                                    x.status === 'Entregado'
                                       ? 'table-success'
                                       : ''
                                 }`}
                                 onClick={(e) =>
                                    mouseEnterRow({
                                       index: i,
                                       coords: x.location.coordinates,
                                    })
                                 }
                                 // onMouseEnter={() =>
                                 //    mouseEnterRow({
                                 //       index: i,
                                 //       coords: x.location.coordinates,
                                 //    })
                                 // }
                                 // onMouseLeave={() => mouseLeaveRow(i)}
                              >
                                 <td>{x.type}</td>
                                 <td>{x.person}</td>
                                 <td>{x.phone}</td>
                                 <td>
                                    {x.address}
                                    {/* <a
                                       target='_blank'
                                       rel='noreferrer'
                                       href={`https://www.google.com/maps/dir/?api=1&destination=${x.location.coordinates[1]},${x.location.coordinates[0]}`}
                                    >
                                       Google Maps
                                    </a> */}
                                 </td>
                                 <td>{x.handling}</td>
                                 <td>{x.status}</td>
                                 <td>
                                    <Button
                                       onClick={(_) => {
                                          if (x.type === 'pickup') {
                                             history.push(
                                                `/admin/mi-ruta/${x._id}`,
                                                {
                                                   userId: x.user,
                                                }
                                             )
                                          } else {
                                             history.push(
                                                `/admin/mi-ruta/${x._id}/entregar-orden`,
                                                {
                                                   orderItems: x.orderItems,
                                                }
                                             )
                                          }
                                       }}
                                    >
                                       {x.type === 'pickup'
                                          ? 'Recibir'
                                          : 'Entregar'}
                                    </Button>
                                 </td>
                                 <td>
                                    <Button
                                       className='btn-danger'
                                       onClick={(_) =>
                                          preHandleRemoveOrder(x._id)
                                       }
                                       disabled={x.status === 'Entregado'}
                                    >
                                       {removeLoading ? (
                                          <Spinner
                                             animation='border'
                                             size='sm'
                                          />
                                       ) : (
                                          <i className='fas fa-trash-alt'></i>
                                       )}
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     )}
                  </Table>
               </div>
            )}
         </Col>
         <Col lg={6}>
            <Card style={{ height: '80vh' }}>
               <GoogleMapReact
                  bootstrapURLKeys={{
                     key: process.env.REACT_APP_GOOGLE_API_KEY,
                  }}
                  center={mapCenter}
                  zoom={12}
                  options={{
                     //    zoomControl: false,
                     fullscreenControl: false,
                     gestureHandling: 'greedy',
                  }}
               >
                  {markers?.map((x, i) => (
                     <PlaceMapIcon
                        key={i}
                        lat={x.location.coordinates[1]}
                        lng={x.location.coordinates[0]}
                        hover={x.hover}
                        selected={x.selected}
                     />
                  ))}
               </GoogleMapReact>
            </Card>
         </Col>
      </Row>
   )
}

export default MyRouteScreen
