import axios from "axios";
import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import API_URL from "../../Constants";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const navigate = useNavigate(null);

	const [storeName, setStoreName] = useState(null);
	const [postalCode, setPostalCode] = useState(null);
	const [companyName, setCompanyName] = useState(null);
	const [storeAddress, setStoreAddress] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [storeManager, setStoreManager] = useState(null);
	const [image, setImage] = useState(null);
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		async function fetchUserData() {
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});

			setStoreName(userData.data.storeName);
			// setEmail(user.data.email);
			// setImage(user.data.profileImg);
		}

		fetchUserData();
	}, []);

	const handleSubmit = async (e) => {
		//Update store name and/or email address
		e.preventDefault();
		console.log("Submit");
		console.log(storeName, image);
		await axios.put(
			`${API_URL}/user/${user.data.storeId}`,
			{
				storeName: storeName,
				postalCode: postalCode,
				companyName: companyName,
				storeAddress: storeAddress,
				phoneNumber: phoneNumber,
				storeManager: storeManager,
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
							<label class="label">Company name</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder=""
									onChange={(e) => {
										setCompanyName(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Postal code</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder=""
									onChange={(e) => {
										setPostalCode(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Store address</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder=""
									onChange={(e) => {
										setStoreAddress(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Phone number</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder=""
									onChange={(e) => {
										setPhoneNumber(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div class="field">
							<label class="label">Store Manager</label>
							<div class="control">
								<input
									class="input"
									type="text"
									placeholder=""
									onChange={(e) => {
										setStoreManager(e.target.value);
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
