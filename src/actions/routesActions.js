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
} from '../constants/routesConstants'
import axios from 'axios'

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

      const { data } = await axios.delete(
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
