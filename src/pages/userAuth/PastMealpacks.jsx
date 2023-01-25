import PastView from "./components/PastView";
import "../../styles/pages/_pastMealpacks.scss";

const PastMealpacks = (props) => {
  const { setActiveMealPacks, setPastMealPacks, pastMealPacks, setSelectedActivePastPack } = props;

  return (
    <div className="past-mealpacks-page">
      <div className="past-view">
					<PastView
						setActiveMealPacks={setActiveMealPacks}
						setPastMealPacks={setPastMealPacks}
						pastMealPacks={pastMealPacks}
						setSelectedActivePastPack={setSelectedActivePastPack}
					/>
				</div>
    </div>
  )
}

export default PastMealpacks;