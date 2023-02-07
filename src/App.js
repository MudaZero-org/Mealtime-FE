import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//User
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";

//Profile
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import EditPassword from "./pages/Profile/EditPassword";

//Homepage
import Homepage from "./pages/Homepage/Homepage";


//Mealpacks
import AllMealpacks from "./pages/Mealpack/AllMealpacks";

//NavBar
import Navbar from "./pages//Navbar";

import Info from "./pages/info";

function App() {
  const [favoriteMealpacks, setFavoriteMealpacks] = useState(null);
  const [mealpacks, setMealpacks] = useState(null);
  const [selectedActivePack, setSelectedActivePastPack] = useState("hello");
  const [showGuide, setShowGuide] = useState(false);
  const [firstLogIn, setFirstLogIn] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route
          exact
          path="/signup"
          element={
            <SignUp
              showGuide={showGuide}
              setShowGuide={setShowGuide}
              firstLogIn={firstLogIn}
              setFirstLogIn={setFirstLogIn}
            />
          }
        />
        <Route
          exact
          path="/home"
          element={
            <>
              <Navbar image={image} />
              <Homepage
                selectedActivePack={selectedActivePack}
                setSelectedActivePastPack={setSelectedActivePastPack}
                favoriteMealpacks={favoriteMealpacks}
                setfavoriteMealpacks={setFavoriteMealpacks}
                mealpacks={mealpacks}
                setMealpacks={setMealpacks}
                showGuide={showGuide}
                setShowGuide={setShowGuide}
                firstLogIn={firstLogIn}
                setFirstLogIn={setFirstLogIn}
                setImage={setImage}
              />
            </>
          }
        />
        <Route path="/profile">
          <Route
            index
            element={
              <>
                <Navbar image={image} />
                <Profile image={image} setImage={setImage} />
              </>
            }
          ></Route>
          <Route
            path="editProfile"
            element={
              <>
                <Navbar image={image} />
                <EditProfile image={image} />
              </>
            }
          ></Route>
          <Route
            path="editPassword"
            element={
              <>
                <Navbar image={image} />
                <EditPassword />
              </>
            }
          ></Route>
        </Route>
        <Route
          exact
          path="/all-mealpacks"
          element={
            <>
              <Navbar image={image} />
              <AllMealpacks
                setImage={setImage}
                setFavoriteMealpacks={setFavoriteMealpacks}
                setMealpacks={setMealpacks}
                mealpacks={mealpacks}
                setSelectedActivePastPack={setSelectedActivePastPack}
                //Added more here
                favoriteMealpacks={favoriteMealpacks}
              />
            </>
          }
        ></Route>
        <Route exact path="/info/:recipeId" element={<Info />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
