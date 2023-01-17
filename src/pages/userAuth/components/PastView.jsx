import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


const PastView = (props) => {
  const { pastMealPacks, setPastMealPacks, setActiveMealPacks } = props;

  useEffect(() => {
    async function fetchData() {
      // let data = await axios.get(`store/:store_id/mealpack/all/past`);
      // setPastMealPacks(data)
    }
    fetchData();
  }, [pastMealPacks])

  const navigate = useNavigate();
	const rerouteToMealpack = () => {
		navigate("/mealpack")
	}

  const activateMealPack = async () => {
    // axios.put(`/store/:store_id/mealpack/:mealpack_id`, {
    //     is_publishing: true,
    // })
    // let data = await axios.get(`store/:store_id/mealpack/all/current`)
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