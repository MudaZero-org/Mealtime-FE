import axios from "axios";
import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import API_URL from "../../Constants";

const EditPassword = () => {
	// const [storeName, setStoreName] = useState("");
	// const [email, setEmail] = useState("");

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		// async function fetchUserData() {
		// 	const user = JSON.parse(localStorage.getItem("user"));
		// 	const userID = user.data.storeId;
		// 	const userData = await axios.get(`${API_URL}/user/${userID}`, {
		// 		headers: { authorization: `Bearer ${user.accessToken}` },
		// 	});
		// 	setStoreName(userData.data.storeName);
		// 	setEmail(user.data.email);
		// }
		// fetchUserData();
	}, []);

	const handleSubmit = (e) => {
		//Update password in the backend
		e.preventDefault();
		console.log("Submit");
		console.log(oldPassword, newPassword, confirmPassword);
	};

	return (
		<div className="profile-page">
			<div class="card">
				<form className="form">
					<div className="input-field">
						<label>Old password</label>
						<br></br>
						<input
							className="text-input-field input"
							type="password"
							placeholder="Enter old password"
							onChange={(e) => {
								setOldPassword(e.target.value);
							}}
						></input>
					</div>
					<div className="input-field">
						<label>Password</label>
						<br></br>
						<input
							className="text-input-field input"
							type="password"
							placeholder="Enter new password"
							onChange={(e) => {
								setNewPassword(e.target.value);
							}}
						></input>
					</div>
					<div className="input-field">
						<label>Confirm new password</label>
						<br></br>
						<input
							className="text-input-field input"
							type="password"
							placeholder="Re-enter new password"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						></input>
					</div>

					<button onClick={(e) => handleSubmit(e)}>Update</button>
				</form>
			</div>
		</div>
	);
};

export default EditPassword;
