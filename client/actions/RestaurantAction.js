import { SET_RESTAURANTS } from "../constants/ActionTypes"
export const setRestaurantAction =(parmeter)=>{
    return {
			type: SET_RESTAURANTS,
			payload:parmeter,
		};
    
}