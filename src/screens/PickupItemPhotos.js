import React, { useEffect, useState, useReducer, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button, Spinner, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadPicture, getItemPictures } from '../actions/mediaActions'
import { Image, Placeholder } from 'cloudinary-react'
import { GET_ITEM_PHOTOS_RESET } from '../constants/mediaConstants'

const PickupItemPhotos = ({ match }) => {
   const [errorMsg, setErrorMsg] = useState('')
   const dispatch = useDispatch()

   const hiddenFileInput = useRef(null)

   const mediaUploadPhotoState = useSelector((state) => state.mediaUploadPhoto)
   const { loading, error, photo } = mediaUploadPhotoState

   const mediaGetItemPhotosState = useSelector(
      (state) => state.mediaGetItemPhotos
   )
   const {
      loading: getPhotoLoading,
      error: getPhotoError,
      photoArray,
   } = mediaGetItemPhotosState

   useEffect(() => {
      dispatch(getItemPictures(match.params.item))
      //   return dispatch({
      //      type: GET_ITEM_PHOTOS_RESET,
      //   })
   }, [photo])

   useEffect(() => {
      setErrorMsg(error || getPhotoError)
   }, [error, getPhotoError])

   const handleClick = (event) => {
      hiddenFileInput.current.click()
   }

   const handleAddPhoto = async (e) => {
      // console.log(newImgEl.current)
      const selectedFile = e.target.files[0]
      //   console.log(selectedFile)
      if (!selectedFile) {
         return
      }

      //   const reader = new FileReader()
      // reader.onload = (function(aImg) { return function(e) {
      //     aImg.style.backgroundImage = `url(${e.target.result})`
      // }; })(newImgEl.current);
      // reader.readAsDataURL(selectedFile)

      const fd = new FormData()
      fd.append('file', selectedFile)
      fd.append('upload_preset', 'react_upload')
      fd.append('tags', match.params.item)
      fd.append('folder', match.params.item)

      dispatch(uploadPicture(fd))
   }

   return getPhotoLoading ? (
      <Spinner animation='border' size='lg' />
   ) : (
      <Row>
         <Col md={6}>
            <Form>
               <Button onClick={handleClick}>
                  {loading ? (
                     <Spinner animation='border' size='sm' />
                  ) : (
                     'Upload a picture'
                  )}
               </Button>
               {errorMsg && <Message variant='danger'>{errorMsg}</Message>}
               <input
                  type='file'
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}
                  onChange={handleAddPhoto}
               />
            </Form>
            <Row>
               {photoArray.map((photo) => (
                  <Col key={photo.public_id} lg={6}>
                     <Card>
                        <Image publicId={photo.public_id}>
                           <Placeholder />
                        </Image>
                     </Card>
                  </Col>
               ))}
            </Row>
         </Col>
         <Col md={6}>Column 1</Col>
      </Row>
   )
}

export default PickupItemPhotos
