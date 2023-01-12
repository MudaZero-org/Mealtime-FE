import axios from "axios";
import ActiveView from "./components/ActiveView";
import PastView from "./components/PastView";
import { useState, useEffect, useRef } from "react";

// DUMMY DATA FOR TESTING #############################
const dummyData = [
	{
		title: "spaghetti",
		servings: 4,
		ingredients: ["pasta", "sauce", "garlic"],
		instructions: [
			{
				number: 1,
				step: "These are first step instructions"
			},
			{
				number: 2,
				step: "These are second step instructions"
			},
			{
				number: 3,
				step: "These are third step instructions"
			}
		]
	},
	{
		title: "chicken and broccoli",
		servings: 6,
		ingredients: ["chicken", "broccoli"],
		instructions: [
			{
				number: 1,
				step: "These are first step instructions"
			},
			{
				number: 2,
				step: "These are second step instructions"
			},
			{
				number: 3,
				step: "These are third step instructions"
			}
		]
	},
	{
		title: "ham sandwich",
		servings: 2,
		ingredients: ["bread", "ham", "cheese"],
		instructions: [
			{
				number: 1,
				step: "These are first step instructions"
			},
			{
				number: 2,
				step: "These are second step instructions"
			},
			{
				number: 3,
				step: "These are third step instructions"
			}
		]
	}
]
//######################################################

const Homepage = (props) => {
	const {
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
	} = props;

	const [text, setText] = useState(null)
	const [ingredientArr, setIngredientArr] = useState([])
	const [mealPacks, setMealPacks] = useState(null)
	const isMounted = useRef(false)

	const makeIngredientArr = () => {
		text && setIngredientArr(text.split(/\r?\n/))
	}

	// prints ingredient array to console
	useEffect(() => {
		async function fetchData() {
			if (isMounted.current) {
				console.log(ingredientArr)
				// const data = await axios.post('/sample/recipe', {
				// 	data: ingredientArr
				// })
				// setMealPacks(data)
			} else {
				isMounted.current = true;
			}
		}
		fetchData()
	}, [ingredientArr])

	const displayPacks = () => {
		setMealPacks(dummyData)
	}

	return (
		<div>
			<h1>This is the homepage</h1>
			<div className="input-container">
				<p className="input-instructions">Type or copy/paste ingredients below<br></br><em>(each ingredient must be on a new line)</em></p>
				<textarea onChange={(e) => setText(e.target.value)} className="input-box" cols="50" rows="10" placeholder="eggplant&#10;white rice&#10;daikon&#10;chicken thigh"></textarea>
				<button onClick={makeIngredientArr} className="generate-button">Generate Meal Packs</button>
				<button onClick={displayPacks}>Dummy Data Test</button>
			</div>
			{mealPacks && mealPacks.map(e => <p key={e.title}>{JSON.stringify(e)}</p>)}
			<ActiveView
				activeMealPacks={activeMealPacks}
				setActiveMealPacks={setActiveMealPacks}
			/>
      <button onClick={displayPacks}>Edit Active Meal Packs</button>
			<PastView pastMealPacks={pastMealPacks} setPastMealPacks={setPastMealPacks} />
		</div>
	);
};

export default Homepage;
