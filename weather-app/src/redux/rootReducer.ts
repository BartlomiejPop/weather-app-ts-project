import { combineReducers } from "@reduxjs/toolkit";
import { cityReducer } from "./slice";

const rootReducer = combineReducers({
	cities: cityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
