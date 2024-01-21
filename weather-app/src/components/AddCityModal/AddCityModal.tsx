import "./AddCityModal.scss";
import { selectIsModalOpen } from "../../redux/selectors";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, addCity } from "../../redux/slice";
import { setMainCity } from "../../redux/operations";
import Notiflix from "notiflix";

export const AddCityModal = () => {
	const dispatch = useDispatch();
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const isModalOpen = useSelector(selectIsModalOpen);

	const handleCheckboxChange = (option: string) => {
		if (selectedOptions.includes(option)) {
			setSelectedOptions(selectedOptions.filter((item) => item !== option));
		} else {
			setSelectedOptions([...selectedOptions, option]);
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
				}
			} else {
				const response = await dispatch(addCity(cityOptions));

				if (response.meta.requestStatus === "fulfilled") {
					Notiflix.Notify.success(`added ${response.payload.name}`);
				} else {
					Notiflix.Notify.failure(`bad input`);
				}
			}

			dispatch(closeModal());
		}
	};

	const handleCloseModal = () => {
		dispatch(closeModal());
	};

	return (
		<div className={`add-city-modal ${isModalOpen ? "open" : "closed"}`}>
			<button className="add-city-modal__close" onClick={handleCloseModal}>
				X
			</button>
			<form onSubmit={handleSubmit}>
				<div className="add-city-modal__city">
					<span className="add-city-modal__city--label">City name:</span>
					<input
						name="cityName"
						required
						className="add-city-modal__city--input"
						list="citiesList"
					/>
				</div>
				<span>Select informations :</span>
				<div className="set-as-main-field">
					<input
						type="checkbox"
						id="Set as main"
						value="Set as main"
						checked={selectedOptions.includes("Set as main")}
						onChange={() => handleCheckboxChange("Set as main")}
					/>
					<label htmlFor="Set as main">Set as main</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="feelslike_c"
						value="feelslike_c"
						checked={selectedOptions.includes("feelslike_c")}
						onChange={() => handleCheckboxChange("feelslike_c")}
					/>
					<label htmlFor="feelslike_c">Feelslike temperature</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="rainfall"
						value="condition.text"
						checked={selectedOptions.includes("condition.text")}
						onChange={() => handleCheckboxChange("condition.text")}
					/>
					<label htmlFor="rainfall">Rainfall</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="humidity"
						value="humidity"
						checked={selectedOptions.includes("humidity")}
						onChange={() => handleCheckboxChange("humidity")}
					/>
					<label htmlFor="humidity">Humidity</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="cloud"
						value="cloud"
						checked={selectedOptions.includes("cloud")}
						onChange={() => handleCheckboxChange("cloud")}
					/>
					<label htmlFor="cloud">Cloud</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="pressure_mb"
						value="pressure_mb"
						checked={selectedOptions.includes("pressure_mb")}
						onChange={() => handleCheckboxChange("pressure_mb")}
					/>
					<label htmlFor="pressure_mb">Pressure</label>
				</div>
				<button className="add-city-modal__btn">add</button>
			</form>
		</div>
	);
};

export default AddCityModal;
