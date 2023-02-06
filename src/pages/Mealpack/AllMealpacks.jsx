import { useEffect } from "react";

//All mealpacks view
import AllMealpacksView from "./AllMealpacksView";

//Styling
import "../../styles/pages/_pastMealpacks.scss";


//Utils for Mealpacks
import MealpackUtils from "./utils/mealpackUtils"


const AllMealpacks = (props) => {
  const { setImage, setFavoriteMealpacks, setMealpacks, mealpacks, setSelectedActivePastPack, favoriteMealpacks } = props;

	useEffect(() => {
		//Removed this
		// async function fetchUserData() {
		// 	const user = JSON.parse(localStorage.getItem("user"));
		// 	const userID = user.data.storeId;
		// 	const userData = await axios.get(`${API_URL}/user/${userID}`, {
		// 		headers: { authorization: `Bearer ${user.accessToken}` },
		// 	});
		// 	setImage(userData.data.profileImg);
		// }
		// fetchUserData();
		MealpackUtils.fetchUserImageForNav(setImage)
	}, []);

  return (
    <div className="past-mealpacks-page">
      <div className="past-view">
					<AllMealpacksView
						setFavoriteMealpacks={setFavoriteMealpacks}
						setMealpacks={setMealpacks}
						mealpacks={mealpacks}
						setSelectedActivePastPack={setSelectedActivePastPack}
						favoriteMealpacks={favoriteMealpacks}
					/>
				</div>
    </div>
  )
}

export default AllMealpacks;