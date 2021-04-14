import {
   UPLOAD_PHOTO_REQUEST,
   UPLOAD_PHOTO_SUCCESS,
   UPLOAD_PHOTO_FAIL,
   UPLOAD_PHOTO_RESET,
   GET_ITEM_PHOTOS_REQUEST,
   GET_ITEM_PHOTOS_SUCCESS,
   GET_ITEM_PHOTOS_FAIL,
   GET_ITEM_PHOTOS_RESET,
} from '../constants/mediaConstants'

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
