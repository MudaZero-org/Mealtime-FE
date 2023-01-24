import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import User from "./pages/userAuth/User";
import SignIn from "./pages/userAuth/SignIn";
import SignUp from "./pages/userAuth/SignUp";
import Homepage from "./pages/userAuth/Homepage";
import MealPack from "./pages/userAuth/MealPack";
import Profile from "./pages/userAuth/Profile";
import PastMealpacks from "./pages/userAuth/PastMealpacks";
import Navbar from "./pages/userAuth/components/Navbar";

function App() {
  const [activeMealPacks, setActiveMealPacks] = useState(null);
  const [pastMealPacks, setPastMealPacks] = useState(null);
  const [selectedActivePack, setSelectedActivePastPack] = useState("hello");

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
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
        <Route
          exact
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        ></Route>
        <Route
          exact
          path="/past-mealpacks"
          element={
            <>
              <Navbar />
              <PastMealpacks />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
