import {Popover} from "react-bootstrap"
import MealpackUtils from "./utils/mealpackUtils"

function DeletePopOver(e, setMealpacks) {
  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Delete mealpack?</Popover.Header>
      <Popover.Body>
          Are you sure you want to <strong>delete</strong> this mealpack?
        </Popover.Body>
        <button
          className="button is-danger"
          variant="primary"
          onClick={async () => {
						await MealpackUtils.deleteMealpack(e, setMealpacks)
						MealpackUtils.fetchNonFavoriteMealpacks(setMealpacks)
          }}
        >
          ✓ Delete
        </button>
        <button
          className="button"
          variant="primary"
          onClick={() => {
            document.body.click()
          }}
        >
          X Cancel
        </button>{" "}
    </Popover>
  );
}

export default DeletePopOver;