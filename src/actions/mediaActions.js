import {
   UPLOAD_PHOTO_REQUEST,
   UPLOAD_PHOTO_SUCCESS,
   UPLOAD_PHOTO_FAIL,
   UPLOAD_PHOTO_RESET,
   GET_ITEM_PHOTOS_REQUEST,
   GET_ITEM_PHOTOS_SUCCESS,
   GET_ITEM_PHOTOS_FAIL,
} from '../constants/mediaConstants'
import axios from 'axios'

export const getItemPictures = (item) => async (dispatch) => {
   try {
      dispatch({
         type: GET_ITEM_PHOTOS_REQUEST,
      })

      const { data } = await axios.get(
         `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/list/${item}.json`
      )
      console.log(data)

      dispatch({
         type: GET_ITEM_PHOTOS_SUCCESS,
         payload: data.resources,
      })
   } catch (error) {
      if (error.message === 'Request failed with status code 404') {
         console.log(error.message)
         dispatch({
            type: GET_ITEM_PHOTOS_FAIL,
            payload: 'No hay fotos de este item',
         })
      }
   }
}

export const uploadPicture = (formData) => async (dispatch, getState) => {
   try {
      dispatch({
         type: UPLOAD_PHOTO_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const { data } = await axios.put(
         `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`,
         formData
      )
      console.log(data)

      dispatch({
         type: UPLOAD_PHOTO_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      dispatch({
         type: UPLOAD_PHOTO_FAIL,
         payload: message,
      })
   }
}
