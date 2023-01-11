import { useState } from "react";


const SignUp = (props) => {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");
	const [errPwd, setErrPwd] = useState("");

	return (
		<div>
			This is from the sign up
			<h1>Registration</h1>
			<form>
				<label>Username:</label>
				<input
					type="text"
					placeholder="Enter username"
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				></input>
				<label>Email Address:</label>
				<input
					type="text"
					placeholder="Enter email address"
					onChange={(e) => {
						setEmail(e.target.value);
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
						console.log(userName, email, password);
						e.preventDefault();
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default SignUp;
