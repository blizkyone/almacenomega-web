import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import Message from '../Message'

const NewItemDetails = ({
   handleBarcodeSubmit,
   setStage,
   barcode,
   setBarcode,
   name,
   setName,
   brand,
   setBrand,
   category,
   setCategory,
   description,
   setDescription,
   condition,
   setCondition,
   qty,
   setQty,
}) => {
   const [message, setMessage] = useState('')
   const [validated, setValidated] = useState(false)

   const handleNext = (e) => {
      e.preventDefault()
      e.currentTarget.checkValidity()
      if (name && brand && category && description && condition && qty) {
         setValidated(true)
         setStage(1)
      } else {
         setValidated(true)
         setMessage('All fields required')
      }
   }

   return (
      <>
         <Form onSubmit={handleBarcodeSubmit}>
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
         </Form>
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
                  required
                  type='text'
                  placeholder='Marca'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='state'>
               <Form.Label>Categoría</Form.Label>
               <Form.Control
                  required
                  as='select'
                  value={category}
                  onChange={(e) => setCategory([e.target.value])}
               >
                  <option></option>
                  <option>Juegos y Juguetes</option>
                  <option>Mascotas y Accesorios</option>
               </Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group controlId='state'>
               <Form.Label>Condición</Form.Label>
               <Form.Control
                  required
                  as='select'
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
               >
                  <option></option>
                  <option>Nuevo</option>
                  <option>Usado</option>
               </Form.Control>
               <Form.Control.Feedback type='invalid'>
                  Requerido
               </Form.Control.Feedback>
            </Form.Group>

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
