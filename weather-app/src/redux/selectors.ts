import { RootState } from "./rootReducer";

export const selectIsModalOpen = (state: RootState) => state.cities.isModalOpen;

export const selectAddedCities = (state: RootState) => state.cities.addedCities;

export const selectMainCity = (state: RootState) => state.cities.mainCity;

export const selectFetchedCities = (state: RootState) =>
	state.cities.fetchedCities;
