import {SET_RESTAURANTS, SET_FETCHED_PRODUCTS, SET_MODAL_DETAILS} from '../constants/ActionTypes';
export const setRestaurantAction = (parmeter) => {
	return {
		type: SET_RESTAURANTS,
		payload: parmeter,
	};
};
export const setFetchedProducts = (parameter) => {
	return {
		type: SET_FETCHED_PRODUCTS,
		payload: parameter,
	};
};
export const setModalDetails =(parameter)=>{
	return{
		type:SET_MODAL_DETAILS,
		payload:parameter,
	}
}
