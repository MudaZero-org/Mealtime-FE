import axios from "axios";
import API_URL from "../../../Constants";

//Getting user info
const user = JSON.parse(localStorage.getItem("user"))

const mealpackUtils = {
  fetchUserImageForNav: async (setImage) => {
    const user = JSON.parse(localStorage.getItem("user"));
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setImage(userData.data.profileImg);
  },
  //Mealpacks
  // fetchAllMealPacks: async(setMealpacks, setFavoriteMealpacks) => {
  //   const user = JSON.parse(localStorage.getItem("user"))
	// 		const storeId = user.data.storeId
	// 		let all = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
	// 			headers: { authorization: `Bearer ${user.accessToken}` }
	// 		});
	// 		all.data.map((meal) => {meal.selectedFav = false})
	// 		setMealpacks(all.data)

	// 		let favorites = await axios.get(
	// 			`${API_URL}/store/${storeId}/mealpack/all/favorite`,
	// 			{
	// 				headers: { authorization: `Bearer ${user.accessToken}` },
	// 			}
	// 		);
	// 		favorites.data.map((meal) => meal.selectedFav = false)
	// 		setFavoriteMealpacks(favorites.data);
  // },
  fetchNonFavoriteMealpacks: async (setMealpacks) => {
    
		const storeId = user.data.storeId
		let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
			headers: { authorization: `Bearer ${user.accessToken}` }
		});
		setMealpacks(data.data)
  },
  fetchFavoriteMealpacks: async (setFavoriteMealpacks) => {
		const storeId = user.data.storeId;
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all/favorite`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setFavoriteMealpacks(data.data);
  },
  addMealpackToFavorites: async (meal, setFavoriteMealpacks) => {
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
		setFavoriteMealpacks(data.data);
  },
  removeMealpackFromFavorites: async (meal, setMealpacks) => {
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
		setMealpacks(data.data);
  },
  deleteMealpack: async (meal, setMealpacks) => {
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
		setMealpacks(data.data);
  }



}

export default mealpackUtils