import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route path='/login' component={LoginScreen} />
               <Route path='/' component={HomeScreen} exact />
            </Container>
         </main>
         <Footer />
      </Router>
   )
}

export default App
