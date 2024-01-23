import "./Loader.scss";
import sun from "../../icons/sun.svg";

export const Loader = () => {
	return (
		<div className="loader">
			<img className="loader__icon" src={sun}></img>
		</div>
	);
};

export default Loader;
