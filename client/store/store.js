//import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import restaurantReducer from '../reducers/restaurantReducer';
import deliveryReducer from '../reducers/deliveryReducer';
//import redButtonReducer from '../reducers/redButtonReducer';
const rootReducer = combineReducers({
    userReducer,
    restaurantReducer,
    deliveryReducer
});
// Passing counterReducer to createStore
const store = configureStore({
    reducer: rootReducer,
})
console.log(store.getState())
export default store; 