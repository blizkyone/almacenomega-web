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
   DELETE_PAYMENT_METHOD_REQUEST,
   DELETE_PAYMENT_METHOD_SUCCESS,
   DELETE_PAYMENT_METHOD_FAIL,
} from '../constants/stripeConstants'

export const stripeDeletePaymentMethodReducer = (state = {}, action) => {
   switch (action.type) {
      case DELETE_PAYMENT_METHOD_REQUEST:
         return { loading: true }
      case DELETE_PAYMENT_METHOD_SUCCESS:
         return { loading: false, success: true }
      case DELETE_PAYMENT_METHOD_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const stripeCreatePaymentMethodReducer = (state = {}, action) => {
   switch (action.type) {
      case CREATE_PAYMENT_METHOD_REQUEST:
         return { loading: true }
      case CREATE_PAYMENT_METHOD_SUCCESS:
         return { loading: false, paymentMethod: action.payload }
      case CREATE_PAYMENT_METHOD_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const stripeGetPaymentMethodsReducer = (
   state = { paymentMethods: [] },
   action
) => {
   switch (action.type) {
      case GET_PAYMENT_METHODS_REQUEST:
         return { ...state, loading: true }
      case GET_PAYMENT_METHODS_SUCCESS:
         return { loading: false, paymentMethods: action.payload }
      case GET_PAYMENT_METHODS_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}

export const stripeCreatePaymentIntentReducer = (state = {}, action) => {
   switch (action.type) {
      case CREATE_PAYMENT_INTENT_REQUEST:
         return { loading: true }
      case CREATE_PAYMENT_INTENT_SUCCESS:
         return { loading: false, intentData: action.payload }
      case CREATE_PAYMENT_INTENT_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
