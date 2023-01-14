import axios from "axios";
import ActiveView from "./components/ActiveView";
import PastView from "./components/PastView";
import MealPack from "./MealPack";
import MealPackModal from "./components/MealPackModal"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// DUMMY DATA FOR TESTING #############################
const dummyData = [
	{
		title: "spaghetti",
		servings: 4,
		vegetarian: true,
		dairyFree: true,
		glutenFree: false,
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
		vegetarian: false,
		dairyFree: true,
		glutenFree: true,
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
		vegetarian: false,
		glutenFree: false,
		dairyFree: false,
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
		selectedActivePack,
		setSelectedActivePack,
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
	} = props;

	const [text, setText] = useState(null)
	const [ingredientArr, setIngredientArr] = useState([])
	const [mealPacks, setMealPacks] = useState(null)
	const [vegetarian, setVegetarian] = useState(false)
	const [glutenFree, setGlutenFree] = useState(false)
	const [dairyFree, setDairyFree] = useState(false)
	const isMounted = useRef(false)
	const [show, setShow] = useState(false);

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
		const filterObj = {
			vegetarian: vegetarian,
			glutenFree: glutenFree,
			dairyFree: dairyFree
		}
		const filterArr = [];
		for (let x in filterObj) {
			if (filterObj[x]) {
				filterArr.push(x)
			}
		}
		if (filterArr.length > 0) {
			console.log("filters!")
			console.log(filterArr)
		} else {
			setMealPacks(dummyData)
		}
	}

	// USE THIS TO NAVIGATE TO MEAL PACK PAGE
	const navigate = useNavigate();
	const rerouteToMealpack = () => {
		navigate("/mealpack")
	}

	return (
		<div>
			<h1>This is the homepage</h1>
			<div className="input-container">
				<p className="input-instructions">Type or copy/paste ingredients below<br></br><em>(each ingredient must be on a new line)</em></p>
				<textarea onChange={(e) => setText(e.target.value)} className="input-box" cols="50" rows="10" placeholder="eggplant&#10;white rice&#10;daikon&#10;chicken thigh"></textarea>
				<form>
					<input onChange={(e) => {
						if (vegetarian) {
							setVegetarian(false)
						} else {
							setVegetarian(true)
						}
					}} type="checkbox" name="vegetarian"></input>
					<label htmlFor="vegetarian">Vegetarian</label>
					<input onChange={(e) => {
						if (glutenFree) {
							setGlutenFree(false)
						} else {
							setGlutenFree(true)
						}
					}} type="checkbox" name="gluten-free"></input>
					<label htmlFor="gluten-free">Gluten-Free</label>
					<input onChange={(e) => {
						if (dairyFree) {
							setDairyFree(false)
						} else {
							setDairyFree(true)
						}
					}} type="checkbox" name="dairy-free"></input>
					<label htmlFor="dairy-free">Dairy-Free</label>
				</form>
				<button onClick={makeIngredientArr} className="generate-button">Generate Meal Packs</button>
				<button onClick={displayPacks}>Dummy Data Test</button>
			</div>
			{mealPacks && mealPacks.map(e => {
				return (
					<div className="mealpack-container" style={{ display: "flex", border: "solid 1px black", borderRadius: "5px", margin: "10px", padding: "10px", alignItems: "center" }}>
						<button className="mealpack-add-button" style={{ height: "fit-content", margin: "5px" }}>Add To "My Meal Packs"</button>
						<button onClick={() => setShow(true)} className="mealpack-info-button" style={{ height: "fit-content", margin: "5px" }}>See Meal Pack Info</button>
						<p className="meal-pack-title" style={{ fontSize: "35px", marginLeft: "15px" }} key={e.title}><strong>{e.title}</strong> meal pack</p>
					</div>
				)
			})}
			<ActiveView
				activeMealPacks={activeMealPacks}
				setActiveMealPacks={setActiveMealPacks}
			/>
      <button onClick={displayPacks}>Edit Active Meal Packs</button>
			<MealPackModal show={show} setShow={setShow}/>
		</div>
	);
};

export default Homepage;
