import React from 'react'
import { Table, Button, Image, Form } from 'react-bootstrap'
import Message from '../Message'
import Loader from '../Loader'

const ProductList = ({ productList, selectItem, error, loading }) => {
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
                     {productList?.map((product) => (
                        <tr
                           key={product._id}
                           className={`${
                              product.selected
                                 ? 'table-info'
                                 : product.inTransit
                                 ? 'table-warning'
                                 : ''
                           }`}
                           onClick={() => selectItem(product._id)}
                        >
                           <td>{product.qty}</td>
                           <td>{product.name}</td>
                           <td>{product.brand}</td>
                           <td>{product.description}</td>
                           <td>{product.area}</td>
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
         )}
      </>
   )
}

export default ProductList
