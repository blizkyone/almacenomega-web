import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { useDispatch, useSelector } from 'react-redux'
import {
   queryPlaces,
   getAddress,
   requestPickup,
} from '../actions/placesActions'
import {
   Card,
   Form,
   InputGroup,
   ListGroup,
   Button,
   Spinner,
   Row,
   Col,
   Modal,
} from 'react-bootstrap'
import Message from '../components/Message.js'

const searchBarStyle = {
   width: '380px',
   position: 'absolute',
   top: '10px',
   left: '10px',
   backgroundColor: 'white',
}

const centerPinStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -60%)',
}

const selectLocationButtonStyle = {
   position: 'absolute',
   right: '10px',
   top: '10px',
}

const RequestPickupScreen = ({ history }) => {
   const [query, setQuery] = useState('')
   const [mapCenter, setMapCenter] = useState({
      lat: 20.9670154,
      lng: -89.6242833,
   })
   const [zoom, setZoom] = useState(12)
   const [locationAddress, setLocationAddress] = useState('')
   const [locationCoordinates, setLocationCoordinates] = useState()
   const [pickupRequirement, setPickupRequirement] = useState('Ligero')
   const [comments, setComments] = useState('')
   const [person, setPerson] = useState('')
   const [phone, setPhone] = useState('')

   const [validated, setValidated] = useState(false)
   const [message, setMessage] = useState('')
   const [mainMessage, setMainMessage] = useState('')
   const [show, setShow] = useState(false)

   const dispatch = useDispatch()

   const placesAutocomplete = useSelector((state) => state.placeAutocomplete)
   const {
      loading: placesLoading,
      error: placesError,
      places,
   } = placesAutocomplete

   const placeAddress = useSelector((state) => state.placeAddress)
   const { loading, error: placeAddressError, address } = placeAddress

   const newPickupRequest = useSelector((state) => state.pickupRequest)
   const {
      loading: newPickupRequestLoading,
      error: newPickupRequestError,
      request: newRequest,
   } = newPickupRequest

   useEffect(() => {
      if (newRequest) setShow(true)
      //   history.push('/profile')
   }, [newRequest])

   useEffect(() => {
      setLocationAddress(address)
   }, [address])

   useEffect(() => {
      if (placeAddressError) setMainMessage(placeAddressError)
      if (placesError) setMainMessage(placesError)
      if (newPickupRequestError) setMainMessage(newPickupRequestError)
   }, [placeAddressError, placesError, newPickupRequestError])

   const handleSearch = (e) => {
      e.preventDefault()
      dispatch(queryPlaces(query))
   }

   const handleSelectPickupLocation = () => {
      const { lat, lng } = mapCenter
      dispatch(getAddress(lat, lng))
      setLocationCoordinates(mapCenter)
   }

   const handleRequestPickup = (e) => {
      e.preventDefault()
      e.currentTarget.checkValidity()
      if (address && locationCoordinates && pickupRequirement) {
         //  alert('Request made')
         dispatch(
            requestPickup({
               address: locationAddress,
               lat: locationCoordinates.lat,
               lng: locationCoordinates.lng,
               comments,
               handling: pickupRequirement,
            })
         )
      } else if (!locationCoordinates) {
         setMessage('Debes elegir coordenadas de una ubicaci??n en el mapa')
      } else {
         setValidated(true)
         setMessage('Revisa la informaci??n requerida')
      }
   }

   const handleSelectPlace = (coordinates) => {
      setMapCenter(coordinates)
      setZoom(16)
   }

   const handleMapChange = ({ center, zoom }) => {
      setLocationCoordinates(null)
      setMapCenter(center)
      setZoom(zoom)
   }

   return (
      <Col>
         <Row className='my-4'>
            <h3 className='mx-auto'>Solicitud de recolecci??n</h3>
         </Row>
         {mainMessage && (
            <Row>
               <Message variant='danger'>{mainMessage}</Message>
            </Row>
         )}
         <Row>
            <Col lg={4}>
               <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleRequestPickup}
               >
                  <Form.Group controlId='address'>
                     <Form.Label>Direcci??n</Form.Label>
                     <Form.Control
                        required
                        as='textarea'
                        type='address'
                        placeholder='Seleccione ubicaci??n en el mapa'
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                     ></Form.Control>
                     <Form.Text>
                        Seleccione una ubicaci??n y edite la direcci??n
                     </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='coordinates'>
                     <Form.Label>Coordenadas</Form.Label>
                     <Form.Control
                        required
                        readOnly
                        type='address'
                        placeholder='Seleccione ubicaci??n en el mapa'
                        value={
                           locationCoordinates
                              ? `lat: ${locationCoordinates.lat}, lng: ${locationCoordinates.lng}`
                              : ''
                        }
                     ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='coordinates'>
                     <Form.Label>Manejo del producto</Form.Label>
                     <Form.Control
                        as='select'
                        value={pickupRequirement}
                        onChange={(e) => setPickupRequirement(e.target.value)}
                        required
                     >
                        <option>Ligero</option>
                        <option>Pesado</option>
                     </Form.Control>
                     <Form.Text>
                        {'Ligero: 1 persona puede cargarlo. Peso < 20kg'}
                     </Form.Text>
                     <Form.Text>
                        {
                           'Pesado: Requiere 2 o m??s personas. Peso > 20kg. Dimensiones > 1m'
                        }
                     </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='address'>
                     <Form.Label>Comentarios</Form.Label>
                     <Form.Control
                        as='textarea'
                        type='address'
                        placeholder='Proporcione cualquier otra informaci??n relevante'
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                     ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='contacto'>
                     <Form.Label>Nombre de quien entrega</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Nombre de quien entrega'
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                     ></Form.Control>
                     <Form.Text>
                        Nombre de quien entregar?? los art??culos
                     </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='telefono'>
                     <Form.Label>Telefono de quien entrega</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Tel??fono de quien entrega'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                     ></Form.Control>
                     <Form.Text>
                        Tel??fono de quien entregar?? los art??culos
                     </Form.Text>
                  </Form.Group>
                  {message && <Message variant='danger'>{message}</Message>}
                  <Button type='submit'>
                     {newPickupRequestLoading ? (
                        <Spinner animation='border' variant='dark' size='sm' />
                     ) : (
                        'Hacer solicitud'
                     )}
                  </Button>
               </Form>
            </Col>
            <Col lg={8}>
               <Card style={{ height: '80vh' }}>
                  <GoogleMapReact
                     bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_API_KEY,
                     }}
                     center={mapCenter}
                     zoom={zoom}
                     onChange={handleMapChange}
                     options={{
                        //    zoomControl: false,
                        fullscreenControl: false,
                        gestureHandling: 'greedy',
                     }}
                  />
                  <div style={centerPinStyle}>
                     <p className='text-primary' style={{ fontSize: '2rem' }}>
                        <i className='fas fa-map-pin'></i>
                     </p>
                  </div>
                  <div style={selectLocationButtonStyle}>
                     <Button onClick={handleSelectPickupLocation}>
                        {loading ? (
                           <Spinner
                              animation='border'
                              variant='dark'
                              size='sm'
                           />
                        ) : (
                           'Elegir Ubicaci??n'
                        )}
                     </Button>
                  </div>
                  <div style={searchBarStyle}>
                     <Form onSubmit={handleSearch}>
                        <InputGroup>
                           <InputGroup.Prepend>
                              <InputGroup.Text>
                                 <i className='fas fa-search'></i>
                              </InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control
                              type='textfield'
                              placeholder='Busca lugares'
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                           ></Form.Control>
                           <InputGroup.Append>
                              <Button type='submit'>
                                 {placesLoading ? (
                                    <Spinner
                                       animation='border'
                                       variant='dark'
                                       size='sm'
                                    />
                                 ) : (
                                    'Search'
                                 )}
                              </Button>
                           </InputGroup.Append>
                        </InputGroup>
                     </Form>
                     <Card style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                        <ListGroup>
                           {places?.map((result, i) => (
                              <ListGroup.Item
                                 action
                                 key={i}
                                 className='p-2'
                                 onClick={() =>
                                    handleSelectPlace(result.geometry.location)
                                 }
                              >
                                 <p className='text-primary m-0'>
                                    {result.name}
                                 </p>
                                 <p className='text-muted m-0'>
                                    {result.formatted_address}
                                 </p>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     </Card>
                  </div>
               </Card>
            </Col>
         </Row>
         <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Solicitud enviada con ??xito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Nuestro equipo se pondr?? de acuerdo contigo!
            </Modal.Body>
            <Modal.Footer>
               <Button variant='secondary' onClick={() => setShow(false)}>
                  Close
               </Button>
               <Button variant='primary' onClick={() => setShow(false)}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </Col>
   )
}

export default RequestPickupScreen
