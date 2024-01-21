import "./AddedCities.scss";
import swap from "../../icons/swap.svg";
import xmark from "../../icons/xmark.svg";
import Notiflix from "notiflix";
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

	const handleDelete = (cityName: string) => {
		dispatch(deleteCity(cityName));
		Notiflix.Notify.success(`${cityName} deleted`);
	};

	const handleSwap = (city: city) => {
		const validateKeys = (cityObject: city) => {
			const allKeys = Object.keys(cityObject);
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

		const cityValidKeys = validateKeys(city);

		const cityOptions = {
			city: city.name,
			options: cityValidKeys,
		};

		const cityName = city.name;

		convertOptionsNamesAndSend(cityOptions);

		dispatch(setMainCity(cityOptions));
		dispatch(deleteCity(cityName));

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
			{addedCities.map((city: city, index: number) => (
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
									{city.pressure}%
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
