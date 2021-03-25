import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
   productListReducer,
   productDetailsReducer,
} from './reducers/productReducers'

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
})

const inventoryFromStorage = localStorage.getItem('inventory')
   ? JSON.parse(localStorage.getItem('inventory'))
   : []

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const initialState = {
   inventory: inventoryFromStorage,
   userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
