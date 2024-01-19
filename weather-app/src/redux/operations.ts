import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "8bd6b7084a674066b2c180103231804";

interface cityOptions {
	city: string;
	options: string[];
}

export const addCity = createAsyncThunk(
	"addCity",
	async (cityOptions: cityOptions, thunkAPI) => {
		const city = cityOptions.city;
		// try {
		const response = await axios.get(
			`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
		);
		Notiflix.Notify.success("Added");
		return response.data;
		// const response = await axios.get(
		// 	`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
		// );
		// Notiflix.Notify.success("Recipe added");
		// return response.data;
		// } catch (e: any) {
		// 	return thunkAPI.rejectWithValue(e.message);
		// }
	}
);
