import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
   productListReducer,
   productDetailsReducer,
   productDeleteReducer,
   productCreateReducer,
   productUpdateReducer,
} from './reducers/productReducers'
import {
   userLoginReducer,
   userLogoutReducer,
   userRegisterReducer,
   userDetailsReducer,
   userUpdateProfileReducer,
   userListReducer,
   userDeleteReducer,
   userUpdateReducer,
   usernameValidationReducer,
} from './reducers/userReducers'
import {
   placeAutocompleteReducer,
   locationAddressReducer,
   requestPickupReducer,
   pickupHistoryReducer,
   pickupTrackingReducer,
   pickupRequestsReducer,
} from './reducers/placesReducers'
import {
   getMyRouteReducer,
   deleteMyRouteReducer,
   createMyRouteReducer,
} from './reducers/routesReducers'

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
   productDelete: productDeleteReducer,
   productCreate: productCreateReducer,
   productUpdate: productUpdateReducer,
   userLogin: userLoginReducer,
   userLogout: userLogoutReducer,
   userRegister: userRegisterReducer,
   usernameValidation: usernameValidationReducer,
   userDetails: userDetailsReducer,
   userUpdateProfile: userUpdateProfileReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,
   userUpdate: userUpdateReducer,
   placeAutocomplete: placeAutocompleteReducer,
   placeAddress: locationAddressReducer,
   pickupRequest: requestPickupReducer,
   pickupHistory: pickupHistoryReducer,
   pickupTracking: pickupTrackingReducer,
   pickupRequests: pickupRequestsReducer,
   myRoute: getMyRouteReducer,
   createMyRoute: createMyRouteReducer,
   deleteMyRoute: deleteMyRouteReducer,
})

const inventoryFromStorage = localStorage.getItem('inventory')
   ? JSON.parse(localStorage.getItem('inventory'))
   : []

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const initialState = {
   productList: inventoryFromStorage,
   userLogin: { userInfo: userInfoFromStorage },
   // placeCoordinates: { coordinates: { lat: 20.9670154, lng: -89.6242833 } },
}

const middleware = [thunk]

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
