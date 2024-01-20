import "./AddedCities.scss";
import { selectAddedCities, selectMainCity } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteCity, addCity } from "../../redux/slice";
import { setMainCity } from "../../redux/operations";

interface cityOptions {
	city: string;
	options: string[];
}

interface city {
	name: string;
	temperature: number;
	icon: string;
	cloud: string | null;
	condition: string | null;
	feelslike: number | null;
	humidity: number | null;
	pressure: number | null;
}

export const AddedCities = () => {
	const dispatch = useDispatch();
	const addedCities = useSelector(selectAddedCities);
	const mainCity = useSelector(selectMainCity);
	// const previousMainCity = useSelector(setMainCity);

	const handleDelete = (cityName: string) => {
		dispatch(deleteCity(cityName));
	};

	const handleSwap = (city: city) => {
		console.log(city.name);
		const allKeys = Object.keys(city);
		const validKeys = allKeys.filter(
			(key) =>
				city[key] !== null &&
				key !== "name" &&
				key !== "icon" &&
				key !== "temperature"
		);
		const cityOptions = {
			city: city.name,
			options: validKeys,
		};
		if (cityOptions.options.includes("condition")) {
			const conditionIndex = cityOptions.options.indexOf("condition");
			cityOptions.options.splice(conditionIndex, 1, "condition.text");
		}
		if (cityOptions.options.includes("feelslike")) {
			const conditionIndex = cityOptions.options.indexOf("feelslike");
			cityOptions.options.splice(conditionIndex, 1, "feelslike_c");
		}
		if (cityOptions.options.includes("pressure")) {
			const conditionIndex = cityOptions.options.indexOf("pressure");
			cityOptions.options.splice(conditionIndex, 1, "pressure_mb");
		}

		// console.log(cityOptions);
		// console.log(mainCity);
		dispatch(setMainCity(cityOptions));
		const cityName = city.name;
		dispatch(deleteCity(cityName));
		const prevMainCityAllKeys = Object.keys(mainCity);
		const prevMainCityValidKeys = prevMainCityAllKeys.filter(
			(key) =>
				mainCity[key] !== null &&
				key !== "name" &&
				key !== "icon" &&
				key !== "temperature"
		);
		const prevMainCityOptions = {
			city: mainCity.name,
			options: prevMainCityValidKeys,
		};

		if (prevMainCityOptions.options.includes("condition")) {
			const conditionIndex = prevMainCityOptions.options.indexOf("condition");
			prevMainCityOptions.options.splice(conditionIndex, 1, "condition.text");
		}
		if (prevMainCityOptions.options.includes("feelslike")) {
			const conditionIndex = prevMainCityOptions.options.indexOf("feelslike");
			prevMainCityOptions.options.splice(conditionIndex, 1, "feelslike_c");
		}
		if (prevMainCityOptions.options.includes("pressure")) {
			const conditionIndex = prevMainCityOptions.options.indexOf("pressure");
			prevMainCityOptions.options.splice(conditionIndex, 1, "pressure_mb");
		}
		// console.log(prevMainCityOptions);
		dispatch(addCity(prevMainCityOptions));
	};

	return (
		<div className="added-cities">
			{addedCities.map((city: city, index: number) => (
				<div key={index} className="city-card">
					<button
						className="city-card__swap-btn"
						onClick={() => handleSwap(city)}>
						o
					</button>
					<button
						className="city-card__btn"
						onClick={() => handleDelete(city.name)}>
						X
					</button>
					<h2>{city.name}</h2>
					<img src={city.icon}></img>
					<span className="detailed-informations__item">Temperature:</span>
					<span className="detailed-informations__item--value">
						{city.temperature} C
					</span>

					<ul className="detailed-informations">
						{city.cloud !== null && (
							<li className="detailed-informations__item">
								<span>Cloud:</span>
								<span className="detailed-informations__item--value">
									{city.cloud}%
								</span>
							</li>
						)}
						{city.condition !== null && (
							<li className="detailed-informations__item">
								<span>Condition:</span>
								<span className="detailed-informations__item--value">
									{city.condition}
								</span>
							</li>
						)}
						{city.feelslike !== null && (
							<li className="detailed-informations__item">
								<span>Feelslike:</span>
								<span className="detailed-informations__item--value">
									{city.feelslike} C
								</span>
							</li>
						)}
						{city.humidity !== null && (
							<li className="detailed-informations__item">
								<span>Humidity:</span>
								<span className="detailed-informations__item--value">
									{city.humidity}%
								</span>
							</li>
						)}
						{city.pressure !== null && (
							<li className="detailed-informations__item">
								<span>Pressure:</span>
								<span className="detailed-informations__item--value">
									{city.pressure}
								</span>
							</li>
						)}
					</ul>
				</div>
			))}
		</div>
	);
};

export default AddedCities;
