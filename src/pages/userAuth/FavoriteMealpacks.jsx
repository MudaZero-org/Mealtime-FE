import "../../styles/pages/_activeMealpacks.scss";
import FavoritesView from "./components/FavoritesView";

const FavoriteMealpacks = (props) => {
  const { selectedActivePack, setSelectedActivePastPack, activeMealPacks, setActiveMealPacks, pastMealPacks, setPastMealPacks } = props;

  return (
    <div className="active-mealpacks-page">
      <div className="active-view">
        <FavoritesView
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

export default FavoriteMealpacks;