import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Alert } from 'react-bootstrap'
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
   }, [dispatch])

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

   const handleClickRow = (r) => {
      // console.log(r)
      if (r.completed) {
         handleSelectRoute(
            r._id,
            r.createdBy.name,
            moment.utc(r.createdAt).format('MM/DD/YYYY')
         )
      }
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
                     <th>COMPLETADO</th>
                  </tr>
               </thead>

               <tbody>
                  {activeRoutes.map((route) => (
                     <tr
                        key={route._id}
                        onClick={() => handleClickRow(route)}
                        className={route.completed ? 'table-info' : ''}
                     >
                        <td>{route.createdBy.name}</td>
                        <td>{route.route.length}</td>
                        <td>
                           {moment.utc(route.createdAt).format('MM/DD/YYYY')}
                        </td>
                        <td>
                           {route.completed ? (
                              <i className='fas fa-check-circle'></i>
                           ) : (
                              <i className='fas fa-times-circle'></i>
                           )}
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
