import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slice"; // Podmień

import plus from "../../icons/plus.svg";
import "./AddCity.scss";

export const AddCity = () => {
	const dispatch = useDispatch();

	const handleOpenModal = () => {
		dispatch(openModal());
	};

	return (
		<button className="add-city" onClick={handleOpenModal}>
			<img className="add-city__icon" src={plus}></img>
		</button>
	);
};

export default AddCity;
