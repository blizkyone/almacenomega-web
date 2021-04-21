import React from 'react'
import { Row, Col, Card, Button, Image } from 'react-bootstrap'
// import { Image, Placeholder } from 'cloudinary-react'

const HomeScreen = () => {
   return (
      <>
         <Card style={{ width: '18rem' }}>
            {/* <Image
               publicId='samples/ecommerce/leather-bag-gray'
               loading='lazy'
               height='180'
               width='286'
            >
               <Placeholder />
            </Image> */}
            <Image
               fluid
               src={
                  'https://s3.us-east-1.amazonaws.com/aoitems/6077246fc9c8285d6c0202e4/b1ddac17-269e-4ef7-a9c9-d5d6e1dbe314.jpg'
               }
            />
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
