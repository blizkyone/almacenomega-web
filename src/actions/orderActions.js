import axios from 'axios'
import {
   // ORDER_CREATE_REQUEST,
   // ORDER_CREATE_SUCCESS,
   // ORDER_CREATE_FAIL,
   // ORDER_CREATE_RESET,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_FAIL,
   // ORDER_DETAILS_RESET,
   ORDER_ADD_ITEM_REQUEST,
   ORDER_ADD_ITEM_SUCCESS,
   ORDER_ADD_ITEM_FAIL,
   ORDER_DELETE_ITEM_REQUEST,
   ORDER_DELETE_ITEM_SUCCESS,
   ORDER_DELETE_ITEM_FAIL,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_SUCCESS,
   ORDER_DELIVER_REQUEST,
} from '../constants/orderConstants'
import { logout } from './userActions'

export const deliverOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DELIVER_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `${process.env.REACT_APP_API_URL}/orders/${order}/deliver`,
         {},
         config
      )

      dispatch({
         type: ORDER_DELIVER_SUCCESS,
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
         type: ORDER_DELIVER_FAIL,
         payload: message,
      })
   }
}

export const deleteItemFromOrder = (itemData) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DELETE_ITEM_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `${process.env.REACT_APP_API_URL}/orders/${itemData.order}/pickup`,
         itemData,
         config
      )

      dispatch({
         type: ORDER_DELETE_ITEM_SUCCESS,
         payload: data,
      })
      dispatch({
         type: ORDER_DETAILS_SUCCESS,
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
         type: ORDER_DELETE_ITEM_FAIL,
         payload: message,
      })
   }
}

export const addItemToOrder = (productData) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_ADD_ITEM_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/orders/${productData.order}/pickup`,
         productData,
         config
      )

      dispatch({
         type: ORDER_ADD_ITEM_SUCCESS,
         payload: data,
      })
      dispatch({
         type: ORDER_DETAILS_SUCCESS,
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
         type: ORDER_ADD_ITEM_FAIL,
         payload: message,
      })
   }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DETAILS_REQUEST,
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
         `${process.env.REACT_APP_API_URL}/orders/${id}`,
         config
      )

      dispatch({
         type: ORDER_DETAILS_SUCCESS,
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
         type: ORDER_DETAILS_FAIL,
         payload: message,
      })
   }
}
