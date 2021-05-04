import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { getPickupTrackingList } from '../../actions/placesActions.js'

const TrackingList = ({ match, history }) => {
   const [envios, setEnvios] = useState([])
   const [recolecciones, setRecolecciones] = useState([])
   //  const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const pickupTrackingState = useSelector((state) => state.pickupTracking)
   const {
      loading,
      error,
      pickupTrackingList,
      page,
      pages,
   } = pickupTrackingState

   useEffect(() => {
      dispatch(getPickupTrackingList(1))
   }, [])

   // useEffect(() => {
   //    console.log(recolecciones)
   // }, [recolecciones])

   useEffect(() => {
      if (pickupTrackingList && pickupTrackingList.length > 0) {
         setRecolecciones(
            pickupTrackingList.filter((x) => x.status === 'Entregado')
         )
      } else {
         setRecolecciones([])
      }
   }, [pickupTrackingList])

   return (
      <Row>
         <Row className='align-items-center'>
            <h3 className='my-3'>Envíos</h3>
         </Row>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                     <tr>
                        <th>DIRECCION</th>
                        <th>FECHA</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {envios.map((x, i) => (
                        <tr key={i} onClick={(e) => alert('clicked')}>
                           <td>{x.name}</td>
                           <td>{x.address}</td>
                           <td>
                              {moment
                                 .utc(x.deliveredAt)
                                 .format('MM/DD/YYYY HH:mm')}
                           </td>
                           <td>{x.status}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
         )}
         <Row className='align-items-center'>
            <h3 className='my-3'>Recolecciones</h3>
         </Row>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                     <tr>
                        <th>DIRECCION</th>
                        <th>FECHA</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {recolecciones.map((x, i) => (
                        <tr key={i} onClick={(e) => alert('clicked')}>
                           <td>{x.address}</td>
                           <td>
                              {moment
                                 .utc(x.deliveredAt)
                                 .local()
                                 .format('MM/DD/YYYY HH:mm')}
                           </td>
                           <td>{x.status}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
         )}
      </Row>
   )
}

export default TrackingList
