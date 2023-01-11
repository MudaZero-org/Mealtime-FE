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
			<div className="input-container">
				<p className="input-instructions">Type or paste ingredients below<br></br><em>(each ingredient on a new line)</em></p>
				<textarea className="input-box" cols="50" rows="10" placeholder="eggplant&#10;white rice&#10;daikon"></textarea>
				<button className="generate-button">Generate Meal Packs</button>
			</div>
			<ActiveView
				activeMealPacks={activeMealPacks}
				setActiveMealPacks={setActiveMealPacks}
			/>
      <button>Edit Active Meal Packs</button>
			<PastView pastMealPacks={pastMealPacks} setPastMealPacks={setPastMealPacks} />
		</div>
	);
};

export default Homepage;
