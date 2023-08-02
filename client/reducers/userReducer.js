import {SET_OTP_EMAIL, SET_USER} from '../constants/ActionTypes';

//initializing state
const initialState = {
	user: '',
	otpEmail:'',
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				//counter: state.counter + action.payload
				user: action.payload,
			};
		case SET_OTP_EMAIL:
			return{
				...state,
				otpEmail:action.payload,
			}
		default:
			return state;
	}
};
export default userReducer;
