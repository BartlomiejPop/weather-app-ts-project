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

const initialState = {
	cities: [],
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
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
			);
			Notiflix.Notify.success("Added");
			return response.data;
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCity.pending, () => {
				handlePending;
			})
			.addCase(addCity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
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

export const { openModal, closeModal } = citySlice.actions;
export const cityReducer = citySlice.reducer;
