import React, { useState, useEffect } from 'react'
import { Table, Image, Button, InputGroup, FormControl } from 'react-bootstrap'

const ItemSelection = ({ products, setStage, locationDispatch }) => {
   const [productList, setProductList] = useState([])

   useEffect(() => {
      let modProducts = products.filter((x) => x.qty > 0)
      modProducts = modProducts.map((x) => ({
         ...x,
         selQty: 0,
      }))
      setProductList(modProducts)
   }, [products])

   const addItem = (e, id, qty) => {
      let selQty = parseInt(e.target.value)
      if (typeof selQty !== 'number') return
      if (selQty > qty || selQty < 0) return
      setProductList((list) =>
         list.map((item) => {
            if (item._id === id) return { ...item, selQty }
            return item
         })
      )
   }

   const requestDelivery = () => {
      let items = productList.filter(
         (x) => typeof x.selQty === 'number' && x.selQty > 0
      )
      //----calculate handling
      let handling = 'Ligero'
      if (
         items.some(
            (item) =>
               item.weight >= 20 ||
               item.length >= 100 ||
               item.height >= 100 ||
               item.width >= 100
         )
      )
         handling = 'Pesado'
      if (items.some((item) => item.weight >= 50)) handling = 'Especial'
      //calculate handling----
      items = items.map((product) => ({
         name: product.name,
         qty: product.selQty,
         brand: product.brand,
         description: product.description,
         condition: product.condition,
         item: product._id,
         barcode: Math.floor(1000 + Math.random() * 8999).toString(),
      }))
      //   console.log(items)
      locationDispatch({
         type: 'SET_ORDER_ITEMS',
         payload: { items, handling },
      })
      setStage(1)
   }

   return (
      <>
         <Button className='m-3' onClick={requestDelivery}>
            <i className='fas fa-truck'></i> Envío
         </Button>
         <Table striped bordered hover responsive className='table-sm my-3'>
            <thead>
               <tr>
                  <th>SELQTY</th>
                  <th>QTY</th>
                  <th>NAME</th>
                  <th>BRAND</th>
                  <th>DESCRIPTION</th>
                  <th>PHOTO</th>
               </tr>
            </thead>
            <tbody>
               {productList?.map((product) => (
                  <tr
                     key={product._id}
                     className={product.selQty > 0 ? 'table-info' : ''}
                  >
                     <td>
                        <InputGroup>
                           <FormControl
                              type='number'
                              value={product.selQty}
                              onChange={(e) =>
                                 addItem(e, product._id, product.qty)
                              }
                           />
                        </InputGroup>
                     </td>
                     <td>{product.qty}</td>
                     <td>{product.name}</td>
                     <td>{product.brand}</td>
                     <td>{product.description}</td>
                     <td>
                        {
                           <Image
                              style={{ height: '100px', width: '100px' }}
                              // src={`https://s3.us-east-1.amazonaws.com/aoitems/${product.images[0]}`}
                              src={`https://aoitems.s3.us-east-1.amazonaws.com/${product.images[0]}`}
                           />
                        }
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
         {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
      </>
   )
}

export default ItemSelection
