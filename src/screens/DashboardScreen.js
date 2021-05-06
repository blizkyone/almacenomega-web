import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Row, Button } from 'react-bootstrap'
import ProductList from '../components/dashboard/ProductList.js'
import TrackingList from '../components/dashboard/TrackingList.js'
import History from '../components/dashboard/History.js'
import { listProducts } from '../actions/productActions'

const DashboardScreen = ({ history, match }) => {
   const [key, setKey] = useState(match.params.page || 'product-list')

   const [productList, setProductList] = useState([])

   const dispatch = useDispatch()

   const productListState = useSelector((state) => state.productList)
   const { loading, error, products } = productListState
   // console.log(products)

   useEffect(() => {
      dispatch(listProducts())
   }, [dispatch])

   useEffect(() => {
      const modProducts = products.map((x) => ({ ...x, selected: false }))
      setProductList(modProducts)
   }, [products])

   // useEffect(() => {
   //    console.log(productList)
   // }, [productList])

   const selectItem = (id) => {
      setProductList((list) =>
         list.map((item) => {
            if (!item.inTransit && item._id === id)
               return { ...item, selected: !item.selected }
            return item
         })
      )
   }

   const requestTransport = () => {
      alert('Transport')
   }

   const requestDelivery = () => {
      let selectedProducts = productList.filter((x) => x.selected)
      if (selectedProducts.length === 0)
         return alert('select at least one product to deliver')

      const orderItems = selectedProducts.map((product) => ({
         name: product.name,
         brand: product.brand,
         description: product.description,
         price: product.price,
         item: product._id,
         barcode: product.barcode,
         qty: product.qty,
      }))
      history.push('/request-delivery', { orderItems })
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
                  productList={productList}
                  selectItem={selectItem}
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
