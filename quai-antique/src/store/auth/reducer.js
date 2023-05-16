import { UPDATE_LOGGED, UPDATE_TOKEN, CHECK_VALIDATION } from "./actions";
import { initialState } from "./state";

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_LOGGED:
			return {
				...state,
				logged: action.logged,
			};
		case UPDATE_TOKEN:
			return {
				...state,
				logged: action.logged,
				jwt: action.jwt,
			};
		case CHECK_VALIDATION:
			return {
				...state,
				firstname: action.firstname,
				name: action.name,
			};
		default:
			return state;
	}
}
