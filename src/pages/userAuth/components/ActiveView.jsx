const ActiveView = (props) => {
  const { activeMealPacks, setActiveMealPacks } = props;

  return (
    <div className="active-container">
      <h2>This is the active view component</h2>
      <p>item1</p>
      <p>item2</p>
      <p>item1</p>

    </div>
  )
}

export default ActiveView;