import { useEffect } from "react";

import { selectAddedCities, selectMainCity } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteCity, deleteMainCity } from "../../redux/slice";
import { setMainCity, addCity, fetchAddedCities } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";

import "./AddedCities.scss";
import Notiflix from "notiflix";
import swap from "../../icons/swap.svg";
import xmark from "../../icons/xmark.svg";

interface cityOptions {
	city: string;
	options: string[];
}

interface city {
	name: string;
	temperature: number;
	icon: string;
	cloud: number | null;
	condition: string | null;
	feelslike: number | null;
	humidity: number | null;
	pressure: number | null;
}

export const AddedCities = () => {
	const dispatch = useDispatch<AppDispatch>();
	const mainCity = useSelector(selectMainCity);
	const addedCities = useSelector(selectAddedCities);

	useEffect(() => {
		if (localStorage.getItem("cityInformations") !== "[]") {
			dispatch(fetchAddedCities());
		}
	}, []);

	const validateKeys = (cityObject: city) => {
		const allKeys = Object.keys(cityObject) as (keyof city)[];
		const validKeys = allKeys.filter(
			(key) =>
				cityObject[key] !== null &&
				key !== "name" &&
				key !== "icon" &&
				key !== "temperature"
		);
		return validKeys;
	};

	const convertOptionsNamesAndSend = (cityObject: cityOptions) => {
		if (cityObject.options.includes("condition")) {
			const conditionIndex = cityObject.options.indexOf("condition");
			cityObject.options.splice(conditionIndex, 1, "condition.text");
		}
		if (cityObject.options.includes("feelslike")) {
			const conditionIndex = cityObject.options.indexOf("feelslike");
			cityObject.options.splice(conditionIndex, 1, "feelslike_c");
		}
		if (cityObject.options.includes("pressure")) {
			const conditionIndex = cityObject.options.indexOf("pressure");
			cityObject.options.splice(conditionIndex, 1, "pressure_mb");
		}
	};

	const handleDelete = (cityName: string) => {
		dispatch(deleteCity(cityName));
		Notiflix.Notify.success(`${cityName} deleted`);
	};

	const handleSwap = (city: city) => {
		const cityValidKeys = validateKeys(city);

		const cityOptions = {
			city: city.name,
			options: cityValidKeys,
		};

		const cityName = city.name;

		convertOptionsNamesAndSend(cityOptions);

		dispatch(deleteCity(cityName));
		dispatch(deleteMainCity(false));
		dispatch(setMainCity(cityOptions));

		if (mainCity !== null) {
			const prevMainCityValidKeys = validateKeys(mainCity);
			const prevMainCityOptions = {
				city: mainCity.name,
				options: prevMainCityValidKeys,
			};
			convertOptionsNamesAndSend(prevMainCityOptions);
			dispatch(addCity(prevMainCityOptions));
		}
		Notiflix.Notify.success(`${city.name} is now set as main city`);
	};

	return (
		<div className="added-cities">
			{addedCities.map((city, index: number) => (
				<div key={index} className="city-card">
					<div className="options">
						<button className="options__btn" onClick={() => handleSwap(city)}>
							<img className="options__btn--icon" src={swap} />
						</button>
						<button
							className="options__btn"
							onClick={() => handleDelete(city.name)}>
							<img className="options__btn--icon" src={xmark} />
						</button>
					</div>
					<span>{city.name}</span>
					<img src={city.icon}></img>
					<span className="detailed-informations__item">Temperature:</span>
					<span className="detailed-informations__item--value">
						{city.temperature} °C
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
									{city.feelslike} °C
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
									{city.pressure}hPa
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
