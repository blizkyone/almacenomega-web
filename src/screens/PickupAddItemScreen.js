import React, { useEffect, useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToOrder } from '../actions/orderActions'
import FormContainer from '../components/FormContainer'
import NewItemDetails from '../components/NewItemFlow/NewItemDetails'
import NewItemPackaging from '../components/NewItemFlow/NewItemPackaging'
// import Message from '../components/Message'
import { ORDER_ADD_ITEM_RESET } from '../constants/orderConstants'
import Message from '../components/Message'

const productDefaultState = {
   barcode: '',
   name: '',
   brand: '',
   condition: '',
   qty: '',
   description: '',
   categories: [],
   width: '',
   height: '',
   length: '',
   weight: '',
}

const productReducer = (state, action) => {
   switch (action.type) {
      case 'SET_VALUES':
         return { ...state, ...action.payload }
      case 'RESET_VALUES':
         return productDefaultState
      case 'SET_WIDTH':
         return { ...state, width: action.payload }
      case 'SET_HEIGHT':
         return { ...state, height: action.payload }
      case 'SET_LENGTH':
         return { ...state, length: action.payload }
      case 'SET_WEIGHT':
         return { ...state, weight: action.payload }
      default:
         return state
   }
}

const AddItemScreen = ({ history, match }) => {
   const [stage, setStage] = useState(0)
   const [productState, productDispatch] = useReducer(
      productReducer,
      productDefaultState
   )

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const orderAddItemState = useSelector((state) => state.orderAddItem)
   const { loading, success, order, error } = orderAddItemState

   const redirect = `${match.url.split(match.params.order)[0]}${
      match.params.order
   }`

   useEffect(() => {
      if (success) {
         dispatch({ type: ORDER_ADD_ITEM_RESET })
         history.push(redirect)
      }
   }, [success, history, match])

   // const handleBarcodeSubmit = (e) => {
   //    e.preventDefault()
   //    alert('Barcode submitted')
   // }

   const createItem = () => {
      // e.preventDefault()
      let order = match.params.order
      dispatch(addItemToOrder({ ...productState, order }))
   }

   const newItemDetailsProps = {
      // handleBarcodeSubmit,
      setStage,
   }

   const NewItemPackagingProps = {
      setStage,
      createItem,
      loading,
      match,
   }

   const router = (stage) => {
      switch (stage) {
         case 0:
            return (
               <NewItemDetails
                  {...newItemDetailsProps}
                  productState={productState}
                  productDispatch={productDispatch}
               />
            )
         case 1:
            return (
               <NewItemPackaging
                  {...NewItemPackagingProps}
                  productState={productState}
                  productDispatch={productDispatch}
               />
            )
         // case 2:
         //    return (
         //       <NewItemConfirm
         //          productState={productState}
         //          productDispatch={productDispatch}/>
         //    )
         default:
            return
      }
   }

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      }
   }, [userInfo])

   return (
      <FormContainer>
         {router(stage)}
         {error && <Message variant='danger'>{error}</Message>}
      </FormContainer>
   )
}

export default AddItemScreen
