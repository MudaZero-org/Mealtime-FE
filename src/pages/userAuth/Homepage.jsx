import axios from "axios";
import ActiveView from "./components/ActiveView";
import PastView from "./components/PastView";
import MealPack from "./MealPack";
import MealPackModal from "./components/MealPackModal"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/_homepage.scss";

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
	const [filteredText, setFilteredText] = useState(null);
	const [ingredientArr, setIngredientArr] = useState([])
	const [filteredArr, setFilteredArr] = useState([])
	const [mealPacks, setMealPacks] = useState(null)
	const [vegetarian, setVegetarian] = useState(false)
	const [glutenFree, setGlutenFree] = useState(false)
	const [dairyFree, setDairyFree] = useState(false)
	const isMounted = useRef(false)
	const [show, setShow] = useState(false);
	const [selectedMealPack, setSelectedMealPack] = useState(null);
	const [myMealPacks, setMyMealPacks] = useState([])

	const makeIngredientArr = () => {
		text && setIngredientArr(text.split(/\r?\n/))
	}

	const makeFilteredArr = () => {
		filteredText && setFilteredArr(filteredText.split(/\r?\n/))
	}

	// prints ingredient array to console
	useEffect(() => {
		async function fetchData() {
			if (isMounted.current) {
				console.log(filteredArr)
				const data = await axios.post('/sample/recipe', {
					ingredients: ingredientArr,
					filteredWords: filteredArr
				})
				setMealPacks(data.data)
				const idArray = [];
				data.data.forEach((e) => idArray.push(e.id))
			} else {
				isMounted.current = true;
			}
		}
		fetchData()
	}, [ingredientArr])

	const addToMyMealPacks = (meal) => {
		let array = [...myMealPacks]
		array.push(meal)
		setMyMealPacks(array)
	};

	const removeFromMyMealPacks = (meal) => {
		let array = [...myMealPacks]
		array.splice(array.indexOf(meal), 1)
		setMyMealPacks(array)
	}

	const user = JSON.parse(localStorage.getItem("user"))
	const storeName = user.userData[0].storeName;

	const publishMealPacks = () => {
		const storeId = user.userData[0].userId
		// axios.post(`/store/${storeId}/mealpack`, {
		// 	data: myMealPacks
		// })
	}

	const navigate = useNavigate();
	const logout = () => {
		navigate("/");
	}

	return (
		<div className="app-container">
			<div className="app">
				<button onClick={logout} className="logout-button">Logout</button>
				<h1>{storeName}</h1>
				<div className="input-container">
					<p className="input-instructions">Type or copy/paste ingredients below<br></br><em>(each ingredient must be on a new line)</em></p>
					<textarea onChange={(e) => setText(e.target.value)} className="input-box" cols="50" rows="10" placeholder="eggplant&#10;white rice&#10;daikon&#10;chicken thigh"></textarea>
					<button onClick={makeIngredientArr} className="generate-button">Generate Meal Packs</button>
				</div>
				<div className="input-container">
					<p className="input-instructions">Type or copy/paste ingredients you DON'T want to include in recipes<br></br><em>(each ingredient must be on a new line)</em></p>
					<textarea onChange={(e) => setFilteredText(e.target.value)} className="input-box" cols="50" rows="10" placeholder="eggplant&#10;white rice&#10;daikon&#10;chicken thigh"></textarea>
					<button onClick={makeFilteredArr} className="generate-button">Submit filtered words</button>
				</div>
				{mealPacks && (
					<div className="user-selection-container">
						<div className="generated-mealpacks-container">
							<h3>Generated Meal Packs:</h3>
							{mealPacks && mealPacks.map(e => {
								return (
									<div key={e.id} className="mealpack-container">
										<button onClick={() => addToMyMealPacks(e)} className="mealpack-add-button button">Add To "My Meal Packs"</button>
										<button className="mealpack-info-button button" onClick={() => {
											setSelectedMealPack(e)
											setShow(true)
										}}>See Meal Pack Info</button>
										<p className="mealpack-title"><strong>{e.title}</strong> meal pack</p>
									</div>
								)
							})}
						</div>
						<div className="selected-mealpacks">
							<div className="selected-mealpacks-container">
								<h3>My Meal Packs:</h3>
								{myMealPacks && myMealPacks.map((e, index) => {
									return (
										<div className="mealpack-container">
											<button onClick={() => removeFromMyMealPacks(e)} className="button">Remove from "My Meal Packs"</button>
											<button className="mealpack-info-button button" onClick={() => {
												setSelectedMealPack(e)
												setShow(true)
											}}>See Meal Pack Info</button>
											<p className="mealpack-title" key={index}><strong>{e.title}</strong> meal pack</p>
										</div>
									)
								})}
							</div>
						</div>
						<button className="publish-button" onClick={() => {
								// setMealPacks(null)
								publishMealPacks();
								setMyMealPacks([])
							}}>Publish My Meal Packs</button>
					</div>
				)}
				<ActiveView
					selectedActivePack={selectedActivePack}
					setSelectedActivePack={setSelectedActivePack}
					activeMealPacks={activeMealPacks}
					setActiveMealPacks={setActiveMealPacks}
					setPastMealPacks={setPastMealPacks}
				/>
				<PastView 
					setActiveMealPacks={setActiveMealPacks}
				/>
				<MealPackModal selectedMealPack={selectedMealPack} setSelectedMealPack={setSelectedMealPack} show={show} setShow={setShow}/>
				<div className="one" style={{ display: "flex", height: "100px", width: "100px"}}></div>
				<div className="two" style={{ display: "flex", height: "100px", width: "100px"}}></div>
				<div className="three" style={{ display: "flex", height: "100px", width: "100px"}}></div>
				<div className="four" style={{ display: "flex", height: "100px", width: "100px"}}></div>
				<div className="five" style={{ display: "flex", height: "100px", width: "100px"}}></div>
			</div>
		</div>
	);
};

export default Homepage;
