import { INCREMENT_REDBUTTON } from "../constants/counterActionTypes";
const initialState = {
    counterRed: 23
}
const redButtonReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_REDBUTTON: return {
            ...state,
            //counter: state.counter + action.payload
            counterRed: state.counterRed + action.payload
        }
        default: return state
    }
}
export default redButtonReducer;