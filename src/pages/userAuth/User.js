import { useState, useEffect } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const User = (props) => {
	// const { setCurrentView } = props;

	const [currentView, setCurrentView] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("userAuth")) {
			setCurrentView(<SignIn setCurrentView={setCurrentView} />);
		}
		// else {
		//   setUserView("profile")
		// }
	}, []);

	return (
		<div>
			{currentView}
			HELLO WORLD
		</div>
	);
};

export default User;
