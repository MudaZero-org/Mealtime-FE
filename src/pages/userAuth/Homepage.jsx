import axios from "axios";
import MealPackModal from "./components/MealPackModal";
import { useState, useEffect, useRef } from "react";
import "../../styles/pages/_homepage.scss";
import { v4 as uuidv4 } from 'uuid';
import API_URL from "../../Constants";

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

	const [ingredientInput, setIngredientInput] = useState(null);
	const [ingredientInputArr, setIngredientInputArr] = useState([]);
	const [filteredInput, setFilteredInput] = useState(null);
	const [filteredInputArr, setFilteredInputArr] = useState([]);

	const user = JSON.parse(localStorage.getItem("user"));

	const makeArr = () => {
		let ingredientArr = [...ingredientInputArr]
		setIngredientArr(ingredientArr)
		let filteredArr = [...filteredInputArr]
		setFilteredArr(filteredArr)
	};

	useEffect(() => {
		async function fetchData() {
			if (isMounted.current) {
				const data = await axios.post(`${API_URL}/sample/recipe`, {
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
		const storeId = user.data.storeId;
		const idArray = [];
		for (let e of myMealPacks) {
			idArray.push({ id: e.id });
		}
		await axios.post(`${API_URL}/store/${storeId}/mealpack`, {
			data: idArray,
		}, 
		{
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
		let info = await axios.get(`${API_URL}/store/${storeId}/mealpack/all/status/true`, {
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
		setActiveMealPacks(info.data);
	};	

	const clearIngredientInput = () => {
		let input = document.getElementById("userIngredientInput");
		input.value = "";
	}

	const clearFilteredInput = () => {
		let input = document.getElementById("userFilteredInput");
		input.value = "";
	}

	const removeIngredient = (ingredient) => {
		const arr = [...ingredientInputArr];
		arr.splice(arr.indexOf(ingredient), 1)
		setIngredientInputArr(arr)
	}

	const removeFiltered = (ingredient) => {
		const arr = [...filteredInputArr];
		arr.splice(arr.indexOf(ingredient), 1)
		setFilteredInputArr(arr)
	}

	const ingredientKeyHandler = (e) => {
		if (e.which === 13) {
			let arr = [...ingredientInputArr]
			arr.unshift(ingredientInput)
			if (ingredientInput) {
				setIngredientInputArr(arr)
				clearIngredientInput();
				setIngredientInput(null)
			}
		}
	};

	const filteredKeyHandler = (e) => {
		if (e.which === 13) {
			let arr = [...filteredInputArr]
			arr.unshift(filteredInput)
			if (filteredInput) {
				setFilteredInputArr(arr)
				clearFilteredInput();
				setFilteredInput(null)
			}
		}
	}

	// Accordion settings start #######################################
	useEffect(() => {
		let acc = document.getElementsByClassName("accordion");
		let i;
		for (i = 0; i < acc.length; i++) {
			  acc[i].addEventListener("click", function () {
			    /* Toggle between adding and removing the "active" class,
			    to highlight the button that controls the panel */
			    this.classList.toggle("active");
			
			    /* Toggle between hiding and showing the active panel */
			    let panel = this.nextElementSibling;
			    if (panel.style.display === "block") {
			      panel.style.display = "none";
			    } else {
			      panel.style.display = "block";
			    }
			  });
			}
		document.getElementsByClassName("open-default")[0].click();
	}, [])
	// According settings end #########################################

	return (
		<div className="app-container">
			<div className="app">


				<div className="input-section">
					<div className="input-container">
						<button className="accordion open-default">Ingredients</button>
						<div className="ribs">
							<p className="input-instructions">Type or copy/paste ingredients to use below<br></br></p>
							<input
								onKeyDown={ingredientKeyHandler}
								id="userIngredientInput"
								className="input" 
								type="text"
								onChange={(e) => setIngredientInput(e.target.value)}
								placeholder="type ingredient here + hit 'enter'"
							></input>
							{/* <button 
								className="button"
								onClick={() => {
									let arr = [...ingredientInputArr]
									arr.unshift(ingredientInput)
									if (ingredientInput) {
										setIngredientInputArr(arr)
										clearIngredientInput();
										setIngredientInput(null)
									}
								}}
							>Add</button> */}
							{ingredientInputArr.length > 0 && ingredientInputArr.map((e) => {
								return (
									<div key={uuidv4()} className="ingredient-name">
										<button key={uuidv4()} className="button ingredient-button is-small" onClick={() => removeIngredient(e)}>X</button>
										<p key={uuidv4()} className="ingredient-title">{e}</p>
									</div>
								)
							})}
						</div>
					</div>


					<div className="input-container">
						<button className="accordion">Filter Ingredients <em>optional</em></button>
						<div className="ribs">
							<p className="input-instructions">
								Type or copy/paste ingredients you DON'T want to include in
								recipes<br></br>
								<em>(each ingredient must be on a new line)</em>
							</p>
							<input
								onKeyDown={filteredKeyHandler}
								id="userFilteredInput"
								className="input" 
								type="text"
								onChange={(e) => setFilteredInput(e.target.value)}
								placeholder="type ingredient here + hit 'enter'"
							></input>
							{/* <button 
								className="button"
								onClick={() => {
									let arr = [...filteredInputArr]
									arr.unshift(filteredInput)
									if (filteredInput) {
										setFilteredInputArr(arr)
										clearFilteredInput();
										setFilteredInput(null)
									}
								}}
							>Add</button> */}
							{filteredInputArr.length > 0 && filteredInputArr.map((e) => {
								return (
									<div key={uuidv4()} className="ingredient-name">
										<button key={uuidv4()} className="button ingredient-button is-small" onClick={() => removeFiltered(e)}>X</button>
										<p key={uuidv4()} className="ingredient-title">{e}</p>
									</div>
								)
							})}
						</div>
					</div>
					<button
						onClick={makeArr}
						className="generate-button button has-background-danger"
					>Generate Meal Packs</button>
				</div>



				<div className="right-side">
					<div className="selected-mealpacks">
						<div className="selected-mealpacks-container">
							<h3 className="my-mealpacks-title">Selected Meal Packs</h3>
							{myMealPacks &&
								myMealPacks.map((e, index) => {
									return (
										<div key={uuidv4()} className="mealpack-container">
											<button
												key={uuidv4()}
												onClick={() => removeFromMyMealPacks(e)}
												className="button"
											>Remove from "My Meal Packs"</button>
											<button
												key={uuidv4()}
												className="mealpack-info-button button"
												onClick={() => {
													setSelectedMealPack(e);
													setShow(true);
												}}
											>See Meal Pack Info</button>
											<p key={uuidv4()} className="mealpack-title">
												<strong>{e.title}</strong> meal pack
											</p>
										</div>
									);
								})}
						</div>
					</div>
					{mealPacks && (
						<div className="user-selection-container">
							<div className="generated-mealpacks-container">
								<h3 className="generated-mealpacks-title">Generated Meal Packs</h3>
								{mealPacks &&
									mealPacks.map((e) => {
										return (
											<div key={uuidv4()} className="mealpack-container">
												<button
													key={uuidv4()}
													className="mealpack-add-button button"
													onClick={() => addToMyMealPacks(e)}
												>Add To "Selected Meal Packs"</button>
												<button
													key={uuidv4()}
													className="mealpack-info-button button"
													onClick={() => {
														setSelectedMealPack(e);
														setShow(true);
													}}
												>See Meal Pack Info</button>
												<p key={uuidv4()} className="mealpack-title">
													<strong>{e.title}</strong> meal pack
												</p>
											</div>
										);
									})}
							</div>
							<div className="buttons-container">
								<button
									className="publish-button button is-danger is-outlined"
									onClick={() => {
										publishMealPacks();
										setMyMealPacks([]);
									}}
								>Save</button>
								<button
									className="publish-button button is-primary is-outlined is-dark"
									onClick={() => setMealPacks(null)}
								>Close</button>
							</div>
						</div>
					)}
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
