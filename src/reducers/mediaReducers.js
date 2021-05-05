import {
   UPLOAD_ORDER_RECEIPT_REQUEST,
   UPLOAD_ORDER_RECEIPT_SUCCESS,
   UPLOAD_ORDER_RECEIPT_FAIL,
   UPLOAD_ORDER_RECEIPT_RESET,
   GET_ORDER_RECEIPT_REQUEST,
   GET_ORDER_RECEIPT_SUCCESS,
   GET_ORDER_RECEIPT_FAIL,
   GET_ORDER_RECEIPT_RESET,
   DELETE_ORDER_RECEIPT_REQUEST,
   DELETE_ORDER_RECEIPT_SUCCESS,
   DELETE_ORDER_RECEIPT_FAIL,
   DELETE_ORDER_RECEIPT_RESET,
   UPLOAD_PHOTO_REQUEST,
   UPLOAD_PHOTO_SUCCESS,
   UPLOAD_PHOTO_FAIL,
   UPLOAD_PHOTO_RESET,
   GET_ITEM_PHOTOS_REQUEST,
   GET_ITEM_PHOTOS_SUCCESS,
   GET_ITEM_PHOTOS_FAIL,
   GET_ITEM_PHOTOS_RESET,
   DELETE_ITEM_PHOTO_REQUEST,
   DELETE_ITEM_PHOTO_SUCCESS,
   DELETE_ITEM_PHOTO_FAIL,
   DELETE_ITEM_PHOTO_RESET,
} from '../constants/mediaConstants'

export const mediaDeleteOrderReceiptReducer = (state = {}, action) => {
   switch (action.type) {
      case DELETE_ORDER_RECEIPT_REQUEST:
         return { loading: true }
      case DELETE_ORDER_RECEIPT_SUCCESS:
         return { loading: false, photo: action.payload }
      case DELETE_ORDER_RECEIPT_FAIL:
         return { loading: false, success: false, error: action.payload }
      case DELETE_ORDER_RECEIPT_RESET:
         return {}
      default:
         return state
   }
}

export const mediaGetOrderReceiptReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_ORDER_RECEIPT_REQUEST:
         return { ...state, loading: true }
      case GET_ORDER_RECEIPT_SUCCESS:
         return { loading: false, success: true, orderReceipt: action.payload }
      case GET_ORDER_RECEIPT_FAIL:
         return { ...state, loading: false, error: action.payload }
      case GET_ORDER_RECEIPT_RESET:
         return {}
      default:
         return state
   }
}

export const mediaUploadOrderReceiptReducer = (state = {}, action) => {
   switch (action.type) {
      case UPLOAD_ORDER_RECEIPT_REQUEST:
         return { loading: true }
      case UPLOAD_ORDER_RECEIPT_SUCCESS:
         return { loading: false, success: true, photo: action.payload }
      case UPLOAD_ORDER_RECEIPT_FAIL:
         return { loading: false, error: action.payload }
      case UPLOAD_ORDER_RECEIPT_RESET:
         return {}
      default:
         return state
   }
}

export const mediaDeleteItemPhotoReducer = (state = {}, action) => {
   switch (action.type) {
      case DELETE_ITEM_PHOTO_REQUEST:
         return { loading: true }
      case DELETE_ITEM_PHOTO_SUCCESS:
         return { loading: false, photo: action.payload }
      case DELETE_ITEM_PHOTO_FAIL:
         return { loading: false, success: false, error: action.payload }
      case DELETE_ITEM_PHOTO_RESET:
         return {}
      default:
         return state
   }
}

export const mediaGetItemPhotosReducer = (
   state = { photoArray: [] },
   action
) => {
   switch (action.type) {
      case GET_ITEM_PHOTOS_REQUEST:
         return { ...state, loading: true }
      case GET_ITEM_PHOTOS_SUCCESS:
         return { loading: false, success: true, photoArray: action.payload }
      case GET_ITEM_PHOTOS_FAIL:
         return { ...state, loading: false, error: action.payload }
      case GET_ITEM_PHOTOS_RESET:
         return { photoArray: [] }
      default:
         return state
   }
}

export const mediaUploadPhotoReducer = (state = {}, action) => {
   switch (action.type) {
      case UPLOAD_PHOTO_REQUEST:
         return { loading: true }
      case UPLOAD_PHOTO_SUCCESS:
         return { loading: false, success: true, photo: action.payload }
      case UPLOAD_PHOTO_FAIL:
         return { loading: false, error: action.payload }
      case UPLOAD_PHOTO_RESET:
         return {}
      default:
         return state
   }
}
