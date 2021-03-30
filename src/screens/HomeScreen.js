import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Image, Placeholder } from 'cloudinary-react'

const HomeScreen = () => {
   return (
      <>
         <Card style={{ width: '18rem' }}>
            <Image publicId='samples/ecommerce/leather-bag-gray' loading='lazy'>
               <Placeholder />
            </Image>
            <Card.Body>
               <Card.Title>Card Title</Card.Title>
               <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
               </Card.Text>
               <Button variant='primary'>Go somewhere</Button>
            </Card.Body>
         </Card>
      </>
   )
}

export default HomeScreen
