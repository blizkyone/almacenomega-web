import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import './bootstrap.min (3).css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY)

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <Elements stripe={stripePromise}>
            <App />
         </Elements>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
