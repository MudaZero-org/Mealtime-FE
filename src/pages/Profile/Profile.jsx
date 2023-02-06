import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Styling
import "../../styles/pages/_profilePage.scss";

//Profile Utils
import ProfileUtils from "./utils/profileUtils"

// import axios from "axios";
// import API_URL from "../../Constants";
// import placeholder from "../../images/placeholder.png";
//Firebase
// import { storage } from "../../firebaseConfig";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



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

	//Refactored this
	// const handleSubmitPhoto = async (e) => {
	// 	e.preventDefault()
	// 	const file = e.target[0]?.files[0];

	// 	if (!file) return null;
	// 	const storageRef = ref(storage, `files/${file.name}`)
	// 	const uploadTask = uploadBytesResumable(storageRef, file)

	// 	uploadTask.on("state_changed",
	// 		(snapshot) => {
	// 			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
	// 			setProgressPercent(progress)
	// 		},
	// 		(error) => {
	// 			alert(error)
	// 		},
	// 		() => {
	// 			e.target[0].value = ''
	// 			getDownloadURL(storageRef).then((downloadURL) => {
	// 				let imageURL = downloadURL
	// 				setImage(downloadURL)
	// 				console.log(user.data)
	// 				axios.put(`${API_URL}/user/${user.data.storeId}`, 
	// 				{
	// 					storeName: storeName,
	// 					postalCode: postalCode,
	// 					companyName: companyName,
	// 					storeAddress: storeAddress,
	// 					phoneNumber: phoneNumber,
	// 					storeManager: storeManager,
	// 					profileImg: imageURL,
	// 				},
	// 				{
	// 					headers: { authorization: `Bearer ${user.accessToken}` }
	// 				})
	// 			})
	// 		}
	// 	)
	// }

	useEffect(() => {
		//Reafactored this
		// async function fetchUserData() {
		// 	const user = JSON.parse(localStorage.getItem("user"));
		// 	const userID = user.data.storeId;
		// 	const userData = await axios.get(`${API_URL}/user/${userID}`, {
		// 		headers: { authorization: `Bearer ${user.accessToken}` },
		// 	});
		// 	setStoreName(userData.data.storeName);
		// 	setEmail(user.data.email);
		// 	setImage(userData.data.profileImg);
		// }

		// fetchUserData();
		ProfileUtils.fetchProfileData(user, setStoreName, setEmail, setImage)
	}, []);

	//Refactored this
	// const togglePhotoUpload = () => {
	// 	setPhotoUpload(!photoUpload)
	// }

	// const photoUploadOptions = () => {
	// 	return (
	// 		<div className="photo-upload-window">
	// 			<form className="app__form" name="upload_file"
	// 			//Refactor this 
	// 			// onSubmit={handleSubmitPhoto}
	// 			onSubmit={(e) => {ProfileUtils.handleSubmitPhoto(e, user, setProgressPercent, setImage, storeName, postalCode, companyName, storeAddress, phoneNumber, storeManager)}}
	// 			>
	// 				<input type="file"></input>
	// 				<button type="submit">Upload</button>
	// 			</form>
	// 			<progress value={progressPercent} max="100" />
	// 			{progressPercent === 100 && <p style={{color: "blue", textAlign: "center"}}><em>Image successfully uploaded!</em></p>}
	// 		</div>
	// 	)
	// }

	//Refactored this
	// const checkImage = () => {
	// 	if (!image) {
	// 		return (
	// 			<img
	// 				className="is-rounded"
	// 				style={{ objectFit: "cover", width: "256px", height: "256px" }}
	// 				src={placeholder}
	// 			></img>
	// 		)
	// 	} else {
	// 		return (
	// 			<img
	// 				className="is-rounded"
	// 				style={{ objectFit: "cover", width: "256px", height: "256px" }}
	// 				src={image}
	// 			></img>
	// 		)
	// 	}
	// }

	return (
		<div className="profile-page">
			<div className="card" id="profile-card">
				<figure className="image profile-image">
					{/* Refactored this */}
					{/* {checkImage()} */}
					{ProfileUtils.checkImage(image)}
				</figure>
				<button className="button is-light" 
				//Refactored this
				// onClick={togglePhotoUpload} 
				onClick={() => ProfileUtils.togglePhotoUpload(setPhotoUpload, photoUpload)}

				style={{marginLeft: "auto", marginRight: "auto"}}>Upload Picture</button>
				{/* Refactored this */}
				{/* {photoUpload && photoUploadOptions()} */}
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
								className="button is-light"
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
