import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef } from "react";
import "../../../styles/pages/_homepage.scss"

const MealPack = (props) => {
  const { show, setShow, selectedMealPack, setSelectedMealPack } = props;

  const isMounted = useRef(false);

  const handleClose = () => setShow(false);
  let mealPack;

  if(selectedMealPack !== null) {
    mealPack = selectedMealPack.recipeDetail

  }
  

  return (
    <>
    {mealPack !== undefined ? <Modal size="lg"
    centered show={show} onHide={handleClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title>{selectedMealPack && <h1>{selectedMealPack.mealpackName}</h1>}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="mealpack-modal">
          <img className="food-image" style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }} src={mealPack.image}></img>
          <h1>{mealPack.title}</h1>
          <h4>Servings: {mealPack.servings}</h4>
          <div className="ingredients-block">
            <h4>Ingredients:</h4>
            {mealPack.extendedIngredients.map((e) => <p key={uuidv4()} className="ingredient">{e.name}</p>)}
          </div>
        </div>
          <h4>Instructions:</h4>
          <div className="instructions-block">
            {mealPack.analyzedInstructions[0].steps.map((e) => <p key={uuidv4()} className="instruction"><strong>{e.number}.</strong> {e.step}</p>)}
          </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>: ""}

    
    </>
  )
}

export default MealPack;