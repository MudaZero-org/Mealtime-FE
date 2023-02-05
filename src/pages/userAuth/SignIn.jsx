import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "../../styles/pages/_signin-up.scss";

import AuthUtils from "./utils/authenticate";

const SignIn = () => {
	//Props for changing to homepage view

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate("/home")
		}

		console.log("HI!")

		// else {
		//   setUserView("profile")
		// }
	}, []);



	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginFailed, setLoginFailed] = useState(false);

	
	const reroute = () => {
		navigate("/signup");
	};

	const toTheHomepage = () => {
		navigate("/home");
	};

	return (
		<div className="signup-signin-app">
			<div className="card">
				<header className="card-header has-background-primary-dark">
					<div className="card-header-title is-centered">
						<h1 className="card-title">Mealtime</h1>
					</div>
				</header>
				<div className="card-content login-content">
					<form className="form">
						<div className="input-field">
							<label>Email</label><br></br>
							<input
								className="text-input-field input"
								type="text"
								placeholder="Email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Password</label><br></br>
							<input
								className="text-input-field input"
								type="password"
								placeholder="Password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							></input>
						</div>
						<div className="login-button">
							<button className="button is-large" id="login-button"
								onClick={async (e) => {
									e.preventDefault();
									try {
										await AuthUtils.logIn(email, password).then((res) => {
											toTheHomepage();
										});
									} catch (error) {
										setLoginFailed(true)
									}
								}}
							>Login</button>
						</div>
						{loginFailed && <p style={{ color: "red", textAlign: "center" }}><em>Incorrect Username and/or Password</em></p>}
						<div className="spacer"></div>
						<div className="input-field signup-text">
							<p>Don't have an account?<br></br> <a className="register-link" onClick={reroute}>Sign up here!</a></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
