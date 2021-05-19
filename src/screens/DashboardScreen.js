import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Row, Button, Col } from 'react-bootstrap'
import ProductList from '../components/dashboard/ProductList.js'
import TrackingList from '../components/dashboard/TrackingList.js'
import History from '../components/dashboard/History.js'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'

const DashboardScreen = ({ history, match }) => {
   const [key, setKey] = useState(match.params.page || 'product-list')
   const [area, setArea] = useState(0)

   const dispatch = useDispatch()

   const productListState = useSelector((state) => state.productList)
   const { loading, error, products } = productListState
   // console.log(products)

   useEffect(() => {
      dispatch(listProducts())
   }, [dispatch])

   useEffect(() => {
      if (products.length !== 0) {
         let value = products
            .map((x) => x.area)
            .reduce((acc, current) => acc + current)
            .toFixed(2)
         setArea(value)
      }
   }, [products])

   // useEffect(() => {
   //    console.log(productList)
   // }, [productList])

   const requestTransport = () => {
      alert('Transport')
   }

   const requestDelivery = () => {
      history.push('/request-delivery', { products })
   }

   const requestPickup = () => {
      history.push('/request-pickup')
   }

   useEffect(() => {
      setKey(match.params.page)
   }, [match])

   return (
      <>
         <Row>
            <Col>
               {loading ? (
                  <Loader />
               ) : (
                  <>
                     <h5>Almacenamineto utilizado:</h5>
                     <h1>{`${area} m2`}</h1>
                     <h5>{`Costo mensual: $${
                        area < 1 ? 1000 : 1000 + (area - 1) * 350
                     }`}</h5>
                  </>
               )}
            </Col>
         </Row>
         <Row>
            <Button className='m-3' onClick={requestPickup}>
               <i className='fas fa-truck'></i> Recolección
            </Button>
            <Button className='m-3' onClick={requestDelivery}>
               <i className='fas fa-truck'></i> Envío
            </Button>
            <Button className='m-3' onClick={requestTransport}>
               <i className='fas fa-truck'></i> Transporte
            </Button>
         </Row>

         <Tabs
            id='controlled-tab-example'
            activeKey={key}
            onSelect={(k) => setKey(k)}
         >
            <Tab eventKey='product-list' title='Inventario'>
               <ProductList
                  productList={products}
                  loading={loading}
                  error={error}
                  history={history}
                  match={match}
               />
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
