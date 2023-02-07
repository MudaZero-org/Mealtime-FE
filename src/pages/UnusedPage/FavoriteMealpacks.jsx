import "../../styles/pages/_activeMealpacks.scss";
import FavoritesView from "./components/FavoritesView";
import { useEffect } from "react";
import API_URL from "../../Constants";
import axios from "axios";

const FavoriteMealpacks = (props) => {
  const { setImage, selectedActivePack, setSelectedActivePastPack, activeMealPacks, setActiveMealPacks, pastMealPacks, setPastMealPacks } = props;

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

  return (
    <div className="active-mealpacks-page">
      <div className="active-view">
        <FavoritesView
          selectedActivePack={selectedActivePack}
          setSelectedActivePastPack={setSelectedActivePastPack}
          activeMealPacks={activeMealPacks}
          setActiveMealPacks={setActiveMealPacks}
          pastMealPacks={pastMealPacks}
          setPastMealPacks={setPastMealPacks}
        />
      </div>
    </div>
  )
}

export default FavoriteMealpacks;