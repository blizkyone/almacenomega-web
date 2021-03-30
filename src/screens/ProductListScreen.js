import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const ProductListScreen = ({ match }) => {
   //  const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const productList = useSelector((state) => state.productList)
   const { loading, error, products, page, pages } = productList

   useEffect(() => {
      dispatch(listProducts())
   }, [])

   const requestDelivery = () => {
      alert('Delivery requested')
   }

   return (
      <>
         <Row className='align-items-center'>
            <Col>
               <h1>Products</h1>
            </Col>
            <Col className='text-right'>
               <Button className='my-3' onClick={requestDelivery}>
                  <i className='fas fa-plus'></i> Request Delivery
               </Button>
            </Col>
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
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>DESCRIPTION</th>
                        <th>SIZE</th>
                        <th>WEIGHT</th>
                        <th>EDIT</th>
                     </tr>
                  </thead>
                  <tbody>
                     {products?.map((product) => (
                        <tr key={product._id}>
                           <td>{product.name}</td>
                           {/* <td>${product.price}</td> */}
                           {/* <td>{product.category}</td> */}
                           <td>{product.brand}</td>
                           <td>{product.description}</td>
                           <td>{product.area}</td>
                           <td>{product.weight}</td>
                           <td>
                              <LinkContainer
                                 to={`/admin/product/${product._id}/edit`}
                              >
                                 <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                 </Button>
                              </LinkContainer>
                              {/* <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button> */}
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

export default ProductListScreen
