import "../../styles/pages/_activeMealpacks.scss";
import ActiveView from "./components/ActiveView";

const ActiveMealpacks = (props) => {
  const { selectedActivePack, setSelectedActivePastPack, activeMealPacks, setActiveMealPacks, pastMealPacks, setPastMealPacks } = props;

  return (
    <div className="active-mealpacks-page">
      <div className="active-view">
        <ActiveView
          selectedActivePack={selectedActivePack}
          setSelectedActivePastPack={setSelectedActivePastPack}
          activeMealPacks={activeMealPacks}
          setActiveMealPacks={setActiveMealPacks}
          pastMealPacks={pastMealPacks}
          setPastMealPacks={setPastMealPacks}
        />
      </div>
    </div>
  )
}

export default ActiveMealpacks;