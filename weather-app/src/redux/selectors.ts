import { RootState } from "./rootReducer";

export const selectIsModalOpen = (state: RootState) => state.cities.isModalOpen;
