import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Styling
import "../../styles/pages/_profilePage.scss";

//Profile Utils
import ProfileUtils from "./utils/profileUtils"

const Profile = (props) => {
	const { image, setImage } = props;
	const navigate = useNavigate();

	const [storeName, setStoreName] = useState("");
	const [postalCode, setPostalCode] = useState(null);
	const [companyName, setCompanyName] = useState(null);
	const [storeAddress, setStoreAddress] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [storeManager, setStoreManager] = useState(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [photoUpload, setPhotoUpload] = useState(false);
	const [progressPercent, setProgressPercent] = useState(0);
	const [successPhoto, setSuccessPhoto] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));


	useEffect(() => {
		ProfileUtils.fetchProfileData(user, setStoreName, setEmail, setImage)
	}, []);

	return (
		<div className="profile-page">
			<div className="card" id="profile-card">
				<figure className="image profile-image">
					{ProfileUtils.checkImage(image)}
				</figure>
				<button className="button is-light" 
				onClick={() => ProfileUtils.togglePhotoUpload(setPhotoUpload, photoUpload)}

				style={{marginLeft: "auto", marginRight: "auto"}}>Upload Picture</button>
				{photoUpload && ProfileUtils.photoUploadOptions(user, progressPercent, setProgressPercent, setImage, storeName, postalCode, companyName, storeAddress, phoneNumber, storeManager)}
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
					<div className="field is-grouped">
						<div className="control">
							<button
								className="button edit-button is-light"
								onClick={() => {
									navigate("/profile/editProfile");
								}}
							>
								Edit Profile
							</button>
						</div>
						{/* Keeping this change password in the future */}
						{/* <div className="control">
							<button
								className="button is-light"
								onClick={(e) => {
									navigate("/profile/editPassword");
								}}
							>
								Change Password
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
