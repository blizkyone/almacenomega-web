import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { listProducts } from '../../actions/productActions'

const ProductList = () => {
   //  const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const productList = useSelector((state) => state.productList)
   const { loading, error, products, page, pages } = productList

   useEffect(() => {
      dispatch(listProducts())
   }, [])

   useEffect(() => {
      console.log(products)
   }, [products])

   return (
      <>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm my-3'
               >
                  <thead>
                     <tr>
                        <th>QTY</th>
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>DESCRIPTION</th>
                        <th>M2</th>
                        <th>PHOTO</th>
                     </tr>
                  </thead>
                  <tbody>
                     {products?.map((product) => (
                        <tr key={product._id}>
                           <td>{product.qty}</td>
                           <td>{product.name}</td>
                           <td>{product.brand}</td>
                           <td>{product.description}</td>
                           <td>{product.area}</td>
                           <td>
                              {
                                 <Image
                                    style={{ height: '100px', width: '100px' }}
                                    src={`https://s3.us-east-1.amazonaws.com/aoitems/${product.images[0]}`}
                                 />
                              }
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
         )}
      </>
   )
}

export default ProductList
