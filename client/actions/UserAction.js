import { SET_USER } from '../constants/counterActionTypes.js';
export const setUserAction = (parameter) => {
    return {
        type: SET_USER,
        payload: parameter
    }
}
export const decrementCounterAction = () => {
    return {
        type: DECREMENT_COUNTER
    }
}