import { createSlice } from "@reduxjs/toolkit";

interface CityState {
	cities: string[];
	isModalOpen: boolean;
}

const initialState: CityState = {
	cities: [],
	isModalOpen: false,
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
		},
	},
});

export const { openModal, closeModal } = citySlice.actions;
export const cityReducer = citySlice.reducer;
