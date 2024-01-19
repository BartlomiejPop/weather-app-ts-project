import "./AddCityModal.scss";
import { selectIsModalOpen } from "../../redux/selectors";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, addCity } from "../../redux/slice";
// import { addCity } from "../../redux/operations";
// import { addCity } from "../../redux/operations";

export const AddCityModal = () => {
	const dispatch = useDispatch();
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const isModalOpen = useSelector(selectIsModalOpen);

	// interface FormData {
	// 	cityName: string;
	// 	temp_c: boolean;
	// 	rainfall: boolean;
	// 	humidity: boolean;
	// 	cloud: boolean;
	// 	pressure: boolean;
	// }

	// const [formData, setFormData] = useState<FormData>({
	// 	cityName: "",
	// 	temp_c: false,
	// 	rainfall: false,
	// 	humidity: false,
	// 	cloud: false,
	// 	pressure: false,
	// });

	const handleCheckboxChange = (option: string) => {
		// Sprawdź, czy opcja jest już zaznaczona
		if (selectedOptions.includes(option)) {
			// Jeśli jest zaznaczona, usuń ją z listy zaznaczonych
			setSelectedOptions(selectedOptions.filter((item) => item !== option));
		} else {
			// Jeśli nie jest zaznaczona, dodaj do listy zaznaczonych
			setSelectedOptions([...selectedOptions, option]);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
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
			console.log(cityOptions);
			dispatch(addCity(cityOptions));
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
						// value={formData.cityName}
						// onChange={handleInputChange}
					/>
				</div>
				<span>Select informations :</span>
				<div>
					<input
						type="checkbox"
						id="temp_c"
						value="temp_c"
						checked={selectedOptions.includes("temp_c")}
						onChange={() => handleCheckboxChange("temp_c")}
					/>
					<label htmlFor="temp_c">Temperature</label>
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
