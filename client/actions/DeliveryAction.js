import { SET_RIDER_LOCATION } from "../constants/ActionTypes";
export const setRiderLocation = (parmeter) => {
	return {
		type: SET_RIDER_LOCATION,
		payload: parmeter,
	};
};