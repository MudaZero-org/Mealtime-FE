import axios from "axios";
import API_URL from "../../../Constants";

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

  }








}

export default homepageUtils;