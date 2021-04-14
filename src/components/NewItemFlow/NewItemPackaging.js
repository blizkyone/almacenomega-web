import React, { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import Message from '../Message'

const NewItemPackaging = ({
   setStage,
   loading,
   productState,
   createItem,
   productDispatch,
   match,
}) => {
   const [width, setWidth] = useState(productState.width)
   const [height, setHeight] = useState(productState.height)
   const [length, setLength] = useState(productState.length)
   const [weight, setWeight] = useState(productState.weight)

   const [message, setMessage] = useState('')
   const [validated, setValidated] = useState(false)

   const handleNext = (e) => {
      e.preventDefault()
      e.currentTarget.checkValidity()
      if (width && length && height && weight) {
         productDispatch({
            type: 'SET_VALUES',
            payload: { width, length, height, weight },
         })
         createItem()
      } else {
         setValidated(true)
         setMessage('All fields required')
      }
   }

   const handleSetWidth = (value) => {
      setWidth(value)
      productDispatch({ type: 'SET_WIDTH', payload: value })
   }

   const handleSetLength = (value) => {
      setLength(value)
      productDispatch({ type: 'SET_LENGTH', payload: value })
   }

   const handleSetHeight = (value) => {
      setHeight(value)
      productDispatch({ type: 'SET_HEIGHT', payload: value })
   }

   const handleSetWeight = (value) => {
      setWeight(value)
      productDispatch({ type: 'SET_WEIGHT', payload: value })
   }

   return (
      <Form noValidate validated={validated} onSubmit={handleNext}>
         <h1>Packaging</h1>
         <Form.Group controlId='width'>
            <Form.Label>Ancho - cm</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={width}
               onChange={(e) => handleSetWidth(e.target.value)}
            ></Form.Control>
            <Form.Text>Lado corto de la base</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         <Form.Group controlId='length'>
            <Form.Label>Largo - cm</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={length}
               onChange={(e) => handleSetLength(e.target.value)}
            ></Form.Control>
            <Form.Text>Lado largo de la base</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         <Form.Group controlId='height'>
            <Form.Label>Alto - cm</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={height}
               onChange={(e) => handleSetHeight(e.target.value)}
            ></Form.Control>
            <Form.Text>Alto desde la base</Form.Text>
            <Form.Control.Feedback type='invalid'>
               Requerido
            </Form.Control.Feedback>
         </Form.Group>

         <Form.Group controlId='weight'>
            <Form.Label>Peso - kg</Form.Label>
            <Form.Control
               required
               type='input'
               placeholder={0}
               value={weight}
               onChange={(e) => handleSetWeight(e.target.value)}
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
         <Button type='submit'>
            {loading ? (
               <Spinner as='span' animation='border' size='sm' />
            ) : (
               'Next'
            )}
         </Button>
      </Form>
   )
}

export default NewItemPackaging
