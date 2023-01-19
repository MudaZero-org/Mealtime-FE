import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/_signin.scss";

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
		<div className="signin-app">
			<div className="card">
				<div className="card-header has-background-primary-dark">
					<div className="card-header-title is-centered">
						<h1 className="card-title">MudaZero</h1>
					</div>
				</div>
				<div className="card-content">
					<form>
						<div className="input-field">
							<label>Email Address:</label>
							<input
								type="text"
								placeholder="Email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Password:</label>
							<input
								type="password"
								placeholder="Password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<button className="button is-medium"
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
								Login
							</button>
						</div>
						<div className="spacer"></div>
						<div className="input-field">
							<p>Don't have an account? <a className="register-link" onClick={reroute}>Sign up here!</a></p>
						</div>
						<div className="input-field">
							Delete Auth!
							<button className="button"
								onClick={() => {
									AuthUtils.logOut();
								}}
							>
								Click here!
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
