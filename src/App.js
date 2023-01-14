import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import User from "./pages/userAuth/User";
import SignIn from "./pages/userAuth/SignIn";
import SignUp from "./pages/userAuth/SignUp";
import Homepage from "./pages/userAuth/Homepage";
import MealPack from "./pages/userAuth/MealPack";

function App() {
  const [activeMealPacks, setActiveMealPacks] = useState(null);
  const [pastMealPacks, setPastMealPacks] = useState(null);
  const [selectedActivePack, setSelectedActivePack] = useState(null);

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
            <Homepage
              selectedActivePack={selectedActivePack}
              setSelectedActivePack={setSelectedActivePack}
              activeMealPacks={activeMealPacks}
              setActiveMealPacks={setActiveMealPacks}
              pastMealPacks={pastMealPacks}
              setPastMealPacks={setPastMealPacks}
            />
          }
        />
        <Route
          selectedActivePack={selectedActivePack}
          setSelectedActivePack={setSelectedActivePack}
          exact
          path="/mealpack"
          element={<MealPack />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
