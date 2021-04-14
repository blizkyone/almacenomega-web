import {
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_CREATE_FAIL,
   ORDER_CREATE_RESET,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_RESET,
   ORDER_ADD_ITEM_REQUEST,
   ORDER_ADD_ITEM_SUCCESS,
   ORDER_ADD_ITEM_FAIL,
   ORDER_ADD_ITEM_RESET,
   ORDER_DELETE_ITEM_REQUEST,
   ORDER_DELETE_ITEM_SUCCESS,
   ORDER_DELETE_ITEM_FAIL,
} from '../constants/orderConstants'

export const orderDeleteItemReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_DELETE_ITEM_REQUEST:
         return { loading: true }
      case ORDER_DELETE_ITEM_SUCCESS:
         return { loading: false, success: true, deletedOrder: action.payload }
      case ORDER_DELETE_ITEM_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const orderAddItemReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_ADD_ITEM_REQUEST:
         return { loading: true }
      case ORDER_ADD_ITEM_SUCCESS:
         return { loading: false, success: true, order: action.payload }
      case ORDER_ADD_ITEM_FAIL:
         return { loading: false, error: action.payload }
      case ORDER_ADD_ITEM_RESET:
         return {}
      default:
         return state
   }
}

export const orderDetailsReducer = (
   state = { orderItems: [], shippingAddress: {} },
   action
) => {
   switch (action.type) {
      case ORDER_DETAILS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case ORDER_DETAILS_SUCCESS:
         return {
            loading: false,
            order: action.payload,
         }
      case ORDER_DETAILS_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_DETAILS_RESET:
         return {}
      default:
         return state
   }
}

export const orderCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_CREATE_REQUEST:
         return {
            loading: true,
         }
      case ORDER_CREATE_SUCCESS:
         return {
            loading: false,
            success: true,
            order: action.payload,
         }
      case ORDER_CREATE_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_CREATE_RESET:
         return {}
      default:
         return state
   }
}
