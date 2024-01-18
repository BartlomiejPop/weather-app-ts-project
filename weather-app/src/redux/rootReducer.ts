import { combineReducers } from "@reduxjs/toolkit";
import { cityReducer } from "./slice"; // podmień ścieżkę na prawdziwą ścieżkę do pliku z reducerem dla cities

const rootReducer = combineReducers({
	cities: cityReducer,
	// inne reducery
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
