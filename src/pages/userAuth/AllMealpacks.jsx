import AllMealpacksView from "./components/AllMealpacksView";
import "../../styles/pages/_pastMealpacks.scss";

const AllMealpacks = (props) => {
  const { setActiveMealPacks, setPastMealPacks, pastMealPacks, setSelectedActivePastPack } = props;

  return (
    <div className="past-mealpacks-page">
      <div className="past-view">
					<AllMealpacksView
						setActiveMealPacks={setActiveMealPacks}
						setPastMealPacks={setPastMealPacks}
						pastMealPacks={pastMealPacks}
						setSelectedActivePastPack={setSelectedActivePastPack}
					/>
				</div>
    </div>
  )
}

export default AllMealpacks;