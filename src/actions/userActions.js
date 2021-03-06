import axios from 'axios'
import {
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_LOGOUT_FAIL,
   USER_LOGOUT_REQUEST,
   USER_LOGOUT_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_UPDATE_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_DETAILS_RESET,
   USER_LIST_FAIL,
   USER_LIST_SUCCESS,
   USER_LIST_REQUEST,
   USER_LIST_RESET,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DELETE_FAIL,
   USER_UPDATE_FAIL,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_REQUEST,
   USERNAME_VALIDATION_REQUEST,
   USERNAME_VALIDATION_SUCCESS,
   USERNAME_VALIDATION_FAIL,
   USER_PHONE_CODE_REQUEST,
   USER_PHONE_CODE_SUCCESS,
   USER_PHONE_CODE_FAIL,
   USER_PHONE_CODE_VALIDATION_REQUEST,
   USER_PHONE_CODE_VALIDATION_SUCCESS,
   USER_PHONE_CODE_VALIDATION_FAIL,
} from '../constants/userConstants'
// import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const verifyPhoneCode =
   ({ phone, code }) =>
   async (dispatch) => {
      try {
         dispatch({
            type: USER_PHONE_CODE_VALIDATION_REQUEST,
         })

         const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/verification/phone-code-validation?phone=${phone}&code=${code}`
         )

         if (data === 'Create a new user') {
            dispatch({
               type: USER_PHONE_CODE_VALIDATION_SUCCESS,
               payload: data,
            })
         } else {
            dispatch({
               type: USER_LOGIN_SUCCESS,
               payload: data,
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
         }
      } catch (error) {
         dispatch({
            type: USER_PHONE_CODE_VALIDATION_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const requestPhoneCode = (phone) => async (dispatch) => {
   try {
      dispatch({
         type: USER_PHONE_CODE_REQUEST,
      })

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/verification/phone-verification-code?phone=${phone}`
      )
      console.log(data)

      dispatch({
         type: USER_PHONE_CODE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: USER_PHONE_CODE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const login = (id, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST,
      })

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/users/login`,
         { id, password },
         config
      )

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const logout = () => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_LOGOUT_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/users/logout`,
         config
      )

      dispatch({ type: USER_LOGOUT_SUCCESS, payload: data })

      localStorage.removeItem('userInfo')
      localStorage.removeItem('cartItems')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      dispatch({ type: USER_LOGOUT })
      dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_LIST_MY_RESET })
      dispatch({ type: USER_LIST_RESET })
      document.location.href = '/login'
   } catch (error) {
      dispatch({
         type: USER_LOGOUT_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })

      localStorage.removeItem('userInfo')
      localStorage.removeItem('cartItems')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      dispatch({ type: USER_LOGOUT })
      dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_LIST_MY_RESET })
      dispatch({ type: USER_LIST_RESET })
      document.location.href = '/login'
   }
}

export const validateUsername = (username) => async (dispatch) => {
   try {
      dispatch({
         type: USERNAME_VALIDATION_REQUEST,
      })

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/users/validateUsername?username=${username}`
      )

      dispatch({
         type: USERNAME_VALIDATION_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: USERNAME_VALIDATION_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const register =
   ({ name, email, password, phone }) =>
   async (dispatch) => {
      try {
         dispatch({
            type: USER_REGISTER_REQUEST,
         })

         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         }

         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users`,
            { name, email, password, phone },
            config
         )

         dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
         })

         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
         })

         localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
         dispatch({
            type: USER_REGISTER_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DETAILS_REQUEST,
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
         `${process.env.REACT_APP_API_URL}/users/${id}`,
         config
      )

      dispatch({
         type: USER_DETAILS_SUCCESS,
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
         type: USER_DETAILS_FAIL,
         payload: message,
      })
   }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_PROFILE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `${process.env.REACT_APP_API_URL}/users/profile`,
         user,
         config
      )

      dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
         payload: data,
      })
      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: { ...data, token: userInfo.token },
      })
      localStorage.setItem(
         'userInfo',
         JSON.stringify({ ...data, token: userInfo.token })
      )
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_UPDATE_PROFILE_FAIL,
         payload: message,
      })
   }
}

export const listUsers = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_LIST_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/users`, config)

      dispatch({
         type: USER_LIST_SUCCESS,
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
         type: USER_LIST_FAIL,
         payload: message,
      })
   }
}

export const deleteUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DELETE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/users/${id}`, config)

      dispatch({ type: USER_DELETE_SUCCESS })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_DELETE_FAIL,
         payload: message,
      })
   }
}

export const updateUser = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/${user._id}`, user, config)

      dispatch({ type: USER_UPDATE_SUCCESS })

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

      dispatch({ type: USER_DETAILS_RESET })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: USER_UPDATE_FAIL,
         payload: message,
      })
   }
}
