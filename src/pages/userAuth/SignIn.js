import { useState } from "react";

const SignIn = (props) => {
	//Props for changing to homepage view
	// const {} = props;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

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
						// await AuthUtils.logIn(email, password).then((res) => {
						// 	AuthUtils.getUserData(res.accessToken).then((res) => {
						// 		localStorage.setItem("userData", JSON.stringify(res));
						// 		if (err === "") {
						// 			//If there is no error send user to "homepage"
						// 			// setCurrentView("home")
						// 		}
						// 	});
						// });
						// console.log(email, password);
						// e.preventDefault();
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default SignIn;
