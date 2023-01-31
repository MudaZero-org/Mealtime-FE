import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthUtils from "./utils/authenticate";

const SignUp = (props) => {
	const [storeName, setStoreName] = useState("");
	const [companyName, setCompanyName] = useState("test-company");
	const [postalCode, setPostalCode] = useState(12345);
	const [address, setAddress] = useState("test-address");
	const [phoneNumber, setPhoneNumber] = useState(67890);
	const [email, setEmail] = useState("");
	const [storeManager, setStoreManager] = useState("test-manager");
	const [password, setPassword] = useState("");
	const [secondPassword, setSecondPassword] = useState("")
	const [passwordsMatch, setPasswordsMatch] = useState(true)

	const navigate = useNavigate();

	return (
		<div className="signup-signin-app">
			<div className="card">
				<div className="card-header has-background-primary-dark">
					<div className="card-header-title is-centered">
						<h1 className="card-title">Mealtime</h1>
					</div>
				</div>
				<div className="card-content signup-content">
					<form className="form">
						<div className="input-field">
							<label>Store Name</label>
							<input
								className="text-input-field input"
								type="text"
								placeholder="Store Name"
								onChange={(e) => {
									setStoreName(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Email</label>
							<input
								className="text-input-field input"
								type="email"
								placeholder="Email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Password</label>
							<input
								className="text-input-field input"
								type="password"
								placeholder="Password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							></input>
						</div>
						<div className="input-field">
							<label>Password</label>
							<input
								className="text-input-field input"
								type="password"
								placeholder="Re-enter Password"
								onChange={(e) => {
									setSecondPassword(e.target.value);
								}}
							></input>
						</div>
						{passwordsMatch === false && <p style={{ textAlign: "center", marginTop: "1rem", color: "red" }}><em>Passwords don't match!</em></p>}
						<div className="input-field signup-button">
							<button className="button is-large"
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
											navigate("/howToUse");
										});
									} catch (error) {
										console.log(error);
									}
								}}
							>Signup</button>
						</div>
						<div className="spacer"></div>
						<div className="input-field login-text">
							<p>Already have an account?<br></br> <a onClick={() => navigate("/")} className="register-link">Login here!</a></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
