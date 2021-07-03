import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { useDispatch, useSelector } from 'react-redux'
import {
   queryPlaces,
   getAddress,
   requestPickup,
} from '../../actions/placesActions.js'
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
import Message from '../Message.js'

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

const EditLocation = ({ locationState, history }) => {
   const [query, setQuery] = useState('')
   const [mapCenter, setMapCenter] = useState(locationState.mapCenter)
   const [zoom, setZoom] = useState(12)
   const [locationAddress, setLocationAddress] = useState(locationState.address)
   const [locationCoordinates, setLocationCoordinates] = useState(
      locationState.locationCoordinates
   )
   const [pickupRequirement, setPickupRequirement] = useState(
      locationState.handling
   )
   const [comments, setComments] = useState(locationState.comments)
   const [person, setPerson] = useState(locationState.person)

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
      if (address) setLocationAddress(address)
   }, [address])

   useEffect(() => {
      if (placeAddressError) {
         if (
            placeAddressError ===
            "Cannot read property 'formatted_address' of undefined"
         ) {
            setLocationAddress(
               'No pudimos obtener la dirección :(, por favor borre este mensaje y escríbala'
            )
         } else {
            setMainMessage(placeAddressError)
         }
      }
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
      if (locationAddress && locationCoordinates && pickupRequirement) {
         //  alert('Request made')
         dispatch(
            requestPickup({
               address: locationAddress,
               lat: locationCoordinates.lat,
               lng: locationCoordinates.lng,
               comments,
               handling: pickupRequirement,
               person,
            })
         )
      } else if (!locationCoordinates) {
         setMessage('Debes elegir coordenadas de una ubicación en el mapa')
      } else {
         setValidated(true)
         setMessage('Revisa la información requerida')
      }
   }

   const handleSelectPlace = (coordinates) => {
      setMapCenter(coordinates)
      setZoom(16)
   }

   const handleMapChange = ({ center, zoom }) => {
      let coords = { lat: center.lat(), lng: center.lng() }
      setLocationCoordinates(null)
      setMapCenter(coords)
      setZoom(zoom)
   }

   const handleAceptar = () => {
      history.push('/dashboard/tracking')
   }

   return (
      <Col>
         <Row className='my-4'>
            <h3 className='mx-auto'>Solicitud de recolección</h3>
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
                     <Form.Label>Dirección</Form.Label>
                     <Form.Control
                        required
                        as='textarea'
                        type='address'
                        placeholder='Seleccione ubicación en el mapa'
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                     ></Form.Control>
                     <Form.Text>
                        Seleccione una ubicación y edite la dirección
                     </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='coordinates'>
                     <Form.Label>Coordenadas</Form.Label>
                     <Form.Control
                        required
                        readOnly
                        type='address'
                        placeholder='Seleccione ubicación en el mapa'
                        value={
                           locationCoordinates
                              ? `lat: ${locationCoordinates.lat}, lng: ${locationCoordinates.lng}`
                              : ''
                        }
                     ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='manejo'>
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
                        {'Ligero: 1 persona puede cargarlo y pesa < 20kg'}
                     </Form.Text>
                     <Form.Text>
                        {'Pesado: Requiere 2 o más personas o pesa > 20kg'}
                     </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='address'>
                     <Form.Label>Comentarios</Form.Label>
                     <Form.Control
                        as='textarea'
                        type='address'
                        placeholder='Proporcione cualquier otra información relevante'
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
                        Nombre de quien entregará los artículos
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
                     onDragEnd={handleMapChange}
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
                           'Elegir Ubicación'
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
               <Modal.Title>Solicitud enviada con éxito</Modal.Title>
            </Modal.Header>
            <Modal.Body>Su solicitud ha sido realizada con exito!</Modal.Body>
            <Modal.Footer>
               <Button onClick={handleAceptar}>Aceptar</Button>
            </Modal.Footer>
         </Modal>
      </Col>
   )
}

export default EditLocation
