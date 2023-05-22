import {
	UPDATE_LOGGED,
	UPDATE_TOKEN,
	CHECK_VALIDATION,
	RESET_STORE,
} from "./actions";
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
				name: action.name,
				firstname: action.firstname,
				allergies: action.allergies,
				isAdmin: action.isAdmin,
			};

		case RESET_STORE:
			return initialState;

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
