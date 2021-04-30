import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AdminScreen from './screens/AdminScreen'
import PickupAddItemScreen from './screens/PickupAddItemScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import RequestPickupScreen from './screens/RequestPickupScreen'
import DashboardScreen from './screens/DashboardScreen'
import PickupRequestsScreen from './screens/PickupRequestsScreen'
import MyRouteScreen from './screens/MyRouteScreen'
import PickupOrderScreen from './screens/PickupOrderScreen'
import PickupItemPhotos from './screens/PickupItemPhotos'
import BarcodeScreen from './screens/BarcodeScreen'
import RouteReception from './screens/RouteReception'
import RouteDetailReception from './screens/RouteDetailReception'

const App = () => {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route path='/barcode/:barcode' component={BarcodeScreen} />
               <Route path='/login' component={LoginScreen} />
               <Route path='/register' component={RegisterScreen} />
               <Route path='/dashboard' component={DashboardScreen} exact />
               <Route path='/dashboard/:page' component={DashboardScreen} />
               <Route path='/request-pickup' component={RequestPickupScreen} />
               <Route path='/admin' component={AdminScreen} exact />
               <Route
                  path='/admin/recepcion-de-rutas'
                  component={RouteReception}
                  exact
               />
               <Route
                  path='/admin/recepcion-de-rutas/:ruta'
                  component={RouteDetailReception}
               />
               <Route
                  path='/admin/addItem'
                  component={PickupAddItemScreen}
                  exact
               />
               <Route path='/admin/mi-ruta' component={MyRouteScreen} exact />
               <Route
                  path='/admin/mi-ruta/:order'
                  component={PickupOrderScreen}
                  exact
               />
               <Route
                  path='/admin/mi-ruta/:order/agregar-item'
                  component={PickupAddItemScreen}
                  exact
               />
               <Route
                  path='/admin/mi-ruta/:order/:item/imagenes'
                  component={PickupItemPhotos}
                  exact
               />
               <Route
                  path='/admin/solicitudes-recoleccion'
                  component={PickupRequestsScreen}
                  exact
               />
               <Route path='/' component={HomeScreen} exact />
            </Container>
         </main>
         <Footer />
      </Router>
   )
}

export default App
