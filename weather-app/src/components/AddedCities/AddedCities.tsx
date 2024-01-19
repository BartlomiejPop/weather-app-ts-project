import "./AddedCities.scss";
import { selectAddedCities } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteCity } from "../../redux/slice";

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

	const handleDelete = (cityName: string) => {
		dispatch(deleteCity(cityName));
	};

	return (
		<div className="added-cities">
			{addedCities.map((city: city, index: number) => (
				<div key={index} className="city-card">
					<button onClick={() => handleDelete(city.name)}>X</button>
					<h2>{city.name}</h2>
					<img src={city.icon}></img>
					<span>Temperature: {city.temperature} C</span>

					<ul>
						{city.cloud !== null && <li>Cloud: {city.cloud}</li>}
						{city.condition !== null && <li>Condition: {city.condition}</li>}
						{city.feelslike !== null && <li>Feelslike: {city.feelslike} C</li>}
						{city.humidity !== null && <li>Humidity: {city.humidity}</li>}
						{city.pressure !== null && <li>Pressure: {city.pressure}</li>}
					</ul>
				</div>
			))}
		</div>
	);
};

export default AddedCities;
