import { createStore } from 'redux';
import counterReducer from './reducers/counterReducer';

// Passing counterReducer to createStore
const store = createStore(counterReducer);
export default store; 