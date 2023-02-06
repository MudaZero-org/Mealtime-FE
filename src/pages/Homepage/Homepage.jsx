import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

//Styling
import "../../styles/pages/_homepage.scss";


import { OverlayTrigger } from 'react-bootstrap';

//Utils for homepage
import HomepageUtils from "./utils/homepageUtils"

//Quick Guide Modal
import QuickGuide from "./QuickGuide"

//Mealpack Modal
import MealPackModal from "./MealPackModal";

//PopOver for saved filtered list
import SaveFilterPopOver from "./SaveFilterPopOver"


const Homepage = (props) => {
	const {
		selectedActivePack,
		setSelectedActivePastPack,
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
		showGuide,
		setShowGuide,
		firstLogIn,
		setFirstLogIn,
		setImage
	} = props;
	
	
	//Added ref and index
	const [index, setIndex] = useState(0);
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
	const [buttonStatus, setButtonStatus] = useState(true);
	const [successfulSave, setSuccessfulSave] = useState(false);

	const [userFilterLists, setUserFilterLists] = useState([]);
	const [filterListSaved, setFilterListSaved] = useState(false);
	const [filterListName, setFilterListName] = useState("")

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		setFilterListSaved(false)
	}, [filteredInputArr])
	
	useEffect(() => {
		HomepageUtils.fetchUserFilterData(setUserFilterLists, setImage)
	}, []);

	useEffect(() => {
		HomepageUtils.generateMealPacks(isMounted, user, ingredientArr, filteredArr, setMealPacks)
	}, [ingredientArr]);

	useEffect(() => {
		if (myMealPacks.length > 0) {
			setButtonStatus(false)
		} else {
			setButtonStatus(true)
		}
	}, [myMealPacks])

	// Accordion settings start #######################################
	useEffect(() => {
		HomepageUtils.accordionSetting();
	}, [])
	// According settings end #########################################

	return (
		<div className="homepage">
			<div className="homepage-title-container level">
				<h1 className="homepage-title">Meal Pack Generator</h1>
				<button onClick={()=> setShowGuide(true)}  className="help-button button"><span className="question-mark">?</span>Help</button>
			</div>
			<div className="app-container">
				<div className="app">
					
					<div className="input-section">
						<div className="input-container">
							<button className="accordion open-default"><strong>Ingredients</strong></button>
							<div className="ribs">
								<p className="input-instructions">Add ingredients you want to search with below<br></br></p>
								<div className="level-left">
									<input
										onKeyDown={(e) => {
											if(e.which === 13) {
												HomepageUtils.ingredientKeyHandler( ingredientInputArr, ingredientInput,setIngredientInputArr, setIngredientInput)
											}}
										}
										id="userIngredientInput"
										className="input" 
										type="text"
										onChange={(e) => setIngredientInput(e.target.value)}
										placeholder="type ingredient here + hit 'enter'"
									></input>
									<button 
										className="button"
										onClick={() => {
											let arr = [...ingredientInputArr]
											arr.unshift(ingredientInput)
											if (ingredientInput) {
												setIngredientInputArr(arr);
												HomepageUtils.clearIngredientInput();
												setIngredientInput(null);
											}
										}}
									>Add</button>
								</div>
								{ingredientInputArr.length > 0 && ingredientInputArr.map((e) => {
									return (
										<div key={uuidv4()} className="ingredient-name">
											<button key={uuidv4()} className="button ingredient-button is-small" 
											onClick={() => HomepageUtils.removeIngredient(e, ingredientInputArr, setIngredientInputArr)}
											>X</button>
											<p key={uuidv4()} className="ingredient-title">{e}</p>
										</div>
									)
								})}
								{ingredientInputArr.length > 0 && <p onClick={() => {
									setIngredientInputArr([]);
									HomepageUtils.clearIngredientInput();
									setIngredientInput(null);
								}} className="clear-button">[x]clear all</p>}
							</div>
						</div>
						<div className="input-container">
							<button className="accordion"><strong>Filter Ingredients</strong> <em>optional</em></button>
							<div className="ribs">
								<p className="input-instructions">
									Add ingredients you DON'T want to include in meal packs<br></br>
								</p>

								<div className="filter-buttons">
									<div className="dropdown" 
									onClick={HomepageUtils.toggleDropDown}
									>
									
										<div className="dropdown-trigger">
											<button className="button is-small" id="dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu">
												<span>My Lists</span>
												<span className="icon is-small">
													<i className="fa fa-angle-down" aria-hidden="true"></i>
												</span>
											</button>
										</div>
										<div className="dropdown-menu" id="dropdown-menu" role="menu">
											{userFilterLists && HomepageUtils.makeFilterLists(userFilterLists, setFilteredInputArr, setFilteredInput)}
										</div>
									</div>
									<button onClick={() => HomepageUtils.addFilters("veg", filteredInputArr, setFilteredInputArr, setFilteredInput)} className="button is-small">Vegetarian</button>
									<button onClick={() => HomepageUtils.addFilters("glu", filteredInputArr, setFilteredInputArr, setFilteredInput)} className="button is-small">Gluten-Free</button>
									<button onClick={() => HomepageUtils.addFilters("dai", filteredInputArr, setFilteredInputArr, setFilteredInput)} className="button is-small">Dairy-Free</button>

								</div>
								<div className="level-left">
									<input
										onKeyDown={(e) => {
											if(e.which === 13) {
												HomepageUtils.filteredKeyHandler(filteredInputArr, filteredInput, setFilteredInputArr, setFilteredInput)
											}
										}}
										id="userFilteredInput"
										className="input" 
										type="text"
										onChange={(e) => setFilteredInput(e.target.value)}
										placeholder="type ingredient here + hit 'enter'"
									></input>
									<button 
										className="button"
										onClick={() => {
											let arr = [...filteredInputArr]
											arr.unshift(filteredInput)
											if (filteredInput) {
												setFilteredInputArr(arr);
												HomepageUtils.clearFilteredInput();
												setFilteredInput(null);
											}
										}}
									>Add</button>
								</div>
								{filteredInputArr.length > 0 && filteredInputArr.map((e) => {
									return (
										<div key={uuidv4()} className="ingredient-name">
											<button key={uuidv4()} className="button ingredient-button is-small" 
											onClick={() => HomepageUtils.removeFiltered(e, filteredInputArr, setFilteredInputArr)}
											>X</button>
											<p key={uuidv4()} className="ingredient-title">{e}</p>
										</div>
									)
								})}
								{filteredInputArr.length > 0 && (
									<div className="filter-buttons-clear-save">
										<OverlayTrigger trigger="click" rootClose placement="bottom" overlay={SaveFilterPopOver(user, filterListName, setFilterListName, filterListSaved, setFilterListSaved, filteredInputArr, setFilteredInputArr, setUserFilterLists)}>
											<button className="button">Save List</button>
										</OverlayTrigger>
										<p onClick={() => {
										setFilteredInputArr([])
										HomepageUtils.clearFilteredInput();
										setFilteredInput(null)
										}} className="clear-button">[x]clear all</p>
									</div>)
								}
							</div>
						</div>
						<button
							onClick={() => HomepageUtils.makeArr(setSuccessfulSave, ingredientInputArr, setIngredientArr, filteredInputArr, setFilteredArr)}
							className="generate-button button is-medium"
							id="generate-button"
						>Generate Meal Packs</button>
					</div>



					<div className="right-side">
						<div className="selected-mealpacks">
							<div className="user-selection-container">
								<h3 className="my-mealpacks-title">Selected Meal Packs</h3>
								<div className="selected-mealpacks-container">
									{successfulSave && (
										<div className="add-success-message-container">
											<h5 className="add-success-message">🎉 Meal packs successfully added! 🎉</h5>
										</div>
									)}
									{myMealPacks &&
										myMealPacks.map((e, index) => {
											return (
												<div key={uuidv4()} className="mealpack-container">
													<div className="mealpack-container-buttons">
														<button
															key={uuidv4()}
															onClick={() => {
																HomepageUtils.removeFromMyMealPacks(e, myMealPacks, setMyMealPacks)
																HomepageUtils.toggleAddButton(e)
															}}
															className="button is-medium mealpack-add-button"
														>Remove</button>
														<button
															key={uuidv4()}
															className="mealpack-info-button button is-medium"
															onClick={() => {
																setSelectedMealPack(e);
																setShow(true);
															}}
														>See Info</button>
													</div>
													<p key={uuidv4()} className="mealpack-title" id="mealpack-title">
														<strong>{e.title}</strong>
													</p>
													<img className="generated-image" src={e.image}></img>
												</div>
											);
										})
									}
								</div>
							</div>
							<div className="bottom-save-button">
								<div className="buttons-container">
									<button
										style={{ color: "white" }}
										id="save-mealpacks-button"
										disabled={buttonStatus}
										className="publish-button is-medium button has-background-primary-dark"
										onClick={() => {
											HomepageUtils.publishMealPack(user, myMealPacks)
											setSuccessfulSave(true);
											setMyMealPacks([]);
										}}
									>Save</button>
									<button 
										id="clear-mealpacks-button"
										className="button is-medium publish-button"
										disabled={buttonStatus}
										onClick={() => {
											setMyMealPacks([])
										}}
									>Clear</button>
								</div>
							</div>
						</div>

						<div className="generated-mealpacks">
							<div className="user-selection-container">
								<h3 className="generated-mealpacks-title">Generated Meal Packs</h3>
								<div className="generated-mealpacks-container">
									{mealPacks &&
										mealPacks.map((e, index) => {
											return (
												<div key={uuidv4()} className="mealpack-container">
													<div className="mealpack-container-buttons">
													{HomepageUtils.renderAddButton(e, setSuccessfulSave, myMealPacks, setMyMealPacks)}
													<button
														key={uuidv4()}
														className="mealpack-info-button is-medium button"
														onClick={() => {
															setSelectedMealPack(e);
															setShow(true);
														}}
													>See Info</button>
													</div>
													<p key={uuidv4()} className="mealpack-title" id="mealpack-title">
														<strong>{e.title}</strong>
													</p>
													<img className="generated-image" src={e.image}></img>
												</div>
											);
										})
									}
								</div>
							</div>
						</div>	
					</div>
					<MealPackModal
						selectedMealPack={selectedMealPack}
						setSelectedMealPack={setSelectedMealPack}
						show={show}
						setShow={setShow}
					/>
					<QuickGuide
					show={showGuide}
					setShowGuide={setShowGuide}
					onHide={() => {setShowGuide(false)
					setIndex(0)}}
					firstLogIn={firstLogIn}
					setFirstLogIn={setFirstLogIn}
					user={user}
					index={index}
					setIndex={setIndex}
					/>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
