import { SET_RESTAURANTS,SET_FETCHED_PRODUCTS,SET_MODAL_DETAILS } from "../constants/ActionTypes";
const initialState = {
	restaurants:[],
    products:[],
    modalDetails:[],
};
const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_RESTAURANTS:
			return {
				...state,
				//counter: state.counter + action.payload
				restaurants: action.payload,
			};
        case SET_FETCHED_PRODUCTS:
            return{
                ...state,
                products:action.payload,
            }
        case SET_MODAL_DETAILS:
            return{
                ...state,
                modalDetails:action.payload
            }
		default:
			return state;
	}
};
export default restaurantReducer;