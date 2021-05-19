import React, { useEffect } from 'react'
import moment from 'moment'
import { Table, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import {
   getPickupHistory,
   getDeliveryHistory,
} from '../../actions/placesActions.js'

const TrackingList = () => {
   //  const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const pickupHistoryState = useSelector((state) => state.pickupHistory)
   const { loading, error, pickupHistory, page, pages } = pickupHistoryState

   const deliveryHistoryState = useSelector((state) => state.deliveryHistory)
   const {
      loading: deliveryLoading,
      error: deliveryError,
      deliveryHistory,
      page: deliveryPage,
      pages: deliveryPages,
   } = deliveryHistoryState

   useEffect(() => {
      dispatch(getDeliveryHistory())
      dispatch(getPickupHistory())
   }, [dispatch])

   // useEffect(() => {
   //    console.log(recolecciones)
   // }, [recolecciones])

   return (
      <Row>
         <Row className='align-items-center'>
            <h3 className='my-3'>Envíos</h3>
         </Row>
         {deliveryLoading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{deliveryError}</Message>
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
                     {deliveryHistory.map((x, i) => (
                        <tr key={i} onClick={(e) => alert('clicked')}>
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
                     {pickupHistory.map((x, i) => (
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
