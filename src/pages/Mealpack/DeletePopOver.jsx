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
            //As of the moment to check if it is working
						//Removed this
            // await deleteMealPack(e)
						await MealpackUtils.deleteMealpack(e, setMealpacks)
						//Removed this
            // fetchPastPacks()
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