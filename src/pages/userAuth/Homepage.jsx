import ActiveView from "./components/ActiveView";
import PastView from "./components/PastView";
import { useState, useEffect, useRef } from "react";

const Homepage = (props) => {
	const {
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
	} = props;

	const [text, setText] = useState(null)
	const [ingredientArr, setIngredientArr] = useState([])
	const isMounted = useRef(false)

	const makeIngredientArr = () => {
		setIngredientArr(text.split(/\r?\n/))
	}

	// prints ingredient array to console
	useEffect(() => {
		if (isMounted.current) {
			console.log(ingredientArr)
		} else {
			isMounted.current = true;
		}
	}, [ingredientArr])

	return (
		<div>
			<h1>This is the homepage</h1>
			<div className="input-container">
				<p className="input-instructions">Type or copy/paste ingredients below<br></br><em>(each ingredient on a new line)</em></p>
				<textarea onChange={(e) => setText(e.target.value)} className="input-box" cols="50" rows="10" placeholder="eggplant&#10;white rice&#10;daikon&#10;chicken thigh"></textarea>
				<button onClick={makeIngredientArr} className="generate-button">Generate Meal Packs</button>
			</div>
			<ActiveView
				activeMealPacks={activeMealPacks}
				setActiveMealPacks={setActiveMealPacks}
			/>
      <button>Edit Active Meal Packs</button>
			<PastView pastMealPacks={pastMealPacks} setPastMealPacks={setPastMealPacks} />
		</div>
	);
};

export default Homepage;
