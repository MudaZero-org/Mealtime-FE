import AllMealpacksView from "./components/AllMealpacksView";
import "../../styles/pages/_pastMealpacks.scss";
import { useEffect } from "react";
import API_URL from "../../Constants";
import axios from "axios";


const AllMealpacks = (props) => {
  const { setImage, setActiveMealPacks, setPastMealPacks, pastMealPacks, setSelectedActivePastPack } = props;

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
    <div className="past-mealpacks-page">
      <div className="past-view">
					<AllMealpacksView
						setActiveMealPacks={setActiveMealPacks}
						setPastMealPacks={setPastMealPacks}
						pastMealPacks={pastMealPacks}
						setSelectedActivePastPack={setSelectedActivePastPack}
					/>
				</div>
    </div>
  )
}

export default AllMealpacks;