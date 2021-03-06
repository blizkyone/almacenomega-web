import {
   PLACE_AUTOCOMPLETE_REQUEST,
   PLACE_AUTOCOMPLETE_SUCCESS,
   PLACE_AUTOCOMPLETE_FAIL,
   GET_ADDRESS_REQUEST,
   GET_ADDRESS_SUCCESS,
   GET_ADDRESS_FAIL,
   REQUEST_DELIVERY_REQUEST,
   REQUEST_DELIVERY_SUCCESS,
   REQUEST_DELIVERY_FAIL,
   REQUEST_PICKUP_REQUEST,
   REQUEST_PICKUP_SUCCESS,
   REQUEST_PICKUP_FAIL,
   PICKUP_HISTORY_REQUEST,
   PICKUP_HISTORY_SUCCESS,
   PICKUP_HISTORY_FAIL,
   DELIVERY_HISTORY_REQUEST,
   DELIVERY_HISTORY_SUCCESS,
   DELIVERY_HISTORY_FAIL,
   ORDER_TRACKING_REQUEST,
   ORDER_TRACKING_SUCCESS,
   ORDER_TRACKING_FAIL,
   SUBMITTED_PICKUP_REQUEST,
   SUBMITTED_PICKUP_SUCCESS,
   SUBMITTED_PICKUP_FAIL,
} from '../constants/placesConstants'
import axios from 'axios'

export const getSubmittedPickupRequests = (page) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({ type: SUBMITTED_PICKUP_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/pickup-requests?pageNumber=${page}`,
         config
      )

      dispatch({
         type: SUBMITTED_PICKUP_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SUBMITTED_PICKUP_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getTrackingList = (page) => async (dispatch, getState) => {
   try {
      dispatch({ type: ORDER_TRACKING_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/tracking?pageNumber=${page}`,
         config
      )

      dispatch({
         type: ORDER_TRACKING_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_TRACKING_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getDeliveryHistory = (page) => async (dispatch, getState) => {
   try {
      dispatch({ type: DELIVERY_HISTORY_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/request-delivery?pageNumber=${page}`,
         config
      )

      dispatch({
         type: DELIVERY_HISTORY_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: DELIVERY_HISTORY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getPickupHistory = (page) => async (dispatch, getState) => {
   try {
      dispatch({ type: PICKUP_HISTORY_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/request-pickup?pageNumber=${page}`,
         config
      )

      dispatch({
         type: PICKUP_HISTORY_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PICKUP_HISTORY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const requestDelivery = (request) => async (dispatch, getState) => {
   try {
      dispatch({ type: REQUEST_DELIVERY_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/places/request-delivery`,
         request,
         config
      )

      dispatch({
         type: REQUEST_DELIVERY_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: REQUEST_DELIVERY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const requestPickup = (request) => async (dispatch, getState) => {
   try {
      dispatch({ type: REQUEST_PICKUP_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/places/request-pickup`,
         request,
         config
      )

      dispatch({
         type: REQUEST_PICKUP_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: REQUEST_PICKUP_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const queryPlaces = (query) => async (dispatch, getState) => {
   try {
      dispatch({ type: PLACE_AUTOCOMPLETE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/autocomplete?input=${query}`,
         config
      )

      dispatch({
         type: PLACE_AUTOCOMPLETE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PLACE_AUTOCOMPLETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getAddress = (lat, lng) => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_ADDRESS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/places/getAddress?latlng=${lat},${lng}`,
         config
      )

      dispatch({
         type: GET_ADDRESS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: GET_ADDRESS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
