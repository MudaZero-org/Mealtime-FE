import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthUtils from "./utils/authenticate";

const SignIn = (props) => {
	//Props for changing to homepage view

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	const navigate = useNavigate();
	const reroute = () => {
		navigate("/signup");
	};

	const toTheHomepage = () => {
		navigate("/home");
	};

	return (
		<div>
			This is from the sign in
			<form>
				<label>Email Address:</label>
				<input
					type="text"
					placeholder="Email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				></input>
				<label>Password:</label>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				></input>
				<button
					onClick={async (e) => {
						e.preventDefault();
						try {
							await AuthUtils.logIn(email, password).then((res) => {
								toTheHomepage();
							});
						} catch (error) {
							// 	//Error Handling
							// 	if (err === "") {
							// 		//If there is no error send user to "homepage"
							// 		// setCurrentView("home")
							// 	}
							// });
						}
					}}
				>
					Submit
				</button>
				<div>
					Don't have an account?
					<button
						onClick={() => {
							reroute();
						}}
					>
						Click here!
					</button>
				</div>
				<div>
					Delete Auth!
					<button
						onClick={() => {
							AuthUtils.logOut();
						}}
					>
						Click here!
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
