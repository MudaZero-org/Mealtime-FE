import ActiveView from "./components/ActiveView";
import PastView from "./components/PastView";

const Homepage = (props) => {
	const {
		activeMealPacks,
		setActiveMealPacks,
		pastMealPacks,
		setPastMealPacks,
	} = props;

	return (
		<div>
			<h1>This is the homepage</h1>
			<ActiveView
				activeMealPacks={activeMealPacks}
				setActiveMealPacks={setActiveMealPacks}
			/>
      <button>Edit Active Meal Packs</button>
			<PastView pastMealPacks={pastMealPacks} setPastMealPacks={setPastMealPacks} />       {/* Add overlay to add back to active meal pack list */}
		</div>
	);
};

export default Homepage;
