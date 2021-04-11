import React, { useEffect, useState } from 'react'
import { Table, Row, Pagination, Col, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import moment from 'moment'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getSubmittedPickupRequests } from '../actions/placesActions.js'
import { createMyRoute, getMyRoute } from '../actions/routesActions.js'
import PlaceMapIcon from '../components/PlaceMapIcon'

const PickupRequestScreen = ({ history, match }) => {
   const [markers, setMarkers] = useState([])
   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })
   // const [zoom, setZoom] = useState(10)
   //  const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const pickupRequestsState = useSelector((state) => state.pickupRequests)
   const { loading, error, pickupRequests, page, pages } = pickupRequestsState

   const myRouteState = useSelector((state) => state.myRoute)
   const { myRoute } = myRouteState

   useEffect(() => {
      dispatch(getMyRoute())
      dispatch(getSubmittedPickupRequests(1))
   }, [dispatch])

   useEffect(() => {
      if (myRoute.length > 0) history.push(`/admin/mi-ruta`)
   }, [myRoute, history])

   useEffect(() => {
      //Agregamos la cualidad de hover a los marcadores del mapa
      let newMarkers = pickupRequests?.map((x) => ({
         ...x,
         hover: false,
         selected: false,
      }))
      setMarkers(newMarkers)

      //Centramos el mapa en la primera solicitud de recolección pendiente
      if (pickupRequests && pickupRequests[0]) {
         setMapCenter({
            lat: pickupRequests[0].location.coordinates[1],
            lng: pickupRequests[0].location.coordinates[0],
         })
      }
   }, [pickupRequests])

   const fetchNextPage = (nextPage) => {
      if (nextPage !== page) dispatch(getSubmittedPickupRequests(nextPage))
   }

   const mouseEnterRow = ({ index, coords }) => {
      let newMarkers = markers.map((x, i) => {
         if (i === index) return { ...x, hover: true }
         return { ...x, hover: false }
      })
      setMarkers(newMarkers)
      setMapCenter({ lat: coords[1], lng: coords[0] })
   }

   const handleLocationSelected = (e, index) => {
      e.preventDefault()
      let newMarkers = markers.map((x, i) => {
         if (i === index) return { ...x, selected: !x.selected }
         return x
      })
      setMarkers(newMarkers)
   }

   const handleCreateRoute = () => {
      console.log('en handleCreateRoute')
      let route = markers.filter((x) => x.selected === true)
      if (route.length > 0) {
         dispatch(createMyRoute(route.map((x) => x._id)))
         dispatch(getMyRoute())
      } else {
         alert('Select a destination')
      }
   }

   return (
      <Row>
         <Col lg={6}>
            <Row className='align-items-center'>
               <Col>
                  <h3 className='my-3'>Solicitudes</h3>
               </Col>
               <Col>
                  <Button onClick={handleCreateRoute}>Crear Ruta</Button>
               </Col>
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
                           <th>ADD</th>
                           <th>DIRECCION</th>
                           <th>FECHA DE SOLICITUD</th>
                           <th>MANEJO</th>
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
                                 onClick={(e) => handleLocationSelected(e, i)}
                                 onMouseEnter={() =>
                                    mouseEnterRow({
                                       index: i,
                                       coords: x.location.coordinates,
                                    })
                                 }
                                 // onMouseLeave={() => mouseLeaveRow(i)}
                              >
                                 <td>
                                    {x.selected ? (
                                       <i
                                          className='fas fa-check-circle'
                                          style={{ color: 'green' }}
                                       ></i>
                                    ) : (
                                       ''
                                    )}
                                 </td>
                                 <td>{x.address}</td>
                                 <td>
                                    {moment
                                       .utc(x.updatedAt)
                                       .format('MM/DD/YYYY HH:mm')}
                                 </td>
                                 <td>{x.handling}</td>
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
            {pages > 1 && (
               <Pagination>
                  {[...Array(pages).keys()].map((x) => (
                     <Pagination.Item
                        key={x + 1}
                        onClick={() => fetchNextPage(x + 1)}
                     >
                        {x + 1}
                     </Pagination.Item>
                  ))}
               </Pagination>
            )}
         </Col>
      </Row>
   )
}

export default PickupRequestScreen
