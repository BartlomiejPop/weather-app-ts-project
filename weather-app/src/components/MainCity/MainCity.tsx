import { useDispatch, useSelector } from "react-redux";
import { selectMainCity } from "../../redux/selectors";

import "./MainCity.scss";
import { openModal, deleteMainCity } from "../../redux/slice";

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

export const MainCity = () => {
	const dispatch = useDispatch();
	const mainCity = useSelector(selectMainCity) as cityInformation | null;
	const isMainCitySet = Boolean(mainCity);
	console.log(mainCity);

	const handleDeleteMainCity = () => {
		dispatch(deleteMainCity());
	};

	const handleSelect = () => {
		dispatch(openModal());
	};

	return (
		<div className="main-city">
			{!isMainCitySet ? (
				<div className="selectBox">
					<h1 className="selectBox__title">Main city</h1>
					<div className="selectBox-options">
						<button className="selectBox-options__localize-btn">
							localize me
						</button>
						<button
							className="selectBox-options__select-btn"
							onClick={handleSelect}>
							select
						</button>
					</div>
				</div>
			) : (
				<div>
					<button onClick={handleDeleteMainCity}>X</button>
					<div>
						<h1>{mainCity!.name}</h1>
						<img src={mainCity!.icon}></img>
					</div>
					<ul>
						{mainCity?.temperature && (
							<li>Temperature: {mainCity?.temperature} C</li>
						)}
						{mainCity?.cloud && <li>Cloud: {mainCity?.cloud}</li>}
						{mainCity?.condition && <li>Condition: {mainCity?.condition}</li>}
						{mainCity?.feelslike && <li>Feelslike: {mainCity?.feelslike}</li>}
						{mainCity?.pressure && <li>Pressure: {mainCity?.pressure}</li>}
						{mainCity?.humidity && <li>Humidity: {mainCity?.humidity}</li>}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MainCity;
