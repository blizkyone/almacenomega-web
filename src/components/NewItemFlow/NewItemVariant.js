import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from '../Message'

const NewItemVariant = ({
   setStage,
   color,
   setColor,
   size,
   setSize,
   type,
   setType,
}) => {
   const [message, setMessage] = useState('')

   const handleNext = (e) => {
      e.preventDefault()
      if (color || size || type) {
         //  setStage(1)
         alert('Ready')
      } else {
         setMessage('At least one field required')
      }
   }

   return (
      <Form onSubmit={handleNext}>
         <h1>Packaging</h1>
         <Form.Group controlId='color'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               type='input'
               placeholder={0}
               value={color}
               onChange={(e) => setColor(e.target.value)}
            ></Form.Control>
         </Form.Group>

         <Form.Group controlId='size'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               type='input'
               placeholder={0}
               value={size}
               onChange={(e) => setSize(e.target.value)}
            ></Form.Control>
         </Form.Group>

         <Form.Group controlId='type'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               type='input'
               placeholder={0}
               value={type}
               onChange={(e) => setType(e.target.value)}
            ></Form.Control>
         </Form.Group>

         {message && <Message variant='danger'>{message}</Message>}
         <Button className='btn-danger' onClick={() => setStage(1)}>
            Back
         </Button>
         <Button type='submit'>Next</Button>
      </Form>
   )
}

export default NewItemVariant
