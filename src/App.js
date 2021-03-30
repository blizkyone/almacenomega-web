import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductListScreen from './screens/ProductListScreen'
import AdminScreen from './screens/AdminScreen'
import AddItemScreen from './screens/AddItemScreen'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route path='/login' component={LoginScreen} />
               <Route path='/register' component={RegisterScreen} />
               <Route path='/profile' component={ProductListScreen} />
               <Route path='/admin' component={AdminScreen} exact />
               <Route path='/admin/addItem' component={AddItemScreen} exact />
               <Route path='/' component={HomeScreen} exact />
            </Container>
         </main>
         <Footer />
      </Router>
   )
}

export default App
