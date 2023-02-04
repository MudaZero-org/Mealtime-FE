import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../styles/pages/_homepage.scss";
import { v4 as uuidv4 } from "uuid";
import API_URL, { REACT_APP_URL } from "../../../Constants";
import MealPackDetailsModal from "./MealPackDetailsModal"
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import starIcon from "../../../images/star.png"

const PastView = (props) => {
	const [show, setShow] = useState(false);
	const [selectedMealPack, setSelectedMealPack] = useState(null);
	const [selectionArr, setSelectionArr] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all")

	const {
		pastMealPacks,
		setPastMealPacks,
		setActiveMealPacks,
		setSelectedActivePastPack,
		//Added
		activeMealPacks,
	} = props;

	useEffect(() => {
		async function fetchData() {
			const user = JSON.parse(localStorage.getItem("user"))
			const storeId = user.data.storeId
			let all = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
				headers: { authorization: `Bearer ${user.accessToken}` }
			});
			all.data.map((meal) => {meal.selectedFav = false})
			setPastMealPacks(all.data)

			let favorites = await axios.get(
				`${API_URL}/store/${storeId}/mealpack/all/favorite`,
				{
					headers: { authorization: `Bearer ${user.accessToken}` },
				}
			);
			favorites.data.map((meal) => meal.selectedFav = false)
			setActiveMealPacks(favorites.data);
		}
		fetchData();
	}, []) // activeMealPacks (causing infinite calls)

	//Added this for all favorites ------Ken
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const user = JSON.parse(localStorage.getItem("user"));
	// 		const storeId = user.data.storeId;
			
	// 	}
	// 	fetchData();
	// }, []); // pastMealPacks (causing infinite calls)



	// fetchPastPacks copies above useEffect, wittout causing infinite loop
	const fetchPastPacks = async () => {
		const user = JSON.parse(localStorage.getItem("user"))
		const storeId = user.data.storeId
		let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
			headers: { authorization: `Bearer ${user.accessToken}` }
		});
		setPastMealPacks(data.data)
	}

	//Added
	const fetchActivePacks = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		const storeId = user.data.storeId;
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all/favorite`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setActiveMealPacks(data.data);
	};

	const navigate = useNavigate();
	const rerouteToMealpack = (meal) => {
		setSelectedActivePastPack(meal)
		navigate("/mealpack")
	}

	const activateMealPack = async (meal) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const storeId = user.data.storeId;
		await axios.put(
			`${API_URL}/store/${storeId}/mealpack/${meal.id}`,
			{
				isFavorite: true,
				mealpackName: meal.mealpackName,
				isDelete: false,
			},
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all/favorite`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setActiveMealPacks(data.data);
	};

	const deactivateMealPack = async (meal) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const storeId = user.data.storeId;
		await axios.put(
			`${API_URL}/store/${storeId}/mealpack/${meal.id}`,
			{
				isFavorite: false,
				mealpackName: meal.mealpackName,
				isDelete: false,
			},
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setPastMealPacks(data.data);
	};

	//Handles deleting mealpack
	const deleteMealPack = async (meal) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const storeId = user.data.storeId;
		//route
		await axios.put(
			`${API_URL}/store/${storeId}/mealpack/${meal.id}`,
      {
				isFavorite: false,
				mealpackName: meal.mealpackName,
				isDelete: true,
			},
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setPastMealPacks(data.data);
	}


  //Popover
  const popover = (e) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Delete mealpack?</Popover.Header>
      <Popover.Body>
          Are you sure you want to <strong>delete</strong> this mealpack?
        </Popover.Body>
        <button
          className="button is-danger"
          variant="primary"
          onClick={async () => {
            //As of the moment to check if it is working
            await deleteMealPack(e)
            fetchPastPacks()
          }}
        >
          ✓ Delete
        </button>
        <button
          className="button"
          variant="primary"
          onClick={() => {
            document.body.click()
          }}
        >
          X Cancel
        </button>{" "}
    </Popover>
  );

  const addToSelectedArr = (meal) => {
		if (meal.selectedFav) {
			const arr = [...selectionArr]
			arr.splice(arr.indexOf(meal), 1);
			setSelectionArr(arr);
			meal.selectedFav = false;
		} else {
			const arr = [...selectionArr];
			arr.push(meal)
			setSelectionArr(arr)
			meal.selectedFav = true;
		}
	}

	const renderInput = (meal) => {
		if (meal.selectedFav) {
			return (
				<input checked className="checkbox" type="checkbox" onChange={() => addToSelectedArr(meal)}></input>
			)
		} else {
			return (
				<input className="checkbox" type="checkbox" onChange={() => addToSelectedArr(meal)}></input>
			)
		}
	}

	const favoriteIcon = (meal) => {
		if (meal.isFavorite) {
			return (
				<span className="icon">
					<img src={starIcon} className="star-icon" />
				</span>
			)
		}
	}

	const favoriteIcon2 = (meal) => {
		return (
			<span className="icon">
				<img src={starIcon} className="star-icon" />
			</span>
		)
	}
	
	const filterNutritionPDF = (meal) => {
		console.log(meal)
		let filterArr = [];
		console.log(meal.recipeDetail.vegan)
		meal.recipeDetail.vegan && filterArr.push("Vegan")
		meal.recipeDetail.vegetarian && filterArr.push("Vegetarian")
		meal.recipeDetail.glutenFree && filterArr.push("Gluten Free")
		meal.recipeDetail.dairyFree && filterArr.push("Dairy Free")
		return filterArr;
	}

  const downloadPDF = (meal) => {
		let qrCode = generateQRCode(meal);
		let nutritionArr = filterNutritionPDF(meal)
		const doc = new jsPDF("p", "mm", "a4");
		let width = doc.internal.pageSize.getWidth();
		const name = meal.mealpackName;
		const instructions = meal.recipeDetail.analyzedInstructions[0].steps.map((e) => " " + e.number + "." + " " + e.step)
		const nutrition = nutritionArr.map((e) => " " + e);
		const ingredients = meal.recipeDetail.extendedIngredients.map((e) => " " + e.name)
		doc.setFontSize(32);
		doc.text(10, 85, `${name}`, {
			maxWidth: width / 1.15,
		});
		doc.setFontSize(14);
		doc.text(10, 95, [`${nutrition}`])
		doc.setFontSize(18);
		doc.text(10, 110, [`Ingredients: ${ingredients}`], {
			maxWidth: width / 1.15,
		})
		doc.text(10, 140, [`${instructions}`], {
			maxWidth: width / 1.15,
		});
		doc.addImage(meal.recipeDetail.image, "JPG", 20, 15, 80, 50)
		doc.addImage(qrCode, "PNG", 130, 15, 50, 50);
		doc.autoPrint({ variant: "non-conform" });
		doc.save("print-mealpacks.pdf");
	};

	const downloadAllPDF = () => {
		const doc = new jsPDF("p", "mm", "a4");
		let width = doc.internal.pageSize.getWidth();
		selectionArr.map((meal) => {
			let qrCode = generateQRCode(meal);
			let nutritionArr = filterNutritionPDF(meal)
			let name = meal.mealpackName;
			let instructions = meal.recipeDetail.analyzedInstructions[0].steps.map((e) => " " + e.number + "." + " " + e.step)
			let ingredients = meal.recipeDetail.extendedIngredients.map((e) => " " + e.name)
			let nutrition = nutritionArr.map((e) => " " + e);
			doc.setFontSize(32);
			doc.text(10, 85, `${name}`, {
				maxWidth: width / 1.15,
			});
			doc.setFontSize(14);
			doc.text(10, 95, [`${nutrition}`])
			doc.setFontSize(18);
			doc.text(10, 110, [`Ingredients: ${ingredients}`], {
				maxWidth: width / 1.15,
			})
			doc.text(10, 140, [`${instructions}`], {
				maxWidth: width / 1.15,
			});
			doc.addImage(meal.recipeDetail.image, "JPG", 20, 15, 80, 50)
			doc.addImage(qrCode, "PNG", 130, 15, 50, 50);
			doc.addPage();
		})
		let pageCount = doc.internal.getNumberOfPages();
		doc.deletePage(pageCount);
		doc.save("print-mealpacks.pdf")
	};

	const generateQRCode = (meal) => {
		const QRCode = require("qrcode");
		let qrCodeDataUrl;
		let recipeId = meal.recipeId
		QRCode.toDataURL(`${REACT_APP_URL}/info/${recipeId}`, function (err, url) {
			qrCodeDataUrl = url;
		});
		return qrCodeDataUrl;
	};

	return (
		<div className="past-container">
			
			<h2 className="past-title">{selectedCategory === "all" ? "All Meal Packs" : "Favorite Meal Packs"}</h2>

			<div className="hello">
				<aside className="menu sidebar" style={{marginLeft: "6rem"}}>
					<p className="menu-label" style={{fontSize: "15px"}}>
						Meal Packs
					</p>
					<ul className="menu-list">
						<li onClick={()=>{
							setSelectedCategory("all")}}><a>All</a></li>
						<li onClick={()=>{
							setSelectedCategory("favorites")
						}}><a>Favorites</a></li>
					</ul>
				</aside>

				<div className="tile is-parent active-mealpacks">
					{selectedCategory === "all" && pastMealPacks ? pastMealPacks.map((e) => {
						return (
							<div key={uuidv4()} className="tile is-child is-4">
								<div key={uuidv4()} className="active-mealpack-container">
									<img className="food-small-image" src={e.recipeDetail["image"]}></img>
									{renderInput(e)}

									<p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName} {favoriteIcon(e)}</strong></p>
									<div className="tags past-mealpacks-tags">
										{e.recipeDetail.vegetarian && <span className="tag" id="vegetarian">vegetarian</span>}
										{e.recipeDetail.vegan && <span className="tag" id="vegan">vegan</span>}
										{e.recipeDetail.glutenFree && <span className="tag" id="gluten">gluten free</span>}
										{e.recipeDetail.dairyFree && <span className="tag" id="dairy">dairy free</span>}
									</div>
									<div className="past-mealpacks-buttons">
										<button key={uuidv4()} className="button" onClick={() => downloadPDF(e)} style={{ marginBottom: "10px" }}>Download PDF</button>
										<button key={uuidv4()} className="button" onClick={() => {
											//Old Code
											// rerouteToMealpack(e)
											setShow(true)
											setSelectedMealPack(e)
										}}>See Meal Pack Info</button>
										{!e.isFavorite 
											? (
												<button key={uuidv4()} className="button" onClick={async () => {
													await activateMealPack(e)
													fetchPastPacks()
												}} style={{ marginBottom: "10px" }}>Add to Favorites</button>) 
											: (
												<button key={uuidv4()} className="button" onClick={async () => {
													await deactivateMealPack(e)
													fetchPastPacks()
												}}>Remove from Favorites</button>
											)}
										<OverlayTrigger trigger="click" rootClose placement="top" overlay={popover(e)}>
											<button className="button">Delete</button>
										</OverlayTrigger>
									</div>
								</div>
							</div>

						);
					}) : activeMealPacks && activeMealPacks.map((e) => {
						return (
							<div key={uuidv4()} className="tile is-child is-4">
								<div key={uuidv4()} className="active-mealpack-container">
									<img className="food-small-image" src={e.recipeDetail["image"]}></img>
									{renderInput(e)}
	
									<p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName}</strong>{favoriteIcon2()} </p>
									<div className="tags active-mealpacks-tags">
										{e.recipeDetail.vegetarian && <span className="tag" id="vegetarian">vegetarian</span>}
										{e.recipeDetail.vegan && <span className="tag" id="vegan">vegan</span>}
										{e.recipeDetail.glutenFree && <span className="tag" id="gluten">gluten free</span>}
										{e.recipeDetail.dairyFree && <span className="tag" id="dairy">dairy free</span>}
									</div>
									<div className="active-mealpacks-buttons">
										<button key={uuidv4()} className="button" onClick={() => downloadPDF(e)} style={{ marginBottom: "10px" }}>Download PDF</button>
										<button key={uuidv4()} className="button" onClick={() => {
											//Old code
											// rerouteToMealpack(e)
											setShow(true)
											setSelectedMealPack(e)
											}}>See Meal Pack Info</button>
										<button key={uuidv4()} className="button" onClick={async () => {
											await deactivateMealPack(e)
											fetchActivePacks()
										}}>Remove from Favorites</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<footer className="footer"></footer>
			{selectionArr.length > 0 && (
				<div className="selection-footer">
					<div className="selection-popup-container">
						<h1 style={{ color: "black" }}>You have selected {selectionArr.length} meal packs to print</h1>
						<div className="selection-popup-buttons">
							<button key={uuidv4()} className="button is-medium print-all-button" onClick={downloadAllPDF}>Download Selected PDF's</button>
							<button
								onClick={() => {
									setSelectionArr([])
									pastMealPacks.map((meal) => meal.selectedFav = false)
									activeMealPacks.map((meal) => meal.selectedFav = false)
								}} className="button is-medium clear-selection-button">Clear All Selected</button>
						</div>
					</div>
				</div>
			)}
			<MealPackDetailsModal
				selectedMealPack={selectedMealPack}
				setSelectedMealPack={setSelectedMealPack}
				show={show}
				setShow={setShow}
			/>
		</div>
	)
}

export default PastView;
