import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "8bd6b7084a674066b2c180103231804";

interface cityOptions {
	city: string;
	options: string[];
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

export const selectMainCity = createAsyncThunk(
	"selectMainCity",
	async (cityOptions: cityOptions, thunkAPI) => {
		const city = cityOptions.city;
		const options = cityOptions.options;
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
			);

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
			localStorage.setItem("MaincityInformations", JSON.stringify(information));
			Notiflix.Notify.success(`Set ${city} as main city`);
			return information;
		} catch (e: any) {
			Notiflix.Notify.failure("Bad input");
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export default selectMainCity;
