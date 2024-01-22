import { useDispatch, useSelector } from "react-redux";
import { selectMainCity } from "../../redux/selectors";
import xmark from "../../icons/xmark.svg";
import location from "../../icons/location.svg";

import "./MainCity.scss";
import { openModal, deleteMainCity } from "../../redux/slice";
import Notiflix from "notiflix";
import { getCurrentPosition, setMainCity } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";

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
	const dispatch = useDispatch<AppDispatch>();
	const mainCity = useSelector(selectMainCity) as cityInformation | null;
	const isMainCitySet = Boolean(mainCity);

	const handleDeleteMainCity = () => {
		dispatch(deleteMainCity(true));
	};

	const handleSelect = () => {
		dispatch(openModal());
	};

	const handleGetPosition = async () => {
		if (navigator.geolocation) {
			const response = await dispatch(getCurrentPosition());
			const payload = response.payload as {
				city: string;
				options: string[];
			};
			if (payload.city) {
				dispatch(setMainCity(payload));
				Notiflix.Notify.success(`${payload.city} is now set as main city`);
			} else {
				Notiflix.Notify.failure(`Geolocation error`);
			}
		} else {
			Notiflix.Notify.failure("Geolocation is not supported by this browser.");
		}
	};

	return (
		<div className="main-city">
			{!isMainCitySet ? (
				<div className="select-box">
					<h1 className="select-box__title">Main city</h1>
					<div className="select-box-options">
						<button
							className="selectBox-options__localize-btn"
							onClick={handleGetPosition}>
							<img
								className="selectBox-options__localize-btn--icon"
								src={location}
							/>
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
					<div className="labels">
						<h1>{mainCity!.name}</h1>
						<img className="labels__icon" src={mainCity!.icon}></img>
						<button className="labels__btn" onClick={handleDeleteMainCity}>
							<img className="labels__btn--icon" src={xmark} />
						</button>
					</div>
					<ul className="informations">
						<li className="informations__item">
							<span>Temperature:</span>
							<span className="informations__item--value">
								{mainCity?.temperature} °C
							</span>
						</li>

						{mainCity?.cloud !== null && (
							<li className="informations__item">
								<span>Cloud:</span>
								<span className="informations__item--value">
									{mainCity?.cloud}%
								</span>
							</li>
						)}
						{mainCity?.condition !== null && (
							<li className="informations__item">
								<span>Condition:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.condition}
								</span>
							</li>
						)}
						{mainCity?.feelslike !== null && (
							<li className="informations__item">
								<span>Feelslike:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.feelslike} C
								</span>
							</li>
						)}
						{mainCity?.pressure !== null && (
							<li className="informations__item">
								<span>Pressure:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.pressure} hPa
								</span>
							</li>
						)}
						{mainCity?.humidity !== null && (
							<li className="informations__item">
								<span>Humidity:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.humidity}%
								</span>
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MainCity;
