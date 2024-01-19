import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { addCity } from "./operations";
import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "8bd6b7084a674066b2c180103231804";

interface cityOptions {
	city: string;
	options: string[];
}

interface CityState {
	cities: string[];
	isModalOpen: boolean;
	isLoading: boolean;
	error: null | string;
	data: {};
}

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

const initialState = {
	addedCities: [],
	isModalOpen: false,
	isLoading: false,
	error: null,
	data: {},
};

const handlePending = (state: CityState) => {
	state.isLoading = true;
};

const handleRejected = (state: CityState, action: any) => {
	state.isLoading = false;
	state.error = action.payload;
};

export const addCity = createAsyncThunk(
	"addCity",
	async (cityOptions: cityOptions, thunkAPI) => {
		const city = cityOptions.city;
		const options = cityOptions.options;
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
			);

			Notiflix.Notify.success(`Added ${city}`);
			const information: cityInformation = {
				name: response.data.location.name,
				temperature: response.data.current.temp_c,
				icon: response.data.current.condition.icon,
				feelslike: options.includes("feelslike_c")
					? response.data.current.feelslike_c
					: null,
				condition: options.includes("condition.text")
					? response.data.current.condition.text
					: null,
				humidity: options.includes("humidity")
					? response.data.current.humidity
					: null,
				cloud: options.includes("cloud") ? response.data.current.cloud : null,
				pressure: options.includes("pressure_mb")
					? response.data.current.pressure_mb
					: null,
			};

			return information;
		} catch (e: any) {
			Notiflix.Notify.failure("Bad input");
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const citySlice = createSlice({
	name: "cities",
	initialState,
	reducers: {
		openModal: (state) => {
			state.isModalOpen = true;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
		},
		deleteCity: (state, action) => {
			const cityName = action.payload;
			state.addedCities = state.addedCities.filter(
				(city: cityInformation) => city.name !== cityName
			);
			Notiflix.Notify.success(`${cityName} deleted`);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCity.pending, () => {
				handlePending;
			})
			.addCase(addCity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addedCities.push(action.payload);
			})
			.addCase(addCity.rejected, () => {
				handleRejected;
			});
	},
	// 	[addCity.pending]: handlePending,
	// 	[addCity.fulfilled](state:any, action:any) {
	// 		state.push(action.payload)
	// 		state.isLoading = false;
	// 		state.error = null;
	// 	},
	// 	[addCity.rejected]: handleRejected,
	// }
});

export const { openModal, closeModal, deleteCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
