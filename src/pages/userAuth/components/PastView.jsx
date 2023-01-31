import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/_homepage.scss";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../../Constants";
import MealPackDetailsModal from "./MealPackDetailsModal"

const PastView = (props) => {
  const [show, setShow] = useState(false);
	const [selectedMealPack, setSelectedMealPack] = useState(null);

	const {
		pastMealPacks,
		setPastMealPacks,
		setActiveMealPacks,
		setSelectedActivePastPack,
	} = props;

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"))
		  const storeId = user.data.storeId
      let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all/status/false`,{
        headers: {authorization: `Bearer ${user.accessToken}`}
      });
      setPastMealPacks(data.data)
    }
    fetchData();
  }, []) // activeMealPacks (causing infinite calls)

  // fetchPastPacks copies above useEffect, wittout causing infinite loop
  const fetchPastPacks = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const storeId = user.data.storeId
    let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all/status/false`, {
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
    setPastMealPacks(data.data)
}

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
				isPublishing: true,
				mealpackName: meal.mealpackName,
				isDelete: false,
			},
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all/status/true`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setActiveMealPacks(data.data);
	};

	return (
		<div className="past-container">
			<h2 className="past-title">
				Meal Packs <em>&#40;inactive&#41;</em>
			</h2>

      <div className="tile is-parent past-mealpacks">
        {pastMealPacks && pastMealPacks.map((e) => {
          return (
            <div key={uuidv4()} className="tile is-child is-4">
              <div key={uuidv4()} className="past-mealpack-container">
                <img className="food-small-image" src={e.recipeDetail["image"]}></img>
                <p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName}</strong></p>
                <div className="tags past-mealpacks-tags">
                  {e.recipeDetail.vegetarian && <span className="tag" id="vegetarian">vegetarian</span>}
                  {e.recipeDetail.vegan && <span className="tag" id="vegan">vegan</span>}
                  {e.recipeDetail.glutenFree && <span className="tag" id="gluten">gluten free</span>}
                  {e.recipeDetail.dairyFree && <span className="tag" id="dairy">dairy free</span>}
                </div>
                <div className="past-mealpacks-buttons">
                  <button key={uuidv4()} className="button" onClick={() => {
                    //Old Code
                    // rerouteToMealpack(e)
                    setShow(true)
										setSelectedMealPack(e)
                    }}>See Meal Pack Info</button>
                  <button key={uuidv4()} className="button" onClick={async () => {
                    await activateMealPack(e)
                    fetchPastPacks()
                  }} style={{ marginBottom: "10px" }}>Add to Favorites</button>
                </div>
              </div>
            </div>

          );
        })}
      </div>
      <footer className="footer"></footer>
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
