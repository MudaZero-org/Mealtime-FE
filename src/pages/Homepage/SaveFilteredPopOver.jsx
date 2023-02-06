import {Popover} from "react-bootstrap"
import HomepageUtils from "./utils/homepageUtils"

function SaveFilteredPopOver(user, filterListName, setFilterListName, filterListSaved, setFilterListSaved, filteredInputArr, setFilteredInputArr, setUserFilterLists) { 
  
  return (
    <Popover id="popover-basic">
      <Popover.Body id="popover-body">
        <input className="list-name-input" type="text" placeholder="list name" onChange={(e) => setFilterListName(e.target.value)}></input>
        {filterListSaved ? <button className="button is-small save-filter-button" disabled onClick={() => HomepageUtils.saveFilterList(user, setFilterListSaved, filterListName, filteredInputArr, setUserFilterLists)}>Saved!</button> : <button className="button is-small save-filter-button" onClick={() => HomepageUtils.saveFilterList(user, setFilterListSaved, filterListName, filteredInputArr, setUserFilterLists)}>Save</button>}
      </Popover.Body>
    </Popover>
  );
}
export default SaveFilteredPopOver;