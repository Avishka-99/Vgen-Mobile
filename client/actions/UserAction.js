import {SET_OTP_EMAIL, SET_USER, SET_USER_ID, SET_USER_LOCATION, SET_SEARCH_TERM, SET_USER_LANGUAGE, SET_SEARCHED_FOODS, SET_ALL_PRODUCTS, SET_FAV_RESTAURANTS, SET_FAV_FOODS, SET_USER_COMMUNITIES, SET_COMMUNITIES} from '../constants/ActionTypes.js';
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
export const setSearchedFoods = (parameter) => {
	return {
		type: SET_SEARCHED_FOODS,
		payload: parameter,
	};
};
export const setAllProducts = (parameter) => {
	return {
		type: SET_ALL_PRODUCTS,
		payload: parameter,
	};
};
export const setFavFoods = (parameter) => {
	return {
		type: SET_FAV_FOODS,
		payload: parameter,
	};
};
export const setFavRestaurants = (parameter) => {
	return {
		type: SET_FAV_RESTAURANTS,
		payload: parameter,
	};
};
export const setUserCommunities = (parameter) => {
	return {
		type: SET_USER_COMMUNITIES,
		payload: parameter,
	};
};
export const setCommunities = (parameter) => {
	return {
		type: SET_COMMUNITIES,
		payload: parameter,
	};
};

