import React, { useEffect, useState, useReducer } from 'react'
import { useSelector } from 'react-redux'
import SelectLocation from '../components/pickupRequestFlow/SelectLocation.js'
import EditLocation from '../components/pickupRequestFlow/EditLocation.js'
import Handling from '../components/pickupRequestFlow/Handling.js'

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
}

const locationReducer = (state, action) => {
   switch (action.type) {
      case 'SET_VALUES':
         return { ...action.payload }
      case 'SET_HANDLING':
         return { ...state, handling: action.payload }
      case 'RESET_VALUES':
         return locationDefaultState
      default:
         return state
   }
}

const RequestPickupScreen = ({ history }) => {
   const [stage, setStage] = useState(0)
   const [locationState, locationDispatch] = useReducer(
      locationReducer,
      locationDefaultState
   )

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const router = (stage) => {
      switch (stage) {
         case 0:
            return (
               <Handling
                  setStage={setStage}
                  locationDispatch={locationDispatch}
               />
            )
         case 1:
            return (
               <SelectLocation
                  setStage={setStage}
                  locationState={locationState}
                  locationDispatch={locationDispatch}
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

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      }
   }, [userInfo, history])

   return <>{router(stage)}</>
}

export default RequestPickupScreen
