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
        <img style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }} src={selectedMealPack && selectedMealPack.image}></img>
        {selectedMealPack && (
          <div>
            <h4>Included Ingredients: </h4>
            {selectedMealPack.usedIngredients.map((e, index) => <p key={index}>-{e.original}</p>)}
            <h4>Missing Ingredients: </h4>
            {selectedMealPack.missedIngredients.map((e, index) => <p key={index}>-{e.original}</p>)}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={handleClose}>Close</button>
        <button className="button" onClick={handleClose}>Add To "My Meal Packs"</button>
      </Modal.Footer>
    </Modal>
  )
}

export default MealPackModal;