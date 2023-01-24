import axios from "axios";
import ActiveView from "./components/ActiveView";
import PastView from "./components/PastView";
import MealPack from "./MealPack";
import MealPackModal from "./components/MealPackModal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/_homepage.scss";
import AuthUtils from "./utils/authenticate";

const Homepage = (props) => {
	const {
		selectedActivePack,
		setSelectedActivePastPack,
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
	} = props;

	const [text, setText] = useState(null);
	const [filteredText, setFilteredText] = useState(null);
	const [ingredientArr, setIngredientArr] = useState([]);
	const [filteredArr, setFilteredArr] = useState([]);
	const [mealPacks, setMealPacks] = useState(null);
	const isMounted = useRef(false);
	const [show, setShow] = useState(false);
	const [selectedMealPack, setSelectedMealPack] = useState(null);
	const [myMealPacks, setMyMealPacks] = useState([]);

	const user = JSON.parse(localStorage.getItem("user"));
	const storeName = user.data.storeName;

	const makeIngredientArr = () => {
		let arr = [...testInputArr]
		setIngredientArr(arr)
	};

	const makeFilteredArr = () => {
		filteredText && setFilteredArr(filteredText.split(/\r?\n/));
	};

	useEffect(() => {
		console.log("🫀")
		async function fetchData() {
			if (isMounted.current) {
				const data = await axios.post("http://13.231.182.135:8080/sample/recipe", {
					ingredients: ingredientArr,
					filteredWords: filteredArr,
				},
				{
					headers: {authorization: `Bearer ${user.accessToken}`}
				});
				setMealPacks(data.data);
				const idArray = [];
				data.data.forEach((e) => idArray.push(e.id));
			} else {
				isMounted.current = true;
			}
		}
		fetchData();
	}, [ingredientArr]);

	const addToMyMealPacks = (meal) => {
		let array = [...myMealPacks];
		array.push(meal);
		setMyMealPacks(array);
	};

	const removeFromMyMealPacks = (meal) => {
		let array = [...myMealPacks];
		array.splice(array.indexOf(meal), 1);
		setMyMealPacks(array);
	};

	const publishMealPacks = async () => {
		const storeId = user.data.userId;
		const idArray = [];
		for (let e of myMealPacks) {
			idArray.push({ id: e.id });
		}
		await axios.post(`http://13.231.182.135:8080/store/${storeId}/mealpack`, {
			data: idArray,
		}, 
		{
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
		let info = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/true`, {
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
		setActiveMealPacks(info.data);
	};

	const navigate = useNavigate();
	const logout = () => {
		AuthUtils.logOut();
		navigate("/");
	};

	const [testInput, setTestInput] = useState(null);
	const [testInputArr, setTestInputArr] = useState([]);

	const clearInput = () => {
		let input = document.getElementById("userInput");
		input.value = "";
	}

	const removeIngredient = (ingredient) => {
		console.log(ingredient)
		const arr = [...testInputArr];
		arr.splice(arr.indexOf(ingredient), 1)
		setTestInputArr(arr)
	}

	return (
		<div className="app-container">
			{/* <div className="homepage-header">
				<h1 className="app-title">Mealtime</h1>
				<div className="user-info">
					<h1 className="store-title" style={{ marginRight: "1rem" }}>
						Account: {storeName}
					</h1>
					<button onClick={logout} className="logout-button button">
						Logout
					</button>
				</div>
			</div> */}
			<div className="app">
				<div className="input-section">
					<div className="input-container">
						<h3>Ingredients</h3>
						<p className="input-instructions">
							Type or copy/paste ingredients to use below<br></br>
						</p>
						<input
							id="userInput"
							className="input" 
							type="text"
							onChange={(e) => setTestInput(e.target.value)}
							placeholder="type ingredient here"
						></input>
						<button 
							className="button"
							onClick={() => {
								let arr = [...testInputArr]
								arr.unshift(testInput)
								setTestInputArr(arr)
								clearInput();
							}}
						>Add</button>
						{testInputArr.length > 0 && testInputArr.map((e) => {
							return (
								<div className="ingredient-name">
									<button className="button ingredient-button is-small" onClick={() => removeIngredient(e)}>X</button>
									<p className="ingredient-title">{e}</p>
								</div>
							)
						})}
						<div className="wrapper">
							<button
								onClick={makeIngredientArr}
								className="generate-button button is-medium"
							>Generate Meal Packs</button>
						</div>
					</div>
					<div className="input-container">
						<h3>Filter Ingredients</h3>
						<p className="input-instructions">
							Type or copy/paste ingredients you DON'T want to include in
							recipes<br></br>
							<em>(each ingredient must be on a new line)</em>
						</p>
						<textarea
							onChange={(e) => setFilteredText(e.target.value)}
							className="input-box"
							cols="50"
							rows="10"
							placeholder="pork&#10;milk&#10;cheese"
						></textarea>
						<div className="wrapper">
							<button
								onClick={makeFilteredArr}
								className="generate-button button is-medium"
							>Save filters</button>
							<button className="button is-medium">Clear filters</button>
						</div>
					</div>
					<div className="filter-container">
						<h3>Filters:</h3>
						<div className="filter-contents">
							{filteredArr &&
								filteredArr.map((e) => <p className="filter-words">-{e}</p>)}
						</div>
					</div>
				</div>
				{mealPacks && (
					<div className="user-selection-container">
						<div className="generated-mealpacks-container">
							<h3 className="generated-mealpacks-title">
								Generated Meal Packs
							</h3>
							{mealPacks &&
								mealPacks.map((e) => {
									return (
										<div key={e.id} className="mealpack-container">
											<button
												className="mealpack-add-button button"
												onClick={() => addToMyMealPacks(e)}
											>
												Add To "My Meal Packs"
											</button>
											<button
												className="mealpack-info-button button"
												onClick={() => {
													setSelectedMealPack(e);
													setShow(true);
												}}
											>
												See Meal Pack Info
											</button>
											<p className="mealpack-title">
												<strong>{e.title}</strong> meal pack
											</p>
										</div>
									);
								})}
						</div>
						<div className="selected-mealpacks">
							<div className="selected-mealpacks-container">
								<h3 className="my-mealpacks-title">My Meal Packs</h3>
								{myMealPacks &&
									myMealPacks.map((e, index) => {
										return (
											<div className="mealpack-container">
												<button
													onClick={() => removeFromMyMealPacks(e)}
													className="button"
												>
													Remove from "My Meal Packs"
												</button>
												<button
													className="mealpack-info-button button"
													onClick={() => {
														setSelectedMealPack(e);
														setShow(true);
													}}
												>
													See Meal Pack Info
												</button>
												<p className="mealpack-title" key={index}>
													<strong>{e.title}</strong> meal pack
												</p>
											</div>
										);
									})}
							</div>
						</div>
						<div className="buttons-container">
							<button
								className="publish-button button is-danger is-outlined"
								onClick={() => {
									publishMealPacks();
									setMyMealPacks([]);
								}}
							>
								Save
							</button>
							<button
								className="publish-button button is-primary is-outlined is-dark"
								onClick={() => setMealPacks(null)}
							>
								Close
							</button>
						</div>
					</div>
				)}
				<div className="active-view">
					<ActiveView
						selectedActivePack={selectedActivePack}
						setSelectedActivePastPack={setSelectedActivePastPack}
						activeMealPacks={activeMealPacks}
						setActiveMealPacks={setActiveMealPacks}
						pastMealPacks={pastMealPacks}
						setPastMealPacks={setPastMealPacks}
					/>
				</div>
				<div className="past-view">
					<PastView
						activeMealPacks={activeMealPacks}
						setActiveMealPacks={setActiveMealPacks}
						setPastMealPacks={setPastMealPacks}
						pastMealPacks={pastMealPacks}
						setSelectedActivePastPack={setSelectedActivePastPack}
					/>
				</div>
				<MealPackModal
					selectedMealPack={selectedMealPack}
					setSelectedMealPack={setSelectedMealPack}
					show={show}
					setShow={setShow}
				/>
			</div>
			<footer className="footer"></footer>
		</div>
	);
};

export default Homepage;
