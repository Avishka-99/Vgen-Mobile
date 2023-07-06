import { SET_USER } from '../constants/counterActionTypes';

//initializing state
const initialState = {
    user: ''
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER: return {
            
            ...state,
            //counter: state.counter + action.payload
            user: action.payload
        }
        default: return state
    }
}
export default userReducer;