import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Message from '../Message'
import Loader from '../Loader'
import { getPickupTrackingList } from '../../actions/placesActions.js'

const TrackingList = ({ match, history }) => {
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
                        <th>DESTINO</th>
                        <th>DIRECCION</th>
                        <th>FECHA DE SOLICITUD</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>

                  {loading ? (
                     <Loader />
                  ) : error ? (
                     <Message variant='danger'>{error}</Message>
                  ) : (
                     <tbody>
                        {pickupTrackingList?.map((x, i) => (
                           <tr key={i} onClick={(e) => alert('clicked')}>
                              <td>{x.name}</td>
                              <td>{x.address}</td>
                              <td>
                                 {moment
                                    .utc(x.updatedAt)
                                    .format('MM/DD/YYYY HH:mm')}
                              </td>
                              <td>{x.status}</td>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </Table>
               {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
         )}
         <Row className='align-items-center'>
            <h3 className='my-3'>RECOLECCIONES</h3>
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
                        <th>DESTINO</th>
                        <th>DIRECCION</th>
                        <th>FECHA DE SOLICITUD</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>

                  {loading ? (
                     <Loader />
                  ) : error ? (
                     <Message variant='danger'>{error}</Message>
                  ) : (
                     <tbody>
                        {pickupTrackingList?.map((x, i) => (
                           <tr key={i} onClick={(e) => alert('clicked')}>
                              <td>{x.name}</td>
                              <td>{x.address}</td>
                              <td>
                                 {moment
                                    .utc(x.updatedAt)
                                    .format('MM/DD/YYYY HH:mm')}
                              </td>
                              <td>{x.status}</td>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </Table>
               {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
         )}
      </Row>
   )
}

export default TrackingList
