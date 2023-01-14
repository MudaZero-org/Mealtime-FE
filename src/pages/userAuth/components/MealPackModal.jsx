import Modal from "react-bootstrap/Modal";

const MealPackModal = (props) => {
  const { show, setShow, selectedMealPack, setSelectedMealPack } = props;

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedMealPack && <h1>{selectedMealPack.title}</h1>}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="https://media.istockphoto.com/id/182147903/photo/absurdly-small-diet-meal.jpg?b=1&s=170667a&w=0&k=20&c=CT51JX8x5FvFHF0zLS9z7b7WCpYFBzr-_SY91joRwz0="></img>
        {selectedMealPack && (
          <div>
            <p>Ingredients: {selectedMealPack.ingredients.join(", ")}</p>
            <p>Servings: {selectedMealPack.servings}</p>
            <h5><strong>Instructions:</strong></h5>
            {selectedMealPack.instructions.map((e) => <p key={e.number}>Step: {e.number}: {e.step}</p>)}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleClose}>Add To "My Meal Packs"</button>
      </Modal.Footer>
    </Modal>
  )
}

export default MealPackModal;