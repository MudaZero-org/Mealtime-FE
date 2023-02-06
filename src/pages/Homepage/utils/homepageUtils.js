import axios from "axios";
import API_URL from "../../../Constants";
import { v4 as uuidv4 } from 'uuid';

//
import vegetarianArr from "./vegetarian.json";
import dairyFreeArr from "./dairyFree.json";
import glutenFreeArr from "./glutenFree.json";

const homepageUtils = {
  //For Quick Guide
  onPrevClick: (ref) => {
    ref.current.prev();
  },
  onNextClick: (ref) => {
    ref.current.next();
  },
  fetchUserFilterData: async(setUserFilterLists, setImage) => {
    const user = JSON.parse(localStorage.getItem("user"));
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setImage(userData.data.profileImg);
			let response = await axios.get(`${API_URL}/store/${user.data.storeId}/filter_list`, {
					headers: {authorization: `Bearer ${user.accessToken}`}
				})
			setUserFilterLists(response.data)
  },

  //For Meal Packs

  generateMealPacks: async(isMounted, user, ingredientArr, filteredArr, setMealPacks) => {
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
  },
  makeArr: (setSuccessfulSave, ingredientInputArr, setIngredientArr, filteredInputArr, setFilteredArr) => {
    setSuccessfulSave(false)
		let ingredientArr = [...ingredientInputArr]
		setIngredientArr(ingredientArr)
		let filteredArr = [...filteredInputArr]
		setFilteredArr(filteredArr)
  },
  addToMyMealPacks: (meal, myMealPacks, setMyMealPacks) => {
    let array = [...myMealPacks];
		array.push(meal);
		setMyMealPacks(array);
  },
  removeFromMyMealPacks: (meal, myMealPacks, setMyMealPacks) => {
    let array = [...myMealPacks];
		array.splice(array.indexOf(meal), 1);
		setMyMealPacks(array);
  },
  publishMealPack: async (user, myMealPacks) => {
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
  },
  clearIngredientInput: () => {
    let input = document.getElementById("userIngredientInput");
		input.value = "";
  },
  clearFilteredInput: () => {
    let input = document.getElementById("userFilteredInput");
		input.value = "";
  },
  removeIngredient: (ingredient, ingredientInputArr, setIngredientInputArr) => {
    const arr = [...ingredientInputArr];
		arr.splice(arr.indexOf(ingredient), 1)
		setIngredientInputArr(arr)
  },
  removeFiltered: (ingredient, filteredInputArr, setFilteredInputArr) => {
    const arr = [...filteredInputArr];
		arr.splice(arr.indexOf(ingredient), 1)
		setFilteredInputArr(arr)
  },
  ingredientKeyHandler: (ingredientInputArr, ingredientInput, setIngredientInputArr, setIngredientInput) => {
			let arr = [...ingredientInputArr]
			arr.unshift(ingredientInput)
			if (ingredientInput) {
				setIngredientInputArr(arr)
				homepageUtils.clearIngredientInput();
				setIngredientInput(null)
		}
  },
  filteredKeyHandler: (filteredInputArr, filteredInput,setFilteredInputArr, setFilteredInput) => {
    let arr = [...filteredInputArr]
			arr.unshift(filteredInput)
			if (filteredInput) {
				setFilteredInputArr(arr)
				homepageUtils.clearFilteredInput();
				setFilteredInput(null)
			}
  },
  //Accordion setting?
  accordionSetting: () => {
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
  },
  addFilters: (type, filteredInputArr, setFilteredInputArr, setFilteredInput) => {
    let arr = [...filteredInputArr]
		switch(type) {
			case "veg":
				for (let x of vegetarianArr) {
					arr.unshift(x)
				}
				setFilteredInputArr(arr)
				//Refactored this
				// clearFilteredInput();
				homepageUtils.clearFilteredInput();
				setFilteredInput(null)
				break;
			
			case "glu":
				for (let x of glutenFreeArr) {
					arr.unshift(x)
				}
				setFilteredInputArr(arr)
				//Refactored this
				// clearFilteredInput();
				homepageUtils.clearFilteredInput();
				setFilteredInput(null)
				break;
			
			case "dai":
				for (let x of dairyFreeArr) {
					arr.unshift(x)
				}
				setFilteredInputArr(arr)
				//Refactored this
				// clearFilteredInput();
				homepageUtils.clearFilteredInput();
				setFilteredInput(null)
				break;
		}
  },
  renderAddButton: (meal, setSuccessfulSave, myMealPacks, setMyMealPacks) => {
    if (!meal.clicked) {
			return (
				<button
					key={uuidv4()}
					className="mealpack-add-button button is-medium"
					onClick={() => {
						setSuccessfulSave(false);
						homepageUtils.addToMyMealPacks(meal, myMealPacks, setMyMealPacks)
						homepageUtils.toggleAddButton(meal);
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
  },
  toggleAddButton: (meal) => {
    meal.clicked = !meal.clicked;
  },
  toggleDropDown: () => {
    let dropdown = document.getElementsByClassName("dropdown")[0];
		dropdown.classList.toggle("is-active")
  },
  makeFilterLists: (userFilterLists, setFilteredInputArr, setFilteredInput) => {
    return (
			<div className="dropdown-content">
				{userFilterLists.map((list) => {
					return (
						<a key={uuidv4()} href="#" className="dropdown-item" onClick={() => homepageUtils.fillFilteredFields(list, setFilteredInputArr, setFilteredInput)}>
							{list.filterName}
						</a>
					);
				})}
			</div>
		)
  },
  fillFilteredFields: (list, setFilteredInputArr, setFilteredInput) => {
    setFilteredInputArr(list.filteredIngredients)
		homepageUtils.clearFilteredInput();
		setFilteredInput(null)
  },
  saveFilterList: async (user, setFilterListSaved, filterListName, filteredInputArr, setUserFilterLists) => {
    console.log(user.data.storeId)
    setFilterListSaved(true)
		await axios.post(`${API_URL}/store/${user.data.storeId}/filter_list`, 
		{
			filterName: filterListName,
			filteredIngredients: filteredInputArr
		},
		{
			headers: {authorization: `Bearer ${user.accessToken}`}
		})
		let response = await axios.get(`${API_URL}/store/${user.data.storeId}/filter_list`, {
			headers: {authorization: `Bearer ${user.accessToken}`}
		})
		setUserFilterLists(response.data)
  },
  








}

export default homepageUtils;