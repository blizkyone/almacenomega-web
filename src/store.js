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
}

const middleware = [thunk]

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
