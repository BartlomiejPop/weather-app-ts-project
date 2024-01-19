import { MainCity } from "./MainCity/MainCity";
import { AddCity } from "./AddCity/AddCity";
import { AddedCities } from "./AddedCities/AddedCities";
import AddCityModal from "./AddCityModal/AddCityModal";

import { fetchCities } from "../redux/slice";
import { useDispatch } from "react-redux";

import "./App.scss";

export const App = () => {
	const dispatch = useDispatch();
	dispatch(fetchCities());
	return (
		<div className="project-container">
			<MainCity />
			<AddCity />
			<AddedCities />
			<AddCityModal />
		</div>
	);
};

export default App;
