import React, { useEffect, useState } from 'react'
import { Table, Row, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Message from '../Message'
import Loader from '../Loader'
import { getTrackingList } from '../../actions/placesActions.js'

const TrackingList = ({ match, history }) => {
   const [envios, setEnvios] = useState([])
   const [recolecciones, setRecolecciones] = useState([])
   //  const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const orderTrackingState = useSelector((state) => state.orderTracking)
   const { loading, error, orderTrackingList, page, pages } = orderTrackingState

   useEffect(() => {
      dispatch(getTrackingList(1))
   }, [])

   useEffect(() => {
      if (orderTrackingList && orderTrackingList.length > 0) {
         // console.log(orderTrackingList)

         const pickupList = orderTrackingList.filter((x) => x.type === 'pickup')
         const deliveryList = orderTrackingList.filter(
            (x) => x.type === 'delivery'
         )

         setEnvios(deliveryList)
         setRecolecciones(pickupList)
      } else {
         setRecolecciones([])
      }
   }, [orderTrackingList])

   const fetchNextPage = (nextPage) => {
      if (nextPage != page) dispatch(getTrackingList(nextPage))
   }

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
                        {/* <th>DESTINO</th> */}
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
                        {envios.map((x, i) => (
                           <tr key={i} onClick={(e) => alert('clicked')}>
                              {/* <td>{x.name}</td> */}
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
                        {/* <th>DESTINO</th> */}
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
                        {recolecciones.map((x, i) => (
                           <tr key={i} onClick={(e) => alert('clicked')}>
                              {/* <td>{x.name}</td> */}
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
