import React, { useEffect, useState, useReducer } from 'react'
import { useSelector } from 'react-redux'
import SelectLocation from '../components/deliveryRequestFlow/SelectLocation.js'
import EditLocation from '../components/deliveryRequestFlow/EditLocation.js'
import ItemSelection from '../components/deliveryRequestFlow/ItemSelection.js'

const locationDefaultState = {
   mapCenter: {
      lat: 20.9670154,
      lng: -89.6242833,
   },
   name: '',
   address: '',
   locationCoordinates: {},
   handling: 'Ligero',
   comments: '',
   person: '',
   phone: '',
   orderItems: [],
}

const locationReducer = (state, action) => {
   switch (action.type) {
      case 'SET_VALUES':
         return { ...action.payload }
      case 'RESET_VALUES':
         return locationDefaultState
      case 'SET_ORDER_ITEMS':
         const { items, handling } = action.payload
         return { ...state, orderItems: items, handling }
      default:
         return state
   }
}

const RequestDeliveryScreen = ({ history }) => {
   const [stage, setStage] = useState(0)
   const [locationState, locationDispatch] = useReducer(
      locationReducer,
      locationDefaultState
   )

   const { products } = history.location.state

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const router = (stage) => {
      switch (stage) {
         case 0:
            return (
               <ItemSelection
                  products={products}
                  setStage={setStage}
                  locationDispatch={locationDispatch}
               />
            )
         case 1:
            return (
               <SelectLocation
                  setStage={setStage}
                  locationDispatch={locationDispatch}
                  locationState={locationState}
               />
            )
         case 2:
            return (
               <EditLocation
                  locationState={locationState}
                  locationReducer={locationReducer}
                  setStage={setStage}
                  history={history}
               />
            )
         default:
            return
      }
   }

   // useEffect(() => {
   //    console.log(products)
   // }, [history])

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      }
   }, [userInfo, history])

   return <>{router(stage)}</>
}

export default RequestDeliveryScreen
