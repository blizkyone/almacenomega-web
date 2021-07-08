import React, { useEffect } from 'react'
import { Col, Row, Button } from 'react-bootstrap'

const Handling = ({ setStage, locationDispatch }) => {
   useEffect(() => {
      locationDispatch({
         type: 'RESET_VALUES',
      })
   }, [])

   const handleSelectHandling = (type) => {
      locationDispatch({ type: 'SET_HANDLING', payload: type })
      setStage(1)
   }

   return (
      <Col>
         <h2>Elija el tipo de recolección</h2>

         <Button onClick={(_) => handleSelectHandling('Ligero')}>Ligera</Button>

         <p>
            Los objetos pueden ser manipulados por una sola persona. Peso menor
            a 20 kg o dimensiones menores a 1 metro.
         </p>

         <Button onClick={(_) => handleSelectHandling('Pesado')}>Pesada</Button>

         <p>
            Los objetos requieren de al menos dos personas para manejarse. Peso
            mayor a 20 kg o dimensiones mayores a 1 metro.
         </p>

         <Button onClick={(_) => handleSelectHandling('Especial')}>
            Con grua
         </Button>
         <p>Los objetos requieren equipo especializado para moverse</p>
      </Col>
   )
}

export default Handling
