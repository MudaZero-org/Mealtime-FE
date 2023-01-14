import { useNavigate } from "react-router-dom";

const ActiveView = (props) => {
  const { activeMealPacks, setActiveMealPacks } = props;

  const navigate = useNavigate();
	const rerouteToMealpack = () => {
		navigate("/mealpack")
	}

  return (
    <div className="active-container">
      <h2>This is the active view component</h2>
      <p onClick={rerouteToMealpack}>spaghetti</p>
      <p onClick={rerouteToMealpack}>chicken and broccoli</p>
      <p onClick={rerouteToMealpack}>ham sandwich</p>

    </div>
  )
}

export default ActiveView;