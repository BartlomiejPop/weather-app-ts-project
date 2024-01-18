import { MainCity } from "./MainCity/MainCity";
import { AddCity } from "./AddCity/AddCity";
import { AddedCities } from "./AddedCities/AddedCities";
import AddCityModal from "./AddCityModal/AddCityModal";

import "./App.scss";

export const App = () => {
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
