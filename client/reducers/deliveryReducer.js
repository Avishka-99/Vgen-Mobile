import { SET_RIDER_LOCATION } from "../constants/ActionTypes";
const initialState = {
	location:{},
};
const deliveryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_RIDER_LOCATION:
			return {
				...state,
				//counter: state.counter + action.payload
				location: action.payload,
			};
		default:
			return state;
	}
};
export default deliveryReducer;