import axios from "axios";
import API_URL from "../../../Constants";

const mealpackUtils = {
  fetchUserImageForNav: async (setImage) => {
    const user = JSON.parse(localStorage.getItem("user"));
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setImage(userData.data.profileImg);
  },
  fetchAllMealPacks: async(setPastMealPacks, setActiveMealPacks) => {
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
  },
}

export default mealpackUtils