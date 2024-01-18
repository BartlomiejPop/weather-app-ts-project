import { useDispatch } from "react-redux";
// import { selectCity } from "../../redux/operations";

import "./MainCity.scss";
import { openModal } from "../../redux/slice";

export const MainCity = () => {
	const dispatch = useDispatch();
	const handleSelect = () => {
		dispatch(openModal());
	};

	return (
		<div className="main-city">
			<span className="main-city__title">Main city</span>
			<div className="main-city-options">
				<button className="main-city-options__localize-btn">localize me</button>
				<button
					className="main-city-options__select-btn"
					onClick={handleSelect}>
					select
				</button>
			</div>
		</div>
	);
};

export default MainCity;
