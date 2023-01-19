import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


const PastView = (props) => {
  const { pastMealPacks, setPastMealPacks, setActiveMealPacks } = props;

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"))
		  const storeId = user.data.userId
      // let data = await axios.get(`store/${storeId}/mealpack/all/status/false`);
      // setPastMealPacks(data)
    }
    fetchData();
  }, [pastMealPacks])

  const navigate = useNavigate();
	const rerouteToMealpack = () => {
		navigate("/mealpack")
	}

  const activateMealPack = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
		const storeId = user.data.userId
    // axios.put(`/store/${storeId}/mealpack/:mealpack_id`, {
    //     is_publishing: true,
    // })
    // let data = await axios.get(`store/${storeId}/mealpack/all/status/true`)
    // setActiveMealPacks(data)
  }

  return (
    <div className="past-container">
      <h2>This is the past view component</h2>

      {pastMealPacks && pastMealPacks.map((e) => {
        return (
          <div>
            <p onClick={rerouteToMealpack}>{e.name}</p>
            <button onClick={activateMealPack} style={{ marginBottom: "10px" }}>Activate Meal Pack</button>
          </div>
        );
      })}
    </div>
  )
}

export default PastView;