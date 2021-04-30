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
   GET_ACTIVE_ROUTES_REQUEST,
   GET_ACTIVE_ROUTES_SUCCESS,
   GET_ACTIVE_ROUTES_FAIL,
   GET_ACTIVE_ROUTES_RESET,
   GET_ROUTE_ITEMS_REQUEST,
   GET_ROUTE_ITEMS_SUCCESS,
   GET_ROUTE_ITEMS_FAIL,
   GET_ROUTE_ITEMS_RESET,
   ROUTE_FINISH_FAIL,
   ROUTE_FINISH_SUCCESS,
   ROUTE_FINISH_REQUEST,
   ROUTE_FINISH_RESET,
} from '../constants/routesConstants'

export const routeFinishReducer = (state = {}, action) => {
   switch (action.type) {
      case ROUTE_FINISH_REQUEST:
         return {
            loading: true,
         }
      case ROUTE_FINISH_SUCCESS:
         return {
            loading: false,
            success: true,
         }
      case ROUTE_FINISH_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ROUTE_FINISH_RESET:
         return { loading: false, success: false }
      default:
         return state
   }
}

export const routesGetRouteItemsReducer = (
   state = { routeItems: [] },
   action
) => {
   switch (action.type) {
      case GET_ROUTE_ITEMS_REQUEST:
         return { ...state, loading: true }
      case GET_ROUTE_ITEMS_SUCCESS:
         return {
            loading: false,
            routeItems: action.payload,
         }
      case GET_ROUTE_ITEMS_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         }
      case GET_ROUTE_ITEMS_RESET:
         return { routeItems: [] }
      default:
         return state
   }
}

export const routesGetActiveReducer = (
   state = { activeRoutes: [] },
   action
) => {
   switch (action.type) {
      case GET_ACTIVE_ROUTES_REQUEST:
         return { ...state, loading: true }
      case GET_ACTIVE_ROUTES_SUCCESS:
         return {
            loading: false,
            activeRoutes: action.payload,
         }
      case GET_ACTIVE_ROUTES_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         }
      case GET_ACTIVE_ROUTES_RESET:
         return { activeRoutes: [] }
      default:
         return state
   }
}

export const routesDeleteMyRouteReducer = (state = {}, action) => {
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
