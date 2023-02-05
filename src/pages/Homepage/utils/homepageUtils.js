import axios from "axios";

const homepageUtils = {
  //For Quick Guide
  onPrevClick: (ref) => {
    ref.current.prev();
  },
  onNextClick: (ref) => {
    ref.current.next();
  },
  handleSelect: (selectedIndex, setIndex) => {
    console.log(selectedIndex)
    console.log(setIndex)
  }





}

export default homepageUtils;