//import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import counterReducer from '../reducers/counterReducer';
import redButtonReducer from '../reducers/redButtonReducer';
//import redButtonReducer from '../reducers/redButtonReducer';
const rootReducer = combineReducers({
    counterReducer, redButtonReducer
});
// Passing counterReducer to createStore
const store = configureStore({
    reducer: rootReducer,
})
console.log(store.getState())
export default store; 