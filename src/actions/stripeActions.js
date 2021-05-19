import {
   CREATE_PAYMENT_INTENT_REQUEST,
   CREATE_PAYMENT_INTENT_SUCCESS,
   CREATE_PAYMENT_INTENT_FAIL,
   GET_PAYMENT_METHODS_REQUEST,
   GET_PAYMENT_METHODS_SUCCESS,
   GET_PAYMENT_METHODS_FAIL,
   CREATE_PAYMENT_METHOD_REQUEST,
   CREATE_PAYMENT_METHOD_SUCCESS,
   CREATE_PAYMENT_METHOD_FAIL,
} from '../constants/stripeConstants'
import axios from 'axios'
import { logout } from './userActions'
import { useStripe } from '@stripe/react-stripe-js'

export const createNewPaymentMethod = (cardElement, clientSecret) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: CREATE_PAYMENT_METHOD_REQUEST,
      })

      const stripe = useStripe()

      const { paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card: cardElement,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: paymentMethod.id,
         receipt_email: userInfo.email,
         setup_future_usage: 'off_session',
      })

      if (paymentIntent.status === 'succeeded')
         dispatch({
            type: CREATE_PAYMENT_METHOD_SUCCESS,
            paymentMethod: paymentIntent.payment_method,
         })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: CREATE_PAYMENT_METHOD_FAIL,
         payload: message,
      })
   }
}

export const getPaymentMethods = () => async (dispatch, getState) => {
   //    console.log('here')
   try {
      dispatch({
         type: GET_PAYMENT_METHODS_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/stripe/payment-methods`,
         config
      )

      dispatch({
         type: GET_PAYMENT_METHODS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: GET_PAYMENT_METHODS_FAIL,
         payload: message,
      })
   }
}

export const createPaymentIntent = (amount) => async (dispatch, getState) => {
   //    console.log('here')
   try {
      dispatch({
         type: CREATE_PAYMENT_INTENT_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const body = { amount }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/stripe/new-payment-intent`,
         body,
         config
      )

      dispatch({
         type: CREATE_PAYMENT_INTENT_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: CREATE_PAYMENT_INTENT_FAIL,
         payload: message,
      })
   }
}
