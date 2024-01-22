import "./AddCityModal.scss";
import xmark from "../../icons/xmark.svg";
import { selectIsModalOpen, selectFetchedCities } from "../../redux/selectors";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, deleteResults } from "../../redux/slice";
import {
	setMainCity,
	fetchMatchingCities,
	addCity,
} from "../../redux/operations";
import Notiflix from "notiflix";

// interface cityInformation {
// 	name: string;
// 	temperature: number;
// 	icon: string;
// 	feelslike: number;
// 	condition: string;
// 	humidity: number;
// 	cloud: number;
// 	pressure: number;
// }

export const AddCityModal = () => {
	const dispatch = useDispatch();
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const isModalOpen = useSelector(selectIsModalOpen);
	const matchingCities = useSelector(selectFetchedCities);

	const handleCheckboxChange = (option: string) => {
		if (selectedOptions.includes(option)) {
			setSelectedOptions(selectedOptions.filter((item) => item !== option));
		} else {
			setSelectedOptions([...selectedOptions, option]);
		}
	};

	const handleInputChange = (value: string) => {
		setInputValue(value);
		if (value.length >= 3) {
			dispatch(fetchMatchingCities(value));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const cityInput = form.querySelector(
			'[name="cityName"]'
		) as HTMLInputElement | null;

		if (cityInput) {
			const city = cityInput.value;
			const cityOptions = {
				city: city,
				options: selectedOptions,
			};
			if (selectedOptions.includes("Set as main")) {
				const response = await dispatch(setMainCity(cityOptions));
				if (response.meta.requestStatus === "fulfilled") {
					Notiflix.Notify.success(`set ${response.payload.name} as main`);
					dispatch(closeModal());
				} else {
					if (response.payload !== "This city is already in list") {
						Notiflix.Notify.failure("City not found");
					}
				}
			} else {
				const response = await dispatch(addCity(cityOptions));
				if (response.meta.requestStatus === "fulfilled") {
					Notiflix.Notify.success(`added ${response.payload.name}`);
					dispatch(closeModal());
				} else {
					if (response.payload !== "This city is already in list") {
						Notiflix.Notify.failure(`City not found`);
					}
				}
			}
		}
		setInputValue("");
	};

	const handleCloseModal = () => {
		dispatch(closeModal());
	};

	const handleCitySelect = (cityName: string) => {
		setInputValue(cityName);
		dispatch(deleteResults());
	};

	return (
		<div className={`wrapper ${isModalOpen ? "open  " : "closed "}`}>
			<div className={`add-city-modal scale-in-center  `}>
				<button className="add-city-modal__close" onClick={handleCloseModal}>
					<img className="add-city-modal__close--icon" src={xmark} />
				</button>
				<form className="add-city-modal__form" onSubmit={handleSubmit}>
					<div className="add-city-modal__interface">
						<div className="add-city-modal__city">
							<span className="add-city-modal__city--label">City name:</span>
							<input
								name="cityName"
								required
								onChange={(e) => handleInputChange(e.target.value)}
								value={inputValue}
								className="add-city-modal__city--input"
								list="citiesList"
							/>
							<ul className="result-list">
								{matchingCities?.map(
									(
										cityObject: { city: string; country: string },
										index: number
									) => {
										return (
											<li
												key={index}
												className="result-list__item"
												onClick={() => handleCitySelect(cityObject.city)}>
												<span>{cityObject.city}</span>
												<span>{cityObject.country}</span>
											</li>
										);
									}
								)}
							</ul>
						</div>
						<div className="add-city-modal__options">
							<span className="add-city-modal__city--label">
								Select informations :
							</span>
							<div className="add-city-modal__options--checkbox-field">
								<input
									type="checkbox"
									className="add-city-modal__options--checkbox"
									id="Set as main"
									value="Set as main"
									checked={selectedOptions.includes("Set as main")}
									onChange={() => handleCheckboxChange("Set as main")}
								/>
								<label htmlFor="Set as main">Set as main</label>
							</div>
							<div className="add-city-modal__options--checkbox-field">
								<input
									type="checkbox"
									className="add-city-modal__options--checkbox"
									id="feelslike_c"
									value="feelslike_c"
									checked={selectedOptions.includes("feelslike_c")}
									onChange={() => handleCheckboxChange("feelslike_c")}
								/>
								<label htmlFor="feelslike_c">Feelslike temperature</label>
							</div>
							<div className="add-city-modal__options--checkbox-field">
								<input
									type="checkbox"
									className="add-city-modal__options--checkbox"
									id="rainfall"
									value="condition.text"
									checked={selectedOptions.includes("condition.text")}
									onChange={() => handleCheckboxChange("condition.text")}
								/>
								<label htmlFor="rainfall">Rainfall</label>
							</div>
							<div className="add-city-modal__options--checkbox-field">
								<input
									type="checkbox"
									className="add-city-modal__options--checkbox"
									id="humidity"
									value="humidity"
									checked={selectedOptions.includes("humidity")}
									onChange={() => handleCheckboxChange("humidity")}
								/>
								<label htmlFor="humidity">Humidity</label>
							</div>
							<div className="add-city-modal__options--checkbox-field">
								<input
									type="checkbox"
									className="add-city-modal__options--checkbox"
									id="cloud"
									value="cloud"
									checked={selectedOptions.includes("cloud")}
									onChange={() => handleCheckboxChange("cloud")}
								/>
								<label htmlFor="cloud">Cloud</label>
							</div>
							<div className="add-city-modal__options--checkbox-field">
								<input
									type="checkbox"
									className="add-city-modal__options--checkbox"
									id="pressure_mb"
									value="pressure_mb"
									checked={selectedOptions.includes("pressure_mb")}
									onChange={() => handleCheckboxChange("pressure_mb")}
								/>
								<label htmlFor="pressure_mb">Pressure</label>
							</div>
						</div>
					</div>
					<button className="add-city-modal__btn">add</button>
				</form>
			</div>
		</div>
	);
};

export default AddCityModal;
