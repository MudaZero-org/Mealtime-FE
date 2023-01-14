import Modal from "react-bootstrap/Modal";

const MealPackModal = (props) => {
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>This is the modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="https://media.istockphoto.com/id/182147903/photo/absurdly-small-diet-meal.jpg?b=1&s=170667a&w=0&k=20&c=CT51JX8x5FvFHF0zLS9z7b7WCpYFBzr-_SY91joRwz0="></img>
        <p>This is the modal body</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleClose}>Add To "My Meal Packs"</button>
      </Modal.Footer>
    </Modal>
  )
}

export default MealPackModal;