import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../Constants";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();

	const [storeName, setStoreName] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		async function fetchUserData() {
			const user = JSON.parse(localStorage.getItem("user"));
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

	const handleUpdate = () => {
		console.log("Update");
	};

	return (
		<div className="profile-page">
			<div className="card" id="profile-card">
				<figure className="image profile-image is-128x128">
					<img
						className="is-rounded"
						src="https://bulma.io/images/placeholders/256x256.png"
					></img>
				</figure>
				<hr></hr>
				<div className="card-content">
					{/* <p className="title is-3">Profile</p> */}
					<div className="media">
						<div className="media-left"></div>
						<div className="media-content">
							<p className="title is-5">Store Name:</p>
							<p className="subtitle is-6">{storeName}</p>
							<hr></hr>
							<p className="title is-5">Email Address:</p>
							<p className="subtitle is-6">{email}</p>
						</div>
					</div>
					<div class="field is-grouped">
						<div class="control">
							<button
								className="button is-light"
								onClick={() => {
									navigate("/profile/editProfile");
									console.log("Hello");
								}}
							>
								Edit Profile
							</button>
						</div>
						<div class="control">
							<button
								className="button is-light"
								onClick={(e) => {
									navigate("/profile/editPassword");
								}}
							>
								Change Password
							</button>
						</div>
					</div>
					{/* <div>
						<button
							className="button profile-button is-light"
							onClick={() => {
								navigate("/profile/editPassword");
								console.log("World");
							}}
						>
							Edit Profile
						</button>
						<button
							className="button profile-button is-light"
							onClick={() => {
								navigate("/profile/editPassword");
								console.log("World");
							}}
						>
							Change Password
						</button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Profile;
