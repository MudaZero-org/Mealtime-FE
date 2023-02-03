import axios from "axios";
import MealPackModal from "./components/MealPackModal";
import { useState, useEffect, useRef } from "react";
import "../../styles/pages/_homepage.scss";
import { v4 as uuidv4 } from 'uuid';
import API_URL from "../../Constants";
import vegetarianArr from "./utils/vegetarian.json";
import dairyFreeArr from "./utils/dairyFree.json";
import glutenFreeArr from "./utils/glutenFree.json";

//Added Carousel and image
import {Carousel, Modal} from "react-bootstrap"
import CarouselImg from "../../images/howToUse.jpg"

const Homepage = (props) => {
	const {
		selectedActivePack,
		setSelectedActivePastPack,
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
		//Added showGuide and firstLogIn
		showGuide,
		setShowGuide,
		firstLogIn,
		setFirstLogIn,
		setImage
	} = props;
	
	
	//Added ref and index
	const ref = useRef(null);
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

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		async function fetchUserData() {
			const user = JSON.parse(localStorage.getItem("user"));
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setImage(userData.data.profileImg);
		}
		fetchUserData();
	}, []);
	
	//Added onPrevNextClick
	const onPrevClick = () => {
    ref.current.prev();
  };
  const onNextClick = () => {
    ref.current.next();
  };

	const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

	function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        backdrop="static"
      >
    
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null} ref={ref} controls={false} indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg}
              alt="First slide"
            />
            <Carousel.Caption className="carousel-text">
              {firstLogIn ? <h3>Hi {user.data.storeName}, you have successfully signed up!</h3>: <h3>Hi {user.data.storeName}</h3>}
							{firstLogIn ? <p>Welcome! This walkthrough will help you get started with MealTime.</p>: <p>This quick guide will help you how to use with MealTime.</p>}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg }
              alt="Second slide"
            />

            <Carousel.Caption className="carousel-text">
              <h3>Quick Guide:</h3>
              <p>Put in ingredients in the "Ingredients" box.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg}
              alt="Third slide"
            />

            <Carousel.Caption className="carousel-text">
              <h3>Quick Guide:</h3>
              <p>
                Press "Generate Meal Packs".
              </p>
            </Carousel.Caption>
          </Carousel.Item>
					<Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg}
              alt="Third slide"
            />

            <Carousel.Caption className="carousel-text">
              <h3>Quick Guide:</h3>
              <p>
                Add Meal Packs you like.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
					<Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg}
              alt="Third slide"
            />

            <Carousel.Caption className="carousel-text">
              <h3>Quick Guide:</h3>
              <p>
                Press and you are good to go.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
			
        <div class="level carousel-buttons">
          
          <div class="level-left">
            <button class="button" onClick={() => {
							setIndex(0)
							setShowGuide(false)
							setFirstLogIn(false)
						}}>Close</button>
          </div>
          <div class="level-right">
              {index !== 0 ? <span style={{ cursor: "pointer" }} aria-hidden="true" className="carousel-control-prev-icon" onClick={() => onPrevClick()
            }/> : ""}
            
            
            {index !== 4 ? <span style={{ cursor: "pointer" }} aria-hidden="true" className="carousel-control-next-icon" onClick={() => onNextClick()}/> : <button class="button" onClick={() => {
							setIndex(0)
							setShowGuide(false)
							setFirstLogIn(false)}}>Let's get started!</button>}
          </div>
        </div>
      </Modal>
    );
  }

	const makeArr = () => {
		let ingredientArr = [...ingredientInputArr]
		setIngredientArr(ingredientArr)
		let filteredArr = [...filteredInputArr]
		setFilteredArr(filteredArr)
	};

	useEffect(() => {
		async function fetchData() {
			if (isMounted.current) {
				const data = await axios.post(`${API_URL}/mealpack/recipe`, {
					ingredients: ingredientArr,
					filteredWords: filteredArr,
				},
				{
					headers: {authorization: `Bearer ${user.accessToken}`}
				});
				data.data.map((meal) => meal.clicked = false)
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

	useEffect(() => {
		if (myMealPacks.length > 0) {
			setButtonStatus(false)
		} else {
			setButtonStatus(true)
		}
	}, [myMealPacks])

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
		// let info = await axios.get(`${API_URL}/store/${storeId}/mealpack/all/status/true`, {
		// 	headers: {authorization: `Bearer ${user.accessToken}`}
		// });
		// setActiveMealPacks(info.data);
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


	const addFilters = (type) => {
		let arr = [...filteredInputArr]
		switch(type) {
			case "veg":
				for (let x of vegetarianArr) {
					arr.unshift(x)
				}
				setFilteredInputArr(arr)
				clearFilteredInput();
				setFilteredInput(null)
				break;
			
			case "glu":
				for (let x of glutenFreeArr) {
					arr.unshift(x)
				}
				setFilteredInputArr(arr)
				clearFilteredInput();
				setFilteredInput(null)
				break;
			
			case "dai":
				for (let x of dairyFreeArr) {
					arr.unshift(x)
				}
				setFilteredInputArr(arr)
				clearFilteredInput();
				setFilteredInput(null)
				break;
		}
	}

	const renderAddButton = (meal) => {
		if (!meal.clicked) {
			return (
				<button
					key={uuidv4()}
					className="mealpack-add-button button is-medium"
					onClick={() => {
						addToMyMealPacks(meal);
						toggleAddButton(meal);
					}}
				>Add</button>
			)
		} else {
			return (
				<button
					disabled
					key={uuidv4()}
					className="mealpack-add-button button is-medium"
				>Added</button>
			)
		}
	}

	const toggleAddButton = (meal) => {
		meal.clicked = !meal.clicked;
	}

	return (
		<div className="All">
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
										onKeyDown={ingredientKeyHandler}
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
												clearIngredientInput();
												setIngredientInput(null);
											}
										}}
									>Add</button>
								</div>
								{ingredientInputArr.length > 0 && ingredientInputArr.map((e) => {
									return (
										<div key={uuidv4()} className="ingredient-name">
											<button key={uuidv4()} className="button ingredient-button is-small" onClick={() => removeIngredient(e)}>X</button>
											<p key={uuidv4()} className="ingredient-title">{e}</p>
										</div>
									)
								})}
								{ingredientInputArr.length > 0 && <p onClick={() => {
									setIngredientInputArr([]);
									clearIngredientInput();
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
								<div className="level-left">
									<button onClick={() => addFilters("veg")} className="button is-small">Vegetarian</button>
									<button onClick={() => addFilters("glu")} className="button is-small">Gluten-Free</button>
									<button onClick={() => addFilters("dai")} className="button is-small">Dairy-Free</button>
								</div>
								<div className="level-left">
									<input
										onKeyDown={filteredKeyHandler}
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
												clearFilteredInput();
												setFilteredInput(null);
											}
										}}
									>Add</button>
								</div>
								{filteredInputArr.length > 0 && filteredInputArr.map((e) => {
									return (
										<div key={uuidv4()} className="ingredient-name">
											<button key={uuidv4()} className="button ingredient-button is-small" onClick={() => removeFiltered(e)}>X</button>
											<p key={uuidv4()} className="ingredient-title">{e}</p>
										</div>
									)
								})}
								{filteredInputArr.length > 0 && <p onClick={() => {
									setFilteredInputArr([])
									clearFilteredInput();
									setFilteredInput(null)
								}} className="clear-button">[x]clear all</p>}
							</div>
						</div>
						<button
							onClick={makeArr}
							className="generate-button button is-medium"
							id="generate-button"
						>Generate Meal Packs</button>
					</div>



					<div className="right-side">
						<div className="selected-mealpacks">
							<div className="user-selection-container">
								<h3 className="my-mealpacks-title">Selected Meal Packs</h3>
								<div className="selected-mealpacks-container">
									{myMealPacks &&
										myMealPacks.map((e, index) => {
											return (
												<div key={uuidv4()} className="mealpack-container">
													<div className="mealpack-container-buttons">
														<button
															key={uuidv4()}
															onClick={() => {
																removeFromMyMealPacks(e)
																toggleAddButton(e)
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
										id="save-mealpacks-button"
										disabled={buttonStatus}
										className="publish-button is-medium button is-danger"
										onClick={() => {
											publishMealPacks();
											setMyMealPacks([]);
										}}
									>Save</button>
									<button 
										id="clear-mealpacks-button"
										className="button is-medium publish-button is-primary"
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
													{renderAddButton(e)}
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
					<MyVerticallyCenteredModal
        	show={showGuide}
        	onHide={() => setShowGuide(false)}
      	/>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
