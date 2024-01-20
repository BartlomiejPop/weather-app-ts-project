import { MainCity } from "./MainCity/MainCity";
import { AddCity } from "./AddCity/AddCity";
import { AddedCities } from "./AddedCities/AddedCities";
import AddCityModal from "./AddCityModal/AddCityModal";

import { fetchCities } from "../redux/slice";
import { useDispatch } from "react-redux";
// import { fetchCapitals } from "../redux/operations";

import "./App.scss";

export const App = () => {
	const dispatch = useDispatch();
	dispatch(fetchCities());
	// dispatch(fetchCapitals());
	return (
		<div className="project-container">
			<h1 style={{ marginTop: "0px" }}>Weather App</h1>
			<MainCity />
			<AddCity />
			<AddedCities />
			<AddCityModal />
		</div>
	);
};

export default App;
