import "../../styles/pages/_homepage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../Constants";
const Profile = () => {
	const [storeName, setStoreName] = useState("");
	const [email, setEmail] = useState("");
	const [picture, setPicture] = useState("");
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
		}

		fetchUserData();
	}, []);

	const handleUpdate = () => {
		console.log("Update");
	};

	return (
		<div className="profile-page">
			<div class="card">
				<figure class="image is-128x128">
					<img
						class="is-rounded"
						src="https://bulma.io/images/placeholders/256x256.png"
					></img>
				</figure>
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img
									src="https://bulma.io/images/placeholders/96x96.png"
									alt="Placeholder image"
								></img>
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">{storeName}</p>
							<p class="subtitle is-6">{email}</p>
						</div>
					</div>

					<div class="content">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{" "}
						<a href="#">#responsive</a>
						<br></br>
						<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
