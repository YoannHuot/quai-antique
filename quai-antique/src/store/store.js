import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/reducer";

const persistConfig = {
	key: "root",
	storage,
	stateReconciler: autoMergeLevel1,
};

const rootReducer = combineReducers({ auth: authReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

/**
 * Setup store for Client or Server context.
 *
 */
const makeStore = () => {
	const isServer = typeof window === "undefined";
	const store = createStore(persistedReducer, composeEnhancers());

	if (isServer) {
		return store;
	}

	store.__perisitor = persistStore(store);
	return store;
};

const store = makeStore();

export default store;
