import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Row, Button } from 'react-bootstrap'
import ProductList from '../components/dashboard/ProductList.js'
import TrackingList from '../components/dashboard/TrackingList.js'
import History from '../components/dashboard/History.js'

const DashboardScreen = ({ history, match }) => {
   const [key, setKey] = useState(match.params.page || 'product-list')

   const requestDelivery = () => {
      alert('Delivery requested')
   }

   const requestPickup = () => {
      history.push('/pickup-request')
   }

   useEffect(() => {
      setKey(match.params.page)
   }, [match])

   return (
      <>
         <Row>
            <Button className='m-3' onClick={requestPickup}>
               <i class='fas fa-truck'></i> Recolección
            </Button>
            <Button className='m-3' onClick={requestDelivery}>
               <i class='fas fa-truck'></i> Envío
            </Button>
         </Row>

         <Tabs
            id='controlled-tab-example'
            activeKey={key}
            onSelect={(k) => setKey(k)}
         >
            <Tab eventKey='product-list' title='Inventario'>
               <ProductList history={history} match={match} />
            </Tab>
            <Tab eventKey='tracking' title='Rastreo'>
               <TrackingList history={history} match={match} />
            </Tab>
            <Tab eventKey='history' title='Historial'>
               <History history={history} match={match} />
            </Tab>
         </Tabs>
      </>
   )
}

export default DashboardScreen
