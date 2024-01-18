import { configureStore } from "@reduxjs/toolkit";
import { cityReducer } from "./slice.ts";

export const store = configureStore({
	reducer: {
		cities: cityReducer,
	},
});

export default store;
