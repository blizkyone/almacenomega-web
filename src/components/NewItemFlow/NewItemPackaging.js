import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from '../Message'

const NewItemPackaging = ({
   setStage,
   width,
   setWidth,
   height,
   setHeight,
   length,
   setLength,
   weight,
   setWeight,
}) => {
   const [message, setMessage] = useState('')
   const [validated, setValidated] = useState(false)

   const handleNext = (e) => {
      e.preventDefault()
      e.currentTarget.checkValidity()
      if (width && length && height && weight) {
         //  setStage(1)
         alert('Ready')
      } else {
         setValidated(true)
         setMessage('All fields required')
      }
   }

   return (
      <Form noValidate validated={validated} onSubmit={handleNext}>
         <h1>Packaging</h1>
         <Form.Group controlId='width'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={width}
               onChange={(e) => setWidth(e.target.value)}
            ></Form.Control>
            <Form.Text>Lado corto de la base</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         <Form.Group controlId='length'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={length}
               onChange={(e) => setLength(e.target.value)}
            ></Form.Control>
            <Form.Text>Lado largo de la base</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         <Form.Group controlId='height'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={height}
               onChange={(e) => setHeight(e.target.value)}
            ></Form.Control>
            <Form.Text>Alto desde la base</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         <Form.Group controlId='weight'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={weight}
               onChange={(e) => setWeight(e.target.value)}
            ></Form.Control>
            <Form.Text>Peso total del producto</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         {message && <Message variant='danger'>{message}</Message>}
         <Button className='btn-danger' onClick={() => setStage(0)}>
            Back
         </Button>
         <Button type='submit'>Next</Button>
      </Form>
   )
}

export default NewItemPackaging
