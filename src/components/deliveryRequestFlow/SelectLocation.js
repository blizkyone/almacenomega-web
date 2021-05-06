import React, { useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { getDeliveryHistory } from '../../actions/placesActions'
import { Table, Row, Button, Pagination } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'

const SelectLocation = ({ setStage, locationDispatch }) => {
   const dispatch = useDispatch()

   const deliveryHistoryState = useSelector((state) => state.deliveryHistory)
   const { loading, error, deliveryHistory, page, pages } = deliveryHistoryState

   useEffect(() => {
      dispatch(getDeliveryHistory())
   }, [dispatch])

   // useEffect(() => {
   //    console.log(deliveryHistory)
   // }, [deliveryHistory])

   const fetchNextPage = (nextPage) => {
      if (nextPage !== page) dispatch(getDeliveryHistory(nextPage))
   }

   const goToEditLocation = (e, x) => {
      e.preventDefault()
      const coordinates = {
         lat: x.location.coordinates[1],
         lng: x.location.coordinates[0],
      }
      locationDispatch({
         type: 'SET_VALUES',
         payload: {
            ...x,
            mapCenter: coordinates,
            locationCoordinates: coordinates,
         },
      })
      setStage(1)
   }

   return (
      <>
         <Row className='justify-content-between'>
            <h4 className='my-3'>Elige la ubicación</h4>
            <Button onClick={(_) => setStage(1)}>Nueva Ubicación</Button>
         </Row>
         <Row className='my-3'>
            {deliveryHistory?.length > 0 && <h5>Historial</h5>}
         </Row>
         <Row>
            {loading ? (
               <Loader />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <Table className='table-hover'>
                  <tbody>
                     {deliveryHistory.map((x, i) => (
                        <tr key={i} onClick={(e) => goToEditLocation(e, x)}>
                           <td>{x.name}</td>
                           <td>{x.address}</td>
                           <td>
                              {moment.utc(x.updatedAt).format('MM/DD/YYYY')}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            )}
         </Row>
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
   )
}

export default SelectLocation
