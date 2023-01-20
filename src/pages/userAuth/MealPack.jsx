import { useNavigate } from "react-router-dom";
import { useState } from "react"

const MealPack = (props) => {
  const { selectedActivePack, setSelectedActivePastPack} = props;

  const navigate = useNavigate();
	const rerouteToHome = () => {
		navigate("/home")
	}

  return (
    <div>
      <h1>This is the meal pack page</h1>
      {selectedActivePack && <p>{JSON.stringify(selectedActivePack)}</p>}
      <button onClick={rerouteToHome}>Back to Home</button>
    </div>
  )
}
export default MealPack;