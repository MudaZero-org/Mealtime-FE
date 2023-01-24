import { useState } from "react";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";

import AuthUtils from "./utils/authenticate";

const SignUp = (props) => {
	const [storeName, setStoreName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [storeManager, setStoreManager] = useState("");
	const [password, setPassword] = useState("");
	const [secondPassword, setSecondPassword] = useState("")
	const [passwordsMatch, setPasswordsMatch] = useState(true)

	const navigate = useNavigate();
	const reroute = () => {
		navigate("/");
	};

	const toTheHomepage = () => {
		navigate("/home");
	};

	return (
		<div className="signup-signin-app">
			<div className="card">
				<div className="card-header has-background-primary-dark">
					<div className="card-header-title is-centered">
						<h1 className="card-title">Mealtime</h1>
					</div>
				</div>
				<div className="card-content">
					<form>
						<div className="input-field">
							<label>Store name:</label>
							<input
								type="text"
								placeholder="Enter store name"
								onChange={(e) => {
									setStoreName(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Email Address:</label>
							<input
								type="email"
								placeholder="Enter email address"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Password:</label>
							<input
								type="password"
								placeholder="Enter password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Password:</label>
							<input
								type="password"
								placeholder="Re-enter password"
								onChange={(e) => {
									setSecondPassword(e.target.value);
								}}
							></input>
						</div>
						{passwordsMatch === false && <p style={{ textAlign: "center", marginTop: "1rem", color: "red" }}><em>Passwords don't match!</em></p>}
						<div className="input-field">
							<button className="button is-medium"
								onClick={async (e) => {
									e.preventDefault();
									try {
										if (password !== secondPassword) {
											setPasswordsMatch(false)
											return;
										}

										AuthUtils.signUp(
											storeName,
											companyName,
											postalCode,
											address,
											phoneNumber,
											email,
											storeManager,
											password
										).then((res) => {
											toTheHomepage();
										});
									} catch (error) {
										console.log(error);
									}
								}}
							>Signup</button>
						</div>
						<div className="spacer"></div>
					</form>
					<div className="input-field">
						<p>Already have an account? <a onClick={reroute} className="register-link">Login here!</a></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
