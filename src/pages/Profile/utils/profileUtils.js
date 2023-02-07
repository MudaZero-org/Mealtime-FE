import axios from "axios";
import API_URL from "../../../Constants";

//Firebase
import { storage } from "../../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import placeholder from "../../../images/placeholder.png";


const profileUtils = {
  fetchProfileData: async(user, setStoreName, setEmail, setImage) => {
			const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});
			setStoreName(userData.data.storeName);
			setEmail(user.data.email);
			setImage(userData.data.profileImg);
  },
  //Uploading photos
  handleSubmitPhoto: async (e, user, setProgressPercent, setImage, storeName, postalCode, companyName, storeAddress, phoneNumber, storeManager) => {
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
  },
  togglePhotoUpload: (setPhotoUpload, photoUpload) => {
    setPhotoUpload(!photoUpload)
  },
  photoUploadOptions: (user, progressPercent, setProgressPercent, setImage, storeName, postalCode, companyName, storeAddress, phoneNumber, storeManager) => {
    return (
			<div className="photo-upload-window">
				<form className="app__form" name="upload_file"
				onSubmit={(e) => {profileUtils.handleSubmitPhoto(e, user, setProgressPercent, setImage, storeName, postalCode, companyName, storeAddress, phoneNumber, storeManager)}}
				>
					<input type="file"></input>
					<button type="submit">Upload</button>
				</form>
				<progress value={progressPercent} max="100" />
				{progressPercent === 100 && <p style={{color: "blue", textAlign: "center"}}><em>Image successfully uploaded!</em></p>}
			</div>
		)
  },
  checkImage: (image)=> {
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
  },

  //Edit Profile
  fetchEditProfileData: async (user, setStoreName) => {
    const userID = user.data.storeId;
			const userData = await axios.get(`${API_URL}/user/${userID}`, {
				headers: { authorization: `Bearer ${user.accessToken}` },
			});

			setStoreName(userData.data.storeName);
  },
  submitEditProfile: async (e, user, storeName, postalCode, companyName, storeAddress, phoneNumber, storeManager, image) => {
    e.preventDefault();
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

  }
}


export default profileUtils;