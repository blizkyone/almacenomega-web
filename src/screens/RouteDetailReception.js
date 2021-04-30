import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
   Table,
   Button,
   Alert,
   Form,
   InputGroup,
   Spinner,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getRouteItems } from '../actions/routesActions'
import { finishRoute } from '../actions/routesActions'
import Radium from 'radium'

const styles = {
   back: {
      margin: '10px',
      ':hover': {
         cursor: 'pointer',
      },
   },
}

const RouteDetailReception = ({ match, history }) => {
   const [message, setMessage] = useState('')
   const [barcode, setBarcode] = useState('')
   const [items, setItems] = useState([])
   const [finalize, setFinalize] = useState(false)

   const ref = useRef()

   const dispatch = useDispatch()

   const routeGetRouteItemsState = useSelector(
      (state) => state.routeGetRouteItems
   )
   const { loading, error, routeItems } = routeGetRouteItemsState

   const routeFinishState = useSelector((state) => state.routeFinish)
   const {
      loading: routeFinishLoading,
      error: routeFinishError,
      success: routeFinishSuccess,
   } = routeFinishState

   const driver = history.location.state.name
   const routeDate = history.location.state.date
   const redirect = match.url.split(match.params.ruta)[0]

   useEffect(() => {
      dispatch(getRouteItems(match.params.ruta))
      ref.current.focus()
   }, [])

   useEffect(() => {
      setItems(routeItems)
   }, [routeItems])

   useEffect(() => {
      if (error) setMessage(error)
      if (routeFinishError) setMessage(routeFinishError)
   }, [error, routeFinishError])

   useEffect(() => {
      if (
         items.length > 0 &&
         items.filter((x) => x.received === false).length === 0
      ) {
         setFinalize(true)
      }
   }, [items])

   useEffect(() => {
      if (routeFinishSuccess) history.push(redirect)
   }, routeFinishSuccess)

   const handleChangeBarcode = (e) => {
      setBarcode(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (items.filter((x) => x.barcode === barcode).length > 0) {
         let newItems = items.map((item) => {
            if (item.barcode === barcode) {
               return { ...item, received: true }
            } else {
               return { ...item }
            }
         })

         setItems(newItems)
         setMessage('')
      } else {
         setMessage('No item found with that barcode')
      }
      setBarcode('')
   }

   const handleFinalize = () => {
      dispatch(finishRoute(match.params.ruta))
   }

   return (
      <>
         <h3>{`${driver} ${routeDate}`}</h3>
         {message && <Alert variant='danger'>{message}</Alert>}
         <p onClick={(_) => history.push(redirect)} style={styles.back}>
            {'<<< Back'}
         </p>
         <Form onSubmit={handleSubmit}>
            <InputGroup>
               <Form.Control
                  type='text'
                  ref={ref}
                  placeholder='Scan barcode'
                  value={barcode}
                  onChange={handleChangeBarcode}
               ></Form.Control>
               <InputGroup.Append>
                  <Button type='submit'>Receive Item</Button>
               </InputGroup.Append>
            </InputGroup>
         </Form>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <Table striped bordered hover responsive className='table-sm'>
               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>DESCRIPTION</th>
                     <th>ACCION</th>
                  </tr>
               </thead>

               <tbody>
                  {items.map((item, i) => (
                     <tr
                        key={item._id}
                        className={`${item.received ? 'table-success' : ''}`}
                     >
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                           <Button
                              className='btn-sm'
                              onClick={(_) =>
                                 window.open(
                                    `https://localhost:3000/barcode/${item.barcode}`,
                                    'Barcode'
                                 )
                              }
                           >
                              <i className='fas fa-barcode'></i>
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
         {finalize && (
            <Button onClick={handleFinalize}>
               {routeFinishLoading ? (
                  <Spinner animation='border' size='sm' />
               ) : (
                  'Finalize'
               )}
            </Button>
         )}
      </>
   )
}

export default Radium(RouteDetailReception)
