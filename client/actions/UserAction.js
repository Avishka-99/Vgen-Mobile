import {SET_OTP_EMAIL, SET_USER, SET_USER_ID, SET_USER_LOCATION, SET_SEARCH_TERM, SET_USER_LANGUAGE} from '../constants/ActionTypes.js';
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
export const setUserLocation = (parameter) => {
	return {
		type: SET_USER_LOCATION,
		payload: parameter,
	};
};
export const setSearchTerm = (parameter) => {
	return {
		type: SET_SEARCH_TERM,
		payload: parameter,
	};
};
export const setUserLanguage = (parameter) => {
	return {
		type: SET_USER_LANGUAGE,
		payload: parameter,
	};
};
