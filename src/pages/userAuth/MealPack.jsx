import { useNavigate } from "react-router-dom";

const MealPack = (props) => {
  const { selectedActivePack, setSelectedActivePack} = props;

  const navigate = useNavigate();
	const rerouteToHome = () => {
		navigate("/home")
	}

  return (
    <div>
      <h1>This is the meal pack page</h1>
      <button onClick={rerouteToHome}>Back to Home</button>
    </div>
  )
}
export default MealPack;