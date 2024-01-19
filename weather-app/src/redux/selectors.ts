import { RootState } from "./rootReducer";

export const selectIsModalOpen = (state: RootState) => state.cities.isModalOpen;

export const selectAddedCities = (state: RootState) => state.cities.addedCities;
