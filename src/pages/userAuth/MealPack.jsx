import { useNavigate } from "react-router-dom";
import { useState } from "react"
import "../../styles/pages/_homepage.scss"

const MealPack = (props) => {
  const { selectedActivePack, setSelectedActivePastPack} = props;

  const navigate = useNavigate();
	const rerouteToHome = () => {
		navigate("/home")
	}

  const mealPack = selectedActivePack.recipeDetail;

  return (
    <div className="info-page-container">
      <div className="mealpack-info-page card">
        <img className="food-image" src={mealPack.image}></img>
        <h1>{mealPack.title}</h1>
        <h4>Servings: {mealPack.servings}</h4>
        <div className="ingredients-block">
          <h4>Ingredients:</h4>
          {mealPack.extendedIngredients.map((e) => <p className="ingredient">{e.name}</p>)}
        </div>
        <h4>Instructions:</h4>
        <div className="instructions-block">
          {mealPack.analyzedInstructions[0].steps.map((e) => <p className="instruction"><strong>{e.number}.</strong> {e.step}</p>)}
        </div>
        <div className="wrapper">
          <button className="button to-home-button is-medium is-danger" onClick={rerouteToHome}>Back to Home</button>
        </div>
      </div>
    </div>
  )
}
export default MealPack;