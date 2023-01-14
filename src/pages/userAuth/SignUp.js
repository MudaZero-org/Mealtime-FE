import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import AuthUtils from "./utils/authenticate";

const SignUp = (props) => {

	const [storeName, setStoreName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [storeManager, setStoreManager] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");
	const [errPwd, setErrPwd] = useState("");

	const navigate = useNavigate();
	const reroute = () => {
		navigate("/");
	};

	return (
		<div>
			This is from the sign up
			<h1>Registration</h1>
			<form>
				<label>Store name:</label>
				<input
					type="text"
					placeholder="Enter username"
					onChange={(e) => {
						setStoreName(e.target.value);
					}}
				></input>
				<label>Company name:</label>
				<input
					type="text"
					placeholder="Enter username"
					onChange={(e) => {
						setCompanyName(e.target.value);
					}}
				></input>
				<label>Postal Code:</label>
				<input
					type="text"
					placeholder="Enter postal code"
					onChange={(e) => {
						setPostalCode(e.target.value);
					}}
				></input>
				<label>Store Address:</label>
				<input
					type="text"
					placeholder="Enter store address"
					onChange={(e) => {
						setAddress(e.target.value);
					}}
				></input>
				<label>Phone Number:</label>
				<input
					type="text"
					placeholder="Enter phone numebr"
					onChange={(e) => {
						setPhoneNumber(e.target.value);
					}}
				></input>

				<label>Email Address:</label>
				<input
					type="email"
					placeholder="Enter email address"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				></input>
				<label>Store Manager:</label>
				<input
					type="text"
					placeholder="Enter store manager"
					onChange={(e) => {
						setStoreManager(e.target.value);
					}}
				></input>
				<label>Password</label>
				<input
					type="password"
					placeholder="Enter password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				></input>
				<button
					onClick={(e) => {
						// console.log(
						// 	storeName,
						// 	companyName,
						// 	postalCode,
						// 	address,
						// 	phoneNumber,
						// 	email,
						// 	storeManager,
						// 	password
						// );
						// e.preventDefault();
						//Authentication
						// AuthUtils.signUp(
						// 	storeName,
						// 	companyName,
						// 	postalCode,
						// 	address,
						// 	phoneNumber,
						// 	email,
						// 	storeManager,
						// 	password
						// );
						//Error handling
						// if (err === "") {
						// 	setLoginView("login");
						// }
					}}
				>
					Submit
				</button>
			</form>
			<div>
				Do you have an account?{" "}
				<button
					onClick={() => {
						// setCurrentView("signin");
						reroute();
					}}
				>
					Click here!
				</button>
			</div>
		</div>
	);
};

export default SignUp;
