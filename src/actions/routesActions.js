import {
   CREATE_MY_ROUTE_REQUEST,
   CREATE_MY_ROUTE_SUCCESS,
   CREATE_MY_ROUTE_FAIL,
   GET_MY_ROUTE_REQUEST,
   GET_MY_ROUTE_SUCCESS,
   GET_MY_ROUTE_FAIL,
   GET_MY_ROUTE_RESET,
   DELETE_MY_ROUTE_REQUEST,
   DELETE_MY_ROUTE_SUCCESS,
   DELETE_MY_ROUTE_FAIL,
   REMOVE_ORDER_FROM_ROUTE_SUCCESS,
   REMOVE_ORDER_FROM_ROUTE_REQUEST,
   REMOVE_ORDER_FROM_ROUTE_FAIL,
   GET_ACTIVE_ROUTES_REQUEST,
   GET_ACTIVE_ROUTES_SUCCESS,
   GET_ACTIVE_ROUTES_FAIL,
   GET_ROUTE_ITEMS_REQUEST,
   GET_ROUTE_ITEMS_SUCCESS,
   GET_ROUTE_ITEMS_FAIL,
   ROUTE_FINISH_FAIL,
   ROUTE_FINISH_SUCCESS,
   ROUTE_FINISH_REQUEST,
} from '../constants/routesConstants'
import axios from 'axios'
import { logout } from './userActions'

export const removeOrderFromRoute = (order) => async (dispatch, getState) => {
   try {
      dispatch({ type: REMOVE_ORDER_FROM_ROUTE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const body = { order }

      await axios.post(
         `${process.env.REACT_APP_API_URL}/routes/remove-order`,
         body,
         config
      )

      dispatch({
         type: REMOVE_ORDER_FROM_ROUTE_SUCCESS,
      })
      dispatch({
         type: GET_MY_ROUTE_RESET,
      })
   } catch (error) {
      dispatch({
         type: REMOVE_ORDER_FROM_ROUTE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const finishRoute = (route) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ROUTE_FINISH_REQUEST,
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
         `${process.env.REACT_APP_API_URL}/routes/${route}/finish`,
         config
      )

      dispatch({
         type: ROUTE_FINISH_SUCCESS,
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
         type: ROUTE_FINISH_FAIL,
         payload: message,
      })
   }
}

export const getRouteItems = (route) => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_ROUTE_ITEMS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/routes/items/${route}`,
         config
      )

      dispatch({
         type: GET_ROUTE_ITEMS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: GET_ROUTE_ITEMS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getActiveRoutes = () => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_ACTIVE_ROUTES_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/routes/active`,
         config
      )

      dispatch({
         type: GET_ACTIVE_ROUTES_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: GET_ACTIVE_ROUTES_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteMyRoute = () => async (dispatch, getState) => {
   try {
      dispatch({ type: DELETE_MY_ROUTE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(
         `${process.env.REACT_APP_API_URL}/routes/my-pickup-route`,
         config
      )

      dispatch({
         type: DELETE_MY_ROUTE_SUCCESS,
      })
      dispatch({
         type: GET_MY_ROUTE_RESET,
      })
   } catch (error) {
      dispatch({
         type: DELETE_MY_ROUTE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const createMyRoute = (route) => async (dispatch, getState) => {
   try {
      dispatch({ type: CREATE_MY_ROUTE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/routes/my-pickup-route`,
         { route },
         config
      )

      dispatch({
         type: CREATE_MY_ROUTE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: CREATE_MY_ROUTE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getMyRoute = () => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_MY_ROUTE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/routes/my-pickup-route`,
         config
      )

      dispatch({
         type: GET_MY_ROUTE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: GET_MY_ROUTE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
