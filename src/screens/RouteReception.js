import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row, Pagination, Col, Button, Alert } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getActiveRoutes } from '../actions/routesActions'
import {
   GET_ROUTE_ITEMS_RESET,
   ROUTE_FINISH_RESET,
} from '../constants/routesConstants'

const RouteReception = ({ history, match }) => {
   const [message, setMessage] = useState('')

   const dispatch = useDispatch()

   const routesGetActiveState = useSelector((state) => state.routesGetActive)
   const { loading, error, activeRoutes } = routesGetActiveState

   useEffect(() => {
      dispatch(getActiveRoutes())
   }, [])

   // useEffect(() => {
   //    console.log(activeRoutes)
   // }, [activeRoutes])

   useEffect(() => {
      if (error) setMessage(error)
   }, [error])

   const handleSelectRoute = (routeId, name, date) => {
      dispatch({ type: GET_ROUTE_ITEMS_RESET })
      dispatch({ type: ROUTE_FINISH_RESET })
      const redirect =
         match.url.slice(-1) === '/'
            ? `${match.url}${routeId}`
            : `${match.url}/${routeId}`
      history.push(redirect, { name, date })
   }

   return (
      <>
         <h3>Rutas Activas</h3>
         {message && <Alert variant='danger'>{message}</Alert>}
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <Table striped bordered responsive className='table-sm'>
               <thead>
                  <tr>
                     <th>ENCARGADO</th>
                     <th>ORDENES</th>
                     <th>FECHA DE CREACION</th>
                  </tr>
               </thead>

               <tbody>
                  {activeRoutes.map((route) => (
                     <tr
                        key={route._id}
                        onClick={(_) =>
                           handleSelectRoute(
                              route._id,
                              route.createdBy.name,
                              moment.utc(route.createdAt).format('MM/DD/YYYY')
                           )
                        }
                     >
                        <td>{route.createdBy.name}</td>
                        <td>{route.route.length}</td>
                        <td>
                           {moment.utc(route.createdAt).format('MM/DD/YYYY')}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
      </>
   )
}

export default RouteReception
