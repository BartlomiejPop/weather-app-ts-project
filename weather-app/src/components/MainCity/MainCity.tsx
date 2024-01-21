import { useDispatch, useSelector } from "react-redux";
import { selectMainCity } from "../../redux/selectors";
import xmark from "../../icons/xmark.svg";

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

	const handleDeleteMainCity = () => {
		dispatch(deleteMainCity());
	};

	const handleSelect = () => {
		dispatch(openModal());
	};

	return (
		<div className="main-city">
			{!isMainCitySet ? (
				<div className="select-box">
					<h1 className="select-box__title">Main city</h1>
					<div className="select-box-options">
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
					<div className="labels">
						<h1>{mainCity!.name}</h1>
						<img className="labels__icon" src={mainCity!.icon}></img>
						<button className="labels__btn" onClick={handleDeleteMainCity}>
							<img className="labels__btn--icon" src={xmark} />
						</button>
					</div>
					<ul className="informations">
						{mainCity?.temperature && (
							<li className="informations__item">
								<span>Temperature:</span>
								<span className="informations__item--value">
									{mainCity?.temperature} C
								</span>
							</li>
						)}
						{mainCity?.cloud && (
							<li className="informations__item">
								<span>Cloud:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.cloud}%
								</span>
							</li>
						)}
						{mainCity?.condition && (
							<li className="informations__item">
								<span>Condition:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.condition}
								</span>
							</li>
						)}
						{mainCity?.feelslike && (
							<li className="informations__item">
								<span>Feelslike:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.feelslike} C
								</span>
							</li>
						)}
						{mainCity?.pressure && (
							<li className="informations__item">
								<span>Pressure:</span>
								<span className="informations__item--value">
									{" "}
									{mainCity?.pressure} hPa
								</span>
							</li>
						)}
						{mainCity?.humidity && (
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
