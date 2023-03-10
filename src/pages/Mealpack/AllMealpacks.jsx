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