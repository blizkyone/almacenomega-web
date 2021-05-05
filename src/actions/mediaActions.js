import {
   UPLOAD_ORDER_RECEIPT_REQUEST,
   UPLOAD_ORDER_RECEIPT_SUCCESS,
   UPLOAD_ORDER_RECEIPT_FAIL,
   // UPLOAD_ORDER_RECEIPT_RESET,
   GET_ORDER_RECEIPT_REQUEST,
   GET_ORDER_RECEIPT_SUCCESS,
   GET_ORDER_RECEIPT_FAIL,
   // GET_ORDER_RECEIPT_RESET,
   DELETE_ORDER_RECEIPT_REQUEST,
   DELETE_ORDER_RECEIPT_SUCCESS,
   DELETE_ORDER_RECEIPT_FAIL,
   // DELETE_ORDER_RECEIPT_RESET,
   UPLOAD_PHOTO_REQUEST,
   UPLOAD_PHOTO_SUCCESS,
   UPLOAD_PHOTO_FAIL,
   // UPLOAD_PHOTO_RESET,
   GET_ITEM_PHOTOS_REQUEST,
   GET_ITEM_PHOTOS_SUCCESS,
   GET_ITEM_PHOTOS_FAIL,
   DELETE_ITEM_PHOTO_REQUEST,
   DELETE_ITEM_PHOTO_SUCCESS,
   DELETE_ITEM_PHOTO_FAIL,
} from '../constants/mediaConstants'
import axios from 'axios'
import imageCompression from 'browser-image-compression'

export const deleteOrderReceipt = (url, order) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: DELETE_ORDER_RECEIPT_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      let key = `${order}${url.split(order)[1]}`
      // console.log(key)

      const { data } = await axios.delete(
         // `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/list/${item}.json`,
         `${process.env.REACT_APP_API_URL}/upload/orderImage?key=${key}&order=${order}`,
         config
      )

      // console.log(data)

      dispatch({
         type: DELETE_ORDER_RECEIPT_SUCCESS,
         payload: data,
      })
   } catch (error) {
      if (error.message === 'Request failed with status code 404') {
         console.log(error.message)
         dispatch({
            type: DELETE_ORDER_RECEIPT_FAIL,
            payload: 'No hay fotos de este item',
         })
      } else {
         const message =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message
         dispatch({
            type: DELETE_ORDER_RECEIPT_FAIL,
            payload: message,
         })
      }
   }
}

export const getOrderReceipt = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: GET_ORDER_RECEIPT_REQUEST,
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
         // `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/list/${item}.json`,
         `${process.env.REACT_APP_API_URL}/upload/orderImage?order=${order}`,
         config
      )
      // console.log(data)

      dispatch({
         type: GET_ORDER_RECEIPT_SUCCESS,
         payload: data,
      })
   } catch (error) {
      if (error.message === 'Request failed with status code 404') {
         console.log(error.message)
         dispatch({
            type: GET_ORDER_RECEIPT_FAIL,
            payload: 'No hay fotos de este item',
         })
      } else {
         const message =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message
         dispatch({
            type: GET_ORDER_RECEIPT_FAIL,
            payload: message,
         })
      }
   }
}

export const uploadOrderReceipt = (selectedFile, order) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: UPLOAD_ORDER_RECEIPT_REQUEST,
      })

      const compressionOptions = { maxSizeMB: 5, fileType: 'jpg' }

      const file = await imageCompression(selectedFile, compressionOptions)

      const fd = new FormData()
      fd.append('file', file)

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'multipart-form-data',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      // const { data } = await axios.put(
      //    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`,
      //    formData
      // )
      // console.log(data)

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/upload/orderImage?order=${order}`,
         fd,
         config
      )
      // console.log(data)

      dispatch({
         type: UPLOAD_ORDER_RECEIPT_SUCCESS,
         payload: data,
      })
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      dispatch({
         type: UPLOAD_ORDER_RECEIPT_FAIL,
         payload: message,
      })
   }
}

export const deleteItemPhoto = (url, item) => async (dispatch, getState) => {
   try {
      dispatch({
         type: DELETE_ITEM_PHOTO_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      let key = `${item}${url.split(item)[1]}`
      // console.log(key)

      const { data } = await axios.delete(
         // `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/list/${item}.json`,
         `${process.env.REACT_APP_API_URL}/upload/itemImage?key=${key}&item=${item}`,
         config
      )

      // console.log(data)

      dispatch({
         type: DELETE_ITEM_PHOTO_SUCCESS,
         payload: data,
      })
   } catch (error) {
      if (error.message === 'Request failed with status code 404') {
         console.log(error.message)
         dispatch({
            type: DELETE_ITEM_PHOTO_FAIL,
            payload: 'No hay fotos de este item',
         })
      } else {
         const message =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message
         dispatch({
            type: DELETE_ITEM_PHOTO_FAIL,
            payload: message,
         })
      }
   }
}

export const getItemPictures = (item) => async (dispatch, getState) => {
   try {
      dispatch({
         type: GET_ITEM_PHOTOS_REQUEST,
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
         // `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/list/${item}.json`,
         `${process.env.REACT_APP_API_URL}/upload/itemImage?item=${item}`,
         config
      )
      // console.log(data)

      dispatch({
         type: GET_ITEM_PHOTOS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      if (error.message === 'Request failed with status code 404') {
         console.log(error.message)
         dispatch({
            type: GET_ITEM_PHOTOS_FAIL,
            payload: 'No hay fotos de este item',
         })
      } else {
         const message =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message
         dispatch({
            type: GET_ITEM_PHOTOS_FAIL,
            payload: message,
         })
      }
   }
}

export const uploadPicture = (selectedFile, item) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: UPLOAD_PHOTO_REQUEST,
      })

      const compressionOptions = { maxSizeMB: 5, fileType: 'jpg' }

      const file = await imageCompression(selectedFile, compressionOptions)

      const fd = new FormData()
      fd.append('file', file)

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'multipart-form-data',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      // const { data } = await axios.put(
      //    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`,
      //    formData
      // )
      // console.log(data)

      const { data } = await axios.post(
         `${process.env.REACT_APP_API_URL}/upload/itemImage?item=${item}`,
         fd,
         config
      )
      // console.log(data)

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
