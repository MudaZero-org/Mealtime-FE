import axios from "axios";
import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import API_URL from "../../Constants";

const EditProfile = () => {
	const [storeName, setStoreName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		async function fetchUserData() {
			const user = JSON.parse(localStorage.getItem("user"));
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setStoreName(userData.data.storeName);
			setEmail(user.data.email);
		}

		fetchUserData();
	}, []);

	const handleSubmit = (e) => {
		//Update store name and/or email address
		e.preventDefault();
		console.log("Submit");
		console.log(storeName, email);
	};

	return (
		<div className="profile-page">
			<div class="card">
				<form className="form">
					<div className="input-field">
						<label>Store Name</label>
						<br></br>
						<input
							className="text-input-field input"
							type="text"
							placeholder={storeName}
							onChange={(e) => {
								setStoreName(e.target.value);
							}}
						></input>
					</div>
					<div className="input-field">
						<label>Email</label>
						<br></br>
						<input
							className="text-input-field input"
							type="text"
							placeholder={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						></input>
					</div>

					<button
						onClick={(e) => {
							handleSubmit(e);
						}}
					>
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
