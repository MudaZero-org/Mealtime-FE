import "../../styles/pages/_profilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../Constants";
import { useNavigate } from "react-router-dom";
import placeholder from "../../images/placeholder.png";
import { storage } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

	const handleSubmitPhoto = async (e) => {
		e.preventDefault()
		const file = e.target[0]?.files[0];

		if (!file) return null;
		const storageRef = ref(storage, `files/${file.name}`)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on("state_changed",
			(snapshot) => {
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				setProgressPercent(progress)
			},
			(error) => {
				alert(error)
			},
			() => {
				e.target[0].value = ''
				getDownloadURL(storageRef).then((downloadURL) => {
					let imageURL = downloadURL
					setImage(downloadURL)
					console.log(user.data)
					axios.put(`${API_URL}/user/${user.data.storeId}`, 
					{
						storeName: storeName,
						postalCode: postalCode,
						companyName: companyName,
						storeAddress: storeAddress,
						phoneNumber: phoneNumber,
						storeManager: storeManager,
						profileImg: imageURL,
					},
					{
						headers: { authorization: `Bearer ${user.accessToken}` }
					})
				})
			}
		)
	}

	useEffect(() => {
		async function fetchUserData() {
			const user = JSON.parse(localStorage.getItem("user"));
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setStoreName(userData.data.storeName);
			setEmail(user.data.email);
			setImage(userData.data.profileImg);
		}

		fetchUserData();
	}, []);

	const handleUpdate = () => {
		console.log("Update");
	};

	const togglePhotoUpload = () => {
		setPhotoUpload(!photoUpload)
	}

	const photoUploadOptions = () => {
		return (
			<div className="photo-upload-window">
				<form className="app__form" name="upload_file" onSubmit={handleSubmitPhoto}>
					<input type="file"></input>
					<button type="submit">Upload</button>
				</form>
				<progress value={progressPercent} max="100" />
				{progressPercent === 100 && <p style={{color: "blue", textAlign: "center"}}><em>Image successfully uploaded!</em></p>}
			</div>
		)
	}

	const checkImage = () => {
		if (!image) {
			return (
				<img
					className="is-rounded"
					style={{ objectFit: "cover", width: "256px", height: "256px" }}
					src={placeholder}
				></img>
			)
		} else {
			return (
				<img
					className="is-rounded"
					style={{ objectFit: "cover", width: "256px", height: "256px" }}
					src={image}
				></img>
			)
		}
	}

	return (
		<div className="profile-page">
			<div className="card" id="profile-card">
				<figure className="image profile-image">
					{checkImage()}
				</figure>
				<button className="button is-light" onClick={togglePhotoUpload} style={{marginLeft: "auto", marginRight: "auto"}}>Upload Picture</button>
				{photoUpload && photoUploadOptions()}
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
