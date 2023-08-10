import { SET_RESTAURANTS } from "../constants/ActionTypes";
const initialState = {
	restaurants:[],
};
const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_RESTAURANTS:
			return {
				...state,
				//counter: state.counter + action.payload
				restaurants: action.payload,
			};
		default:
			return state;
	}
};
export default restaurantReducer;