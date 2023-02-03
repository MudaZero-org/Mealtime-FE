import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import User from "./pages/userAuth/User";
import SignIn from "./pages/userAuth/SignIn";
import SignUp from "./pages/userAuth/SignUp";
import Homepage from "./pages/userAuth/Homepage";
import MealPack from "./pages/userAuth/MealPack";
import Profile from "./pages/userAuth/Profile";
import AllMealpacks from "./pages/userAuth/AllMealpacks";
import Navbar from "./pages/userAuth/components/Navbar";
import FavoriteMealpacks from "./pages/userAuth/FavoriteMealpacks";
import EditProfile from "./pages/userAuth/EditProfile";
import EditPassword from "./pages/userAuth/EditPassword";
import HowToUse from "./pages/userAuth/HowToUse";
import Info from "./pages/info";

function App() {
  const [activeMealPacks, setActiveMealPacks] = useState(null);
  const [pastMealPacks, setPastMealPacks] = useState(null);
  const [selectedActivePack, setSelectedActivePastPack] = useState("hello");
  const [showGuide, setShowGuide] = useState(true);
  const [firstLogIn, setFirstLogIn] = useState(true);
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
        <Route exact path="/user" element={<User />} />
        <Route
          exact
          path="/home"
          element={
            <>
              <Navbar />
              <Homepage
                selectedActivePack={selectedActivePack}
                setSelectedActivePastPack={setSelectedActivePastPack}
                activeMealPacks={activeMealPacks}
                setActiveMealPacks={setActiveMealPacks}
                pastMealPacks={pastMealPacks}
                setPastMealPacks={setPastMealPacks}
                showGuide={showGuide}
                setShowGuide={setShowGuide}
                firstLogIn={firstLogIn}
                setFirstLogIn={setFirstLogIn}
                setImage={setImage}
              />
            </>
          }
        />
        <Route
          exact
          path="/mealpack"
          element={
            <>
              <Navbar />
              <MealPack
                selectedActivePack={selectedActivePack}
                setSelectedActivePastPack={setSelectedActivePastPack}
              />
            </>
          }
        />
        <Route path="/profile">
          <Route
            index
            element={
              <>
                <Navbar />
                <Profile image={image} setImage={setImage} />
              </>
            }
          ></Route>
          <Route
            path="editProfile"
            element={
              <>
                <Navbar />
                <EditProfile image={image} />
              </>
            }
          ></Route>
          <Route
            path="editPassword"
            element={
              <>
                <Navbar />
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
              <Navbar />
              <AllMealpacks
                setActiveMealPacks={setActiveMealPacks}
                setPastMealPacks={setPastMealPacks}
                pastMealPacks={pastMealPacks}
                setSelectedActivePastPack={setSelectedActivePastPack}
              />
            </>
          }
        ></Route>
        <Route
          exact
          path="/favorite-mealpacks"
          element={
            <>
              <Navbar />
              <FavoriteMealpacks
                selectedActivePack={selectedActivePack}
                setSelectedActivePastPack={setSelectedActivePastPack}
                activeMealPacks={activeMealPacks}
                setActiveMealPacks={setActiveMealPacks}
                pastMealPacks={pastMealPacks}
                setPastMealPacks={setPastMealPacks}
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
