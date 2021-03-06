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
   DELIVERY_HISTORY_REQUEST,
   DELIVERY_HISTORY_SUCCESS,
   DELIVERY_HISTORY_FAIL,
   PICKUP_HISTORY_REQUEST,
   PICKUP_HISTORY_SUCCESS,
   PICKUP_HISTORY_FAIL,
   ORDER_TRACKING_REQUEST,
   ORDER_TRACKING_SUCCESS,
   ORDER_TRACKING_FAIL,
   SUBMITTED_PICKUP_REQUEST,
   SUBMITTED_PICKUP_SUCCESS,
   SUBMITTED_PICKUP_FAIL,
} from '../constants/placesConstants'

export const pickupRequestsReducer = (
   state = { pickupRequests: [] },
   action
) => {
   switch (action.type) {
      case SUBMITTED_PICKUP_REQUEST:
         return { ...state, loading: true }
      case SUBMITTED_PICKUP_SUCCESS:
         return {
            loading: false,
            pickupRequests: action.payload.pickupRequests,
            page: action.payload.page,
            pages: action.payload.pages,
         }
      case SUBMITTED_PICKUP_FAIL:
         return { loading: false, error: action.payload, pickupRequests: [] }
      default:
         return state
   }
}

export const deliveryHistoryReducer = (
   state = { deliveryHistory: [] },
   action
) => {
   switch (action.type) {
      case DELIVERY_HISTORY_REQUEST:
         return { ...state, loading: true }
      case DELIVERY_HISTORY_SUCCESS:
         return {
            loading: false,
            deliveryHistory: action.payload.history,
            page: action.payload.page,
            pages: action.payload.pages,
         }
      case DELIVERY_HISTORY_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}

export const orderTrackingReducer = (
   state = { orderTrackingList: [] },
   action
) => {
   switch (action.type) {
      case ORDER_TRACKING_REQUEST:
         return { loading: true }
      case ORDER_TRACKING_SUCCESS:
         return {
            loading: false,
            orderTrackingList: action.payload.pickupTrackingList,
            page: action.payload.page,
            pages: action.payload.pages,
         }
      case ORDER_TRACKING_FAIL:
         return { loading: false, error: action.payload, pickupHistory: [] }
      default:
         return state
   }
}

export const pickupHistoryReducer = (state = { pickupHistory: [] }, action) => {
   switch (action.type) {
      case PICKUP_HISTORY_REQUEST:
         return { ...state, loading: true }
      case PICKUP_HISTORY_SUCCESS:
         return {
            loading: false,
            pickupHistory: action.payload.history,
            page: action.payload.page,
            pages: action.payload.pages,
         }
      case PICKUP_HISTORY_FAIL:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}

export const requestDeliveryReducer = (state = {}, action) => {
   switch (action.type) {
      case REQUEST_DELIVERY_REQUEST:
         return { loading: true }
      case REQUEST_DELIVERY_SUCCESS:
         return { loading: false, request: action.payload }
      case REQUEST_DELIVERY_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const requestPickupReducer = (state = {}, action) => {
   switch (action.type) {
      case REQUEST_PICKUP_REQUEST:
         return { loading: true }
      case REQUEST_PICKUP_SUCCESS:
         return { loading: false, request: action.payload }
      case REQUEST_PICKUP_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const placeAutocompleteReducer = (state = { places: [] }, action) => {
   switch (action.type) {
      case PLACE_AUTOCOMPLETE_REQUEST:
         return { loading: true }
      case PLACE_AUTOCOMPLETE_SUCCESS:
         return { loading: false, places: action.payload }
      case PLACE_AUTOCOMPLETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const locationAddressReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_ADDRESS_REQUEST:
         return { loading: true }
      case GET_ADDRESS_SUCCESS:
         return { loading: false, address: action.payload }
      case GET_ADDRESS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
