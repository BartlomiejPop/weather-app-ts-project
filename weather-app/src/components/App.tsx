import { MainCity } from "./MainCity/MainCity";
import { AddCity } from "./AddCity/AddCity";
import { AddedCities } from "./AddedCities/AddedCities";
import AddCityModal from "./AddCityModal/AddCityModal";
import Loader from "./Loader/Loader";
import { selectIsLoading } from "../redux/selectors";

// import { fetchCities } from "../redux/slice";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./App.scss";

export const App = () => {
	// const dispatch = useDispatch();
	// dispatch(fetchCities());
	const isLoading = useSelector(selectIsLoading);

	return (
		<div className="project-container">
			<h1
				style={{
					marginTop: "50px",
					fontFamily: "'Dancing Script',cursive",
					textAlign: "center",
				}}>
				Weather App
			</h1>
			<MainCity />
			<AddCity />
			<AddedCities />
			<AddCityModal />
			{isLoading && <Loader />}
		</div>
	);
};

export default App;
