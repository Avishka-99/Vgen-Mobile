import {SET_OTP_EMAIL, SET_USER, SET_USER_ID, SET_USER_LOCATION, SET_SEARCH_TERM, SET_USER_LANGUAGE, SET_SEARCHED_FOODS, SET_ALL_PRODUCTS, SET_FAV_FOODS,SET_FAV_RESTAURANTS} from '../constants/ActionTypes';
const initialState = {
	user: '',
	otpEmail: '',
	userid: '',
	userLocation: {},
	searchTerm: '',
	userLanguage: 'en',
	searchedFoods: {},
	allProducts: {},
	favFoods: {},
	favRestaurants: {},
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_OTP_EMAIL:
			return {
				...state,
				otpEmail: action.payload,
			};
		case SET_USER_ID:
			return {
				...state,
				userid: action.payload,
			};
		case SET_USER_LOCATION:
			return {
				...state,
				userLocation: action.payload,
			};
		case SET_SEARCH_TERM:
			return {
				...state,
				searchTerm: action.payload,
			};
		case SET_USER_LANGUAGE:
			return {
				...state,
				userLanguage: action.payload,
			};
		case SET_SEARCHED_FOODS:
			return {
				...state,
				searchedFoods: action.payload,
			};
		case SET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.payload,
			};
		case SET_FAV_FOODS:
			return {
				...state,
				favFoods: action.payload,
			};
		case SET_FAV_RESTAURANTS:
			return {
				...state,
				favRestaurants: action.payload,
			};
		default:
			return state;
	}
};
export default userReducer;
