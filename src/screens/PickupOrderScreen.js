import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const PickupOrderScreen = ({ history }) => {
   const [products, setProducts] = useState([])

   const dispatch = useDispatch()

   const { userId } = history.location.state

   useEffect(() => {
      console.log(userId)
   }, [userId])

   return (
      <>
         <Row className='justify-content-between'>
            <Button>Agregar Producto</Button>
         </Row>
         <Table striped bordered hover responsive className='table-sm my-3'>
            <thead>
               <tr>
                  <th>NAME</th>
                  <th>BRAND</th>
                  <th>DESCRIPCION</th>
                  <th>AREA</th>
                  <th>WEIGHT</th>
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
         {products.length > 0 && <Button>Finalizar Recolección</Button>}
      </>
   )
}

export default PickupOrderScreen
