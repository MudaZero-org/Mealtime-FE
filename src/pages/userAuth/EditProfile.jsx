import axios from "axios";
import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import API_URL from "../../Constants";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const navigate = useNavigate();

	const [storeName, setStoreName] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		async function fetchUserData() {
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setStoreName(userData.data.storeName);
			setEmail(user.data.email);
			setImage(user.data.profileImg);
		}

		fetchUserData();
	}, []);

	const handleSubmit = async (e) => {
		//Update store name and/or email address
		e.preventDefault();
		console.log("Submit");
		console.log(storeName, email, image);
		await axios.put(
			`${API_URL}/user/${user.data.storeId}`,
			{
				storeName: storeName,
				email: email,
				profileImg: image,
			},
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		navigate("/profile");
	};

	return (
		<div className="profile-page">
			<div class="card" id="profile-card">
				<div className="card-content">
					<form className="form">
						<h1>Edit Profile</h1>
						<hr></hr>
						<div class="field">
							<label class="label">Store name</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder={storeName}
									onChange={(e) => {
										setStoreName(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Email address</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Image</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder=""
									onChange={(e) => {
										setImage(e.target.value);
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

export default EditProfile;
