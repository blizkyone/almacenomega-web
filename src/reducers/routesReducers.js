import {
   GET_MY_ROUTE_REQUEST,
   GET_MY_ROUTE_SUCCESS,
   GET_MY_ROUTE_FAIL,
   GET_MY_ROUTE_RESET,
   CREATE_MY_ROUTE_REQUEST,
   CREATE_MY_ROUTE_SUCCESS,
   CREATE_MY_ROUTE_FAIL,
   DELETE_MY_ROUTE_SUCCESS,
   DELETE_MY_ROUTE_REQUEST,
   DELETE_MY_ROUTE_FAIL,
} from '../constants/routesConstants'

export const deleteMyRouteReducer = (state = {}, action) => {
   switch (action.type) {
      case DELETE_MY_ROUTE_REQUEST:
         return { loading: true }
      case DELETE_MY_ROUTE_SUCCESS:
         return { loading: false, success: true }
      case DELETE_MY_ROUTE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const createMyRouteReducer = (state = { newRoute: [] }, action) => {
   switch (action.type) {
      case CREATE_MY_ROUTE_REQUEST:
         return { ...state, loading: true }
      case CREATE_MY_ROUTE_SUCCESS:
         return {
            loading: false,
            newRoute: action.payload,
         }
      case CREATE_MY_ROUTE_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
            pickupHistory: [],
         }
      default:
         return state
   }
}

export const getMyRouteReducer = (state = { myRoute: [] }, action) => {
   switch (action.type) {
      case GET_MY_ROUTE_REQUEST:
         return { ...state, loading: true }
      case GET_MY_ROUTE_SUCCESS:
         return {
            loading: false,
            myRoute: action.payload,
         }
      case GET_MY_ROUTE_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         }
      case GET_MY_ROUTE_RESET:
         return { myRoute: [] }
      default:
         return state
   }
}
