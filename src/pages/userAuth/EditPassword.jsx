import axios from "axios";
import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import API_URL from "../../Constants";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
	// const [storeName, setStoreName] = useState("");
	// const [email, setEmail] = useState("");
	const navigate = useNavigate();

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
		//User route for change password
		e.preventDefault();
		console.log("Submit");
		console.log(oldPassword, newPassword, confirmPassword);
	};

	return (
		<div className="profile-page">
			<div class="card" id="profile-card">
				<div className="card-content">
					<form className="form">
						<h1>Change Password</h1>
						<hr></hr>
						<div class="field">
							<label class="label">Old Password</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder="Enter old password"
									onChange={(e) => {
										setOldPassword(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">New Password</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder="Enter new password"
									onChange={(e) => {
										setNewPassword(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Confirm new password</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder="Re-enter new password"
									onChange={(e) => {
										setConfirmPassword(e.target.value);
									}}
								></input>
							</div>
						</div>

						<div class="field is-grouped">
							<div class="control">
								<button
									class="button is-success"
									onClick={(e) => {
										handleSubmit(e);
									}}
								>
									Update
								</button>
							</div>
							<div class="control">
								<button
									class="button is-link is-light"
									onClick={(e) => {
										navigate("/profile");
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditPassword;
