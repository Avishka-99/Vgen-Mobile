import {SET_OTP_EMAIL, SET_USER,SET_USER_ID,SET_USER_LOCATION} from '../constants/ActionTypes';

//initializing state
const initialState = {
	user: '',
	otpEmail:'',
	userid:'',
	userLocation:{},
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
			};
		case SET_USER_ID:
			return {
				...state,
				userid: action.payload,
			};
		case SET_USER_LOCATION:
			return{
				...state,
				userLocation:action.payload,
			}
		default:
			return state;
	}
};
export default userReducer;
