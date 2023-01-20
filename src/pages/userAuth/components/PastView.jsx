import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/_homepage.scss";


const PastView = (props) => {
  const { pastMealPacks, setPastMealPacks, activeMealPacks, setActiveMealPacks } = props;

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"))
		  const storeId = user.data.userId
      let data = await axios.get(`store/${storeId}/mealpack/all/status/false`);
      setPastMealPacks(data.data)
    }
    fetchData();
  }, [activeMealPacks])

  const navigate = useNavigate();
	const rerouteToMealpack = () => {
		navigate("/mealpack")
	}

  const activateMealPack = async (meal) => {
    const user = JSON.parse(localStorage.getItem("user"))
		const storeId = user.data.userId
    await axios.put(`/store/${storeId}/mealpack/${meal.id}`, {
        is_publishing: true,
    })
    let data = await axios.get(`store/${storeId}/mealpack/all/status/true`)
    setActiveMealPacks(data.data)
  }

  return (
    <div className="past-container">
      <h2 className="past-title">Past Meal Packs <em>&#40;inactive&#41;</em></h2>

      {pastMealPacks && pastMealPacks.map((e) => {
        return (
          <div>
            <p onClick={rerouteToMealpack}>{e.mealpackName}</p>
            <button onClick={() => activateMealPack(e)} style={{ marginBottom: "10px" }}>Activate Meal Pack</button>
          </div>
        );
      })}
    </div>
  )
}

export default PastView;