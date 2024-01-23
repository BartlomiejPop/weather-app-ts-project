import { createSlice } from "@reduxjs/toolkit";
import {
	setMainCity,
	fetchMatchingCities,
	getCurrentPosition,
	addCity,
	fetchAddedCities,
} from "./operations";
import Notiflix from "notiflix";

// interface cityOptions {
// 	city: string;
// 	options: string[];
// }

interface cityInformation {
	name: string;
	temperature: number;
	icon: string;
	feelslike: number;
	condition: string;
	humidity: number;
	cloud: number;
	pressure: number;
}

interface cityState {
	addedCities: cityInformation[];
	mainCity: cityInformation | null;
	isModalOpen: boolean;
	isLoading: boolean;
	error: null | string;
	fetchedCities: { city: string; country: string }[] | null;
}

const initialState: cityState = {
	addedCities: [],
	mainCity: null,
	isModalOpen: false,
	isLoading: false,
	error: null,
	fetchedCities: [],
};

export const citySlice = createSlice({
	name: "cities",
	initialState,
	reducers: {
		openModal: (state) => {
			state.isModalOpen = true;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
			state.fetchedCities = [];
		},
		deleteCity: (state, action) => {
			const cityName = action.payload;
			state.addedCities = state.addedCities.filter(
				(city: cityInformation) => city.name !== cityName
			);
			localStorage.setItem(
				"cityInformations",
				JSON.stringify(state.addedCities)
			);
		},
		fetchMainCity: (state) => {
			// const existingInformation = JSON.parse(
			// 	localStorage.getItem("cityInformations") || "[]"
			// );
			// state.addedCities = existingInformation;

			const mainCityInformation = JSON.parse(
				localStorage.getItem("MaincityInformations") || "null"
			);
			state.mainCity = mainCityInformation;
		},
		deleteMainCity: (state, action) => {
			if (action.payload) {
				Notiflix.Notify.success(`removed ${state.mainCity?.name} from main `);
			}
			state.mainCity = null;
			localStorage.removeItem("MaincityInformations");
		},
		deleteResults: (state) => {
			state.fetchedCities = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addCity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addedCities.push(action.payload);
			})
			.addCase(addCity.rejected, (state, action) => {
				state.isLoading = false;
				state.error =
					typeof action.payload === "string" ? action.payload : null;
			})
			.addCase(setMainCity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(setMainCity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.mainCity = action.payload;
			})
			.addCase(setMainCity.rejected, (state, action) => {
				state.isLoading = false;
				state.error =
					typeof action.payload === "string" ? action.payload : null;
			})

			.addCase(fetchMatchingCities.fulfilled, (state, action) => {
				state.fetchedCities = action.payload;
			})

			.addCase(getCurrentPosition.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrentPosition.rejected, (state, action) => {
				state.isLoading = false;
				state.error =
					typeof action.payload === "string" ? action.payload : null;
			})

			.addCase(fetchAddedCities.fulfilled, (state, action) => {
				state.addedCities = action.payload;
				state.isLoading = false;
			})

			.addCase(fetchAddedCities.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAddedCities.rejected, (state, action) => {
				state.isLoading = false;
				state.error =
					typeof action.payload === "string" ? action.payload : null;
			});
	},
});

export const {
	openModal,
	closeModal,
	deleteCity,
	fetchMainCity,
	deleteMainCity,
	deleteResults,
} = citySlice.actions;
export const cityReducer = citySlice.reducer;
