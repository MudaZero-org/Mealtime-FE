import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Styling
import "../../styles/pages/_homepage.scss";
import "../../styles/pages/_activeMealpacks.scss"

import MealPackDetailsModal from "./MealPackDetailsModal"
import DeletePopOver from "./DeletePopOver"
import { OverlayTrigger } from 'react-bootstrap';

//Utils for Mealpacks
import MealpackUtils from "./utils/mealpackUtils"

const AllMealPacksView = (props) => {
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const [selectedMealPack, setSelectedMealPack] = useState(null);
	const [selectionArr, setSelectionArr] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all")

	const {
		mealpacks,
		setMealpacks,
		setFavoriteMealpacks,
		setSelectedActivePastPack,
		//Added
		favoriteMealpacks,
	} = props;

	useEffect(() => {
		MealpackUtils.fetchNonFavoriteMealpacks(setMealpacks);
		MealpackUtils.fetchFavoriteMealpacks(setFavoriteMealpacks)
	}, []) // activeMealPacks (causing infinite calls)

	return (
		<div className="past-container">
			<h2 className="past-title">{selectedCategory === "all" ? "All Meal Packs" : "Favorite Meal Packs"}</h2>
			<div className="sidebar-container">
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
					{selectedCategory === "all" && mealpacks ? mealpacks.map((e) => {
						return (
							<div key={uuidv4()} className="tile is-child is-4">
								<div key={uuidv4()} className="active-mealpack-container">
									<img className="food-small-image" src={e.recipeDetail["image"]}></img>
									{MealpackUtils.renderInput(e, selectionArr, setSelectionArr)}

									<p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName} 
									{MealpackUtils.favoriteIcon(e)}
									</strong></p>
									<div className="tags past-mealpacks-tags">
										{e.recipeDetail.vegetarian && <span className="tag" id="vegetarian">vegetarian</span>}
										{e.recipeDetail.vegan && <span className="tag" id="vegan">vegan</span>}
										{e.recipeDetail.glutenFree && <span className="tag" id="gluten">gluten free</span>}
										{e.recipeDetail.dairyFree && <span className="tag" id="dairy">dairy free</span>}
									</div>
									<div className="past-mealpacks-buttons">
										<button key={uuidv4()} className="button tile-button is-small" onClick={() => 
											MealpackUtils.downloadPDF(e)

											}>Download PDF</button>
										<button key={uuidv4()} className="button tile-button is-small" onClick={() => {
											setShow(true)
											setSelectedMealPack(e)
										}}>See Meal Pack Info</button>
										{!e.isFavorite 
											? (
												<button key={uuidv4()} className="button tile-button is-small" onClick={async () => {
													await MealpackUtils.addMealpackToFavorites(e, setFavoriteMealpacks)
													MealpackUtils.fetchNonFavoriteMealpacks(setMealpacks)
												}}>Add to Favorites</button>) 
											: (
												<button key={uuidv4()} className="button tile-button is-small" onClick={async () => {
													await MealpackUtils.removeMealpackFromFavorites(e, setMealpacks)
													MealpackUtils.fetchNonFavoriteMealpacks(setMealpacks)
												}}>Remove from Favorites</button>
											)}
										<OverlayTrigger trigger="click" rootClose placement="top" overlay={DeletePopOver(e, setMealpacks)}>
											<button className="button tile-button is-small">Delete</button>
										</OverlayTrigger>
									</div>
								</div>
							</div>

						);
					}) : favoriteMealpacks && favoriteMealpacks.map((e) => {
						return (
							<div key={uuidv4()} className="tile is-child is-4">
								<div key={uuidv4()} className="active-mealpack-container">
									<img className="food-small-image" src={e.recipeDetail["image"]}></img>
									{MealpackUtils.renderInput(e, selectionArr, setSelectionArr)}

									<p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName}</strong>
									{MealpackUtils.favoriteIcon2(e)}
									</p>
									<div className="tags active-mealpacks-tags">
										{e.recipeDetail.vegetarian && <span className="tag" id="vegetarian">vegetarian</span>}
										{e.recipeDetail.vegan && <span className="tag" id="vegan">vegan</span>}
										{e.recipeDetail.glutenFree && <span className="tag" id="gluten">gluten free</span>}
										{e.recipeDetail.dairyFree && <span className="tag" id="dairy">dairy free</span>}
									</div>
									<div className="active-mealpacks-buttons">
										<button key={uuidv4()} className="button is-small tile-button" onClick={() =>
											MealpackUtils.downloadPDF(e)
											}>Download PDF</button>
										<button key={uuidv4()} className="button is-small tile-button" onClick={() => {
											setShow(true)
											setSelectedMealPack(e)
											}}>See Meal Pack Info</button>
										<button key={uuidv4()} className="button is-small tile-button" onClick={async () => {
											await MealpackUtils.removeMealpackFromFavorites(e, setMealpacks)
											MealpackUtils.fetchFavoriteMealpacks(setFavoriteMealpacks)
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
							<button key={uuidv4()} className="button is-medium print-all-button" onClick={() =>
								MealpackUtils.downloadAllPDF(selectionArr)
								}>Download Selected PDF's</button>
							<button
								onClick={() => {
									setSelectionArr([])
									mealpacks.map((meal) => meal.selectedFav = false)
									favoriteMealpacks.map((meal) => meal.selectedFav = false)
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

export default AllMealPacksView;
