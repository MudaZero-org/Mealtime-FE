import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/_homepage.scss";
import { v4 as uuidv4 } from 'uuid';

const PastView = (props) => {
  const { pastMealPacks, setPastMealPacks, activeMealPacks, setActiveMealPacks, setSelectedActivePastPack } = props;

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"))
		  const storeId = user.data.userId
      let data = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/false`,{
        headers: {authorization: `Bearer ${user.accessToken}`}
      });
      setPastMealPacks(data.data)
    }
    fetchData();
  }, []) // activeMealPacks (causing infinite calls)

  // fetchPastPacks copies above useEffect, wittout causing infinite loop
  const fetchPastPacks = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const storeId = user.data.userId
    let data = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/false`, {
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
    const user = JSON.parse(localStorage.getItem("user"))
		const storeId = user.data.userId
    await axios.put(`http://13.231.182.135:8080/store/${storeId}/mealpack/${meal.id}`, {
        isPublishing: true,
        mealpackName: meal.mealpackName,
        isDelete: false
    }, 
    {
			headers: {authorization: `Bearer ${user.accessToken}`}
		})
    let data = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/true`, {
			headers: {authorization: `Bearer ${user.accessToken}`}
		})
    setActiveMealPacks(data.data)
  }

  return (
    <div className="past-container">
      <h2 className="past-title">Past Meal Packs <em>&#40;inactive&#41;</em></h2>

      {pastMealPacks && pastMealPacks.map((e) => {
        return (
          <div key={uuidv4()} className="past-mealpack-container">
            <p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName}</strong> meal pack</p>
            <button key={uuidv4()} className="button" onClick={() => rerouteToMealpack(e)}>See Meal Pack Info</button>
            <button key={uuidv4()} className="button" onClick={async () => {
              await activateMealPack(e)
              fetchPastPacks()
            }} style={{ marginBottom: "10px" }}>Activate Meal Pack</button>
          </div>
        );
      })}
    </div>
  )
}

export default PastView;