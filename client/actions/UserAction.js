import {SET_OTP_EMAIL, SET_USER, SET_USER_ID} from '../constants/ActionTypes.js';
export const setUserAction = (parameter) => {
	return {
		type: SET_USER,
		payload: parameter,
	};
};
export const setOtpEmail = (parameter) => {
	return {
		type: SET_OTP_EMAIL,
		payload: parameter,
	};
};
export const setUserId = (parameter) => {
	return {
		type: SET_USER_ID,
		payload: parameter,
	};
};
