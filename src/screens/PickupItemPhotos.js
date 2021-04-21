import React, { useEffect, useState, useReducer, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button, Spinner, Card, Image } from 'react-bootstrap'
import Radium from 'radium'
import Message from '../components/Message'
import {
   uploadPicture,
   getItemPictures,
   deleteItemPhoto,
} from '../actions/mediaActions'
import { GET_ITEM_PHOTOS_RESET } from '../constants/mediaConstants'
// import { Image, Placeholder } from 'cloudinary-react'

const styles = {
   pstyle: {
      backgroundColor: 'red',
      position: 'absolute',
      bottom: 0,
      right: 0,
      margin: '2px',
      padding: '5px',
      borderRadius: '5px',
      ':hover': {
         cursor: 'pointer',
      },
   },
   back: {
      margin: '10px',
      ':hover': {
         cursor: 'pointer',
      },
   },
}

const PickupItemPhotos = ({ match, history }) => {
   const [photoArray, setPhotoArray] = useState([])
   const [errorMsg, setErrorMsg] = useState('')
   const [selectedPhoto, setSelectedPhoto] = useState('')

   const dispatch = useDispatch()

   const hiddenFileInput = useRef(null)

   const redirect = match.url.split(match.params.item)[0].slice(0, -1)

   const mediaUploadPhotoState = useSelector((state) => state.mediaUploadPhoto)
   const { loading, error, photo } = mediaUploadPhotoState

   const mediaGetItemPhotosState = useSelector(
      (state) => state.mediaGetItemPhotos
   )
   const {
      loading: getPhotoLoading,
      error: getPhotoError,
      photoArray: uploadedPhotos,
   } = mediaGetItemPhotosState

   const mediaDeleteItemPhotoState = useSelector(
      (state) => state.mediaDeleteItemPhoto
   )
   const {
      loading: deleteLoading,
      error: deleteError,
      photo: deletePhoto,
   } = mediaDeleteItemPhotoState

   useEffect(() => {
      dispatch({ type: GET_ITEM_PHOTOS_RESET })
   }, [])

   useEffect(() => {
      dispatch(getItemPictures(match.params.item))
   }, [photo, deletePhoto])

   useEffect(() => {
      // console.log(uploadedPhotos)
      setPhotoArray(uploadedPhotos)
      setSelectedPhoto(uploadedPhotos[0])
   }, [uploadedPhotos])

   useEffect(() => {
      setErrorMsg(error || getPhotoError || deleteError)
   }, [error, getPhotoError, deleteError])

   const handleClick = () => {
      hiddenFileInput.current.click()
   }

   const handleAddPhoto = async (e) => {
      // console.log(newImgEl.current)
      const selectedFile = e.target.files[0]
      //   console.log(selectedFile)
      if (!selectedFile) {
         setErrorMsg('No image was selected')
         return
      }

      // const reader = new FileReader()
      // reader.onload = (function(aImg) { return function(e) {
      //     aImg.style.backgroundImage = `url(${e.target.result})`
      // }; })(newImgEl.current);
      // reader.readAsDataURL(selectedFile)

      // fd.append('upload_preset', 'react_upload')
      // fd.append('tags', match.params.item)
      // fd.append('folder', match.params.item)

      dispatch(uploadPicture(selectedFile, match.params.item))
   }

   return getPhotoLoading ? (
      <Spinner animation='border' size='lg' />
   ) : (
      <Col>
         <Row className='justify-content-between align-items-center'>
            <p onClick={(_) => history.push(redirect)} style={styles.back}>
               {'<<< Back'}
            </p>
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
         </Row>
         <Row>
            <Col md={6}>
               <Row>
                  {photoArray.map((photo, i) => (
                     <Col key={photo} xs={4}>
                        <Card>
                           <Image
                              key={i}
                              src={photo}
                              onClick={(_) => setSelectedPhoto(photo)}
                           />
                           <div
                              key={photo}
                              style={styles.pstyle}
                              onClick={(_) =>
                                 dispatch(
                                    deleteItemPhoto(photo, match.params.item)
                                 )
                              }
                           >
                              {deleteLoading ? (
                                 <Spinner animation='border' size='sm' />
                              ) : (
                                 <p style={{ margin: '0px' }}>
                                    <i
                                       className='fas fa-trash-alt'
                                       style={{
                                          color: 'white',
                                       }}
                                    ></i>
                                 </p>
                              )}
                           </div>
                        </Card>
                     </Col>
                  ))}
               </Row>
            </Col>
            <Col md={6}>
               {selectedPhoto ? (
                  <Card>
                     <Image src={selectedPhoto} />
                  </Card>
               ) : (
                  'Second column'
               )}
            </Col>
         </Row>
      </Col>
   )
}

export default Radium(PickupItemPhotos)
