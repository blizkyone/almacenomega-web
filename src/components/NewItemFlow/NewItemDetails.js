import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from '../Message'

const NewItemDetails = ({
   // handleBarcodeSubmit,
   setStage,
   productState,
   productDispatch,
}) => {
   // const [barcode, setBarcode] = useState(productState.barcode)
   const [name, setName] = useState(productState.name)
   const [brand, setBrand] = useState(productState.brand)
   // const [condition, setCondition] = useState(productState.condition)
   const [qty, setQty] = useState(productState.qty)
   const [description, setDescription] = useState(productState.description)
   // const [categories, setCategories] = useState(productState.categories)

   const [message, setMessage] = useState('')
   const [validated, setValidated] = useState(false)

   const handleNext = (e) => {
      e.preventDefault()
      e.currentTarget.checkValidity()
      if (name && description && qty) {
         setValidated(true)
         productDispatch({
            type: 'SET_VALUES',
            payload: { name, brand, description, qty },
         })
         setStage(1)
      } else {
         setValidated(true)
         setMessage('All fields required')
      }
   }

   return (
      <>
         {/* <Form onSubmit={handleBarcodeSubmit}>
            <Form.Group controlId='barcode'>
               <Form.Label>Código de barras - opcional</Form.Label>
               <InputGroup>
                  <Form.Control
                     type='barcode'
                     placeholder='Código de barras'
                     value={barcode}
                     onChange={(e) => setBarcode(e.target.value)}
                  ></Form.Control>
                  <InputGroup.Append>
                     <Button type='sumbit' className='btn-info'>
                        Buscar
                     </Button>
                  </InputGroup.Append>
               </InputGroup>
            </Form.Group>
         </Form> */}
         <Form noValidate validated={validated} onSubmit={handleNext}>
            <h1>{name || 'Nuevo Item'}</h1>

            <Form.Group controlId='name'>
               <Form.Label>Nombre del producto</Form.Label>
               <Form.Control
                  required
                  type='name'
                  placeholder='Nombre del producto'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='brand'>
               <Form.Label>Marca</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Opcional'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group controlId='state'>
               <Form.Label>Categoría</Form.Label>
               <Form.Control
                  required
                  as='select'
                  value={categories}
                  onChange={(e) => setCategories([e.target.value])}
               >
                  <option></option>
                  <option>Juegos y Juguetes</option>
                  <option>Mascotas y Accesorios</option>
               </Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group controlId='description'>
               <Form.Label>Descripción</Form.Label>
               <Form.Control
                  required
                  as='textarea'
                  placeholder='Descripción del producto'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group controlId='condition'>
               <Form.Label>Condición</Form.Label>
               <Form.Control
                  required
                  as='textarea'
                  placeholder='Nuevo, usado, observaciones...'
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group controlId='qty'>
               <Form.Label>Cantidad</Form.Label>
               <Form.Control
                  required
                  type='input'
                  placeholder={0}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>
            {message && <Message variant='danger'>{message}</Message>}
            <Button type='submit'>Next</Button>
         </Form>
      </>
   )
}

export default NewItemDetails
