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
   requestDeliveryReducer,
   requestPickupReducer,
   pickupHistoryReducer,
   orderTrackingReducer,
   pickupRequestsReducer,
   deliveryHistoryReducer,
} from './reducers/placesReducers'
import {
   getMyRouteReducer,
   routesDeleteMyRouteReducer,
   createMyRouteReducer,
   routesGetActiveReducer,
   routesGetRouteItemsReducer,
   routeFinishReducer,
} from './reducers/routesReducers'
import {
   orderDetailsReducer,
   orderAddItemReducer,
   orderDeleteItemReducer,
   orderDeliverReducer,
} from './reducers/orderReducers'
import {
   mediaUploadPhotoReducer,
   mediaGetItemPhotosReducer,
   mediaDeleteItemPhotoReducer,
} from './reducers/mediaReducers'

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
   deliveryRequest: requestDeliveryReducer,
   deliveryHistory: deliveryHistoryReducer,
   pickupRequest: requestPickupReducer,
   pickupRequests: pickupRequestsReducer,
   pickupHistory: pickupHistoryReducer,
   orderTracking: orderTrackingReducer,
   orderDetails: orderDetailsReducer,
   orderAddItem: orderAddItemReducer,
   orderDeleteItem: orderDeleteItemReducer,
   orderDeliver: orderDeliverReducer,
   mediaUploadPhoto: mediaUploadPhotoReducer,
   mediaGetItemPhotos: mediaGetItemPhotosReducer,
   mediaDeleteItemPhoto: mediaDeleteItemPhotoReducer,
   myRoute: getMyRouteReducer,
   createMyRoute: createMyRouteReducer,
   deleteMyRoute: routesDeleteMyRouteReducer,
   routesGetActive: routesGetActiveReducer,
   routeGetRouteItems: routesGetRouteItemsReducer,
   routeFinish: routeFinishReducer,
})

// const inventoryFromStorage = localStorage.getItem('inventory')
//    ? JSON.parse(localStorage.getItem('inventory'))
//    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const initialState = {
   // productList: inventoryFromStorage,
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
