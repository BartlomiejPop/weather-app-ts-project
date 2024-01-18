import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "8bd6b7084a674066b2c180103231804";

export const addCity = createAsyncThunk(
	"addCity",
	async (cityOptions, thunkAPI) => {
		const state = thunkAPI.getState();
		// const cities = state.cities;
		// const existingCity = cities.find(
		// 	(existingCity) => existingCity.name === city.name
		// );

		// if (existingCity) {
		// 	Notiflix.Notify.failure(`${existingCity.name} is already saved`);
		// 	return thunkAPI.rejectWithValue("This city is already saved");
		// }
		try {
			// const response = await axios.get(
			// 	`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
			// );
			// Notiflix.Notify.success("Recipe added");
			// return response.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);
