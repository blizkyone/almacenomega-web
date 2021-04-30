import React from 'react'
import { Toast } from 'react-bootstrap'

const SimpleToast = ({ header, body, show, setShow }) => {
   return (
      <Toast show={show} onClose={(_) => setShow(false)}>
         {header && <Toast.Header>{header}</Toast.Header>}
         {body && <Toast.Body>{body}</Toast.Body>}
      </Toast>
   )
}

export default SimpleToast
