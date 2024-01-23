import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "8bd6b7084a674066b2c180103231804";
const OpenCageDataApiKey = "946f6e10934f4a90b7031850401efb91";

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

interface cityState {
	cities: {
		addedCities: cityInformation[];
		mainCity: cityInformation | null;
		isModalOpen: boolean;
		isLoading: boolean;
		error: null | { message: string };
		fetchedCities: { city: string; country: string }[] | null;
	};
}

interface Position {
	coords: {
		latitude: number;
		longitude: number;
	};
}

export const setMainCity = createAsyncThunk(
	"setMainCity",
	async (cityOptions: cityOptions, thunkAPI) => {
		const city = cityOptions.city
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		const options = cityOptions.options;

		const state = thunkAPI.getState() as cityState;
		const addedCities = state.cities.addedCities;
		const existingCity = addedCities.find(
			(existingCity: cityInformation) => existingCity.name === city
		);

		if (existingCity) {
			Notiflix.Notify.failure(`${city} is already in your list`);
			return thunkAPI.rejectWithValue("This city is already in list");
		}
		try {
			const response = await axios.get(
				`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
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

			return information;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const addCity = createAsyncThunk(
	"addCity",
	async (cityOptions: cityOptions, thunkAPI) => {
		const city = cityOptions.city
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		const options = cityOptions.options;

		const state = thunkAPI.getState() as cityState;
		const mainCity =
			state.cities.mainCity?.name.toLowerCase() === city.toLowerCase();
		const addedCities = state.cities.addedCities;
		const existingCity = addedCities.find(
			(existingCity: cityInformation) =>
				existingCity.name.toLowerCase() === city.toLowerCase()
		);

		if (existingCity || mainCity) {
			Notiflix.Notify.failure(`${city} is already in your list`);
			return thunkAPI.rejectWithValue("This city is already in list");
		}

		try {
			const response = await axios.get(
				`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
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
			const existingInformation = JSON.parse(
				localStorage.getItem("cityInformations") || "[]"
			);
			existingInformation.push(information);
			localStorage.setItem(
				"cityInformations",
				JSON.stringify(existingInformation)
			);
			return information;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const fetchMatchingCities = createAsyncThunk(
	"fetchMatchingCities",
	async (value: string, thunkAPI) => {
		const parsedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		try {
			const response = await axios.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${parsedValue}&key=${OpenCageDataApiKey}&language=pl&pretty=1`
			);

			const resultObjects = response.data.results;
			const arrayOfNeededObjects = [];
			for (let i = 0; i < Math.min(8, resultObjects.length); i++) {
				const currentObject = resultObjects[i];
				if (currentObject.components.city) {
					arrayOfNeededObjects.push({
						city: currentObject.components.city,
						country: currentObject.components.country,
					});
				}
			}
			return arrayOfNeededObjects;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const fetchAddedCities = createAsyncThunk(
	"fetchAddedCities",
	async (_, thunkAPI) => {
		const savedCities = JSON.parse(
			localStorage.getItem("cityInformations") || "[]"
		);
		try {
			const savedCitiesInformations = await Promise.all(
				savedCities.map(async (city: cityInformation) => {
					try {
						const response = await axios.get(
							`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.name}&aqi=yes`
						);

						const information: cityInformation = {
							name: response.data.location.name,
							temperature: response.data.current.temp_c,
							icon: response.data.current.condition.icon,
							feelslike:
								city.feelslike !== null
									? response.data.current.feelslike_c
									: null,
							condition:
								city.condition !== null
									? response.data.current.condition.text
									: null,
							humidity:
								city.humidity !== null ? response.data.current.humidity : null,
							cloud: city.cloud !== null ? response.data.current.cloud : null,
							pressure:
								city.pressure !== null
									? response.data.current.pressure_mb
									: null,
						};

						return information;
					} catch (error) {
						console.error(`Error fetching data for ${city.name}:`, error);
						return null;
					}
				})
			);

			console.log(savedCitiesInformations);
			return savedCitiesInformations;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const getCurrentPosition = createAsyncThunk(
	"getCurrentPosition",
	async (_, thunkAPI) => {
		try {
			const position: Position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OpenCageDataApiKey}&language=pl&pretty=1`;

			const response = await axios.get(url);
			console.log(response.data.results[0].components.village);
			if (
				!response.data.results[0].components.city &&
				!response.data.results[0].components.village
			) {
				return thunkAPI.rejectWithValue("not found");
			}
			const currentCity =
				response.data.results[0].components.city ||
				response.data.results[0].components.village;
			console.log(currentCity);
			const cityObject = {
				city: currentCity,
				options: [
					"feelslike_c",
					"condition.text",
					"humidity",
					"pressure_mb",
					"cloud",
				],
			};

			return cityObject;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export default {
	fetchAddedCities,
	setMainCity,
	fetchMatchingCities,
	getCurrentPosition,
	addCity,
};
