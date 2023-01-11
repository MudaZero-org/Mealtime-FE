import axios from "axios";

//Sending info to backend for sign-up

const signUp = async( storename, companyname, postalcode, address, phonenumber, email, storemanager, password) => {
  return await axios
    .post(/* path to backend i.e. /user/signUP */ , {
      storeName: storename,
      companyName: companyname,
      postalCode: postalcode,
      address: address,
      phoneNumber: phonenumber,
      email: email,
      storeManager: storemanager,
      password: password
    })
    .then((res) => {
      if(res.data.accessToken) {
        localStorage.setItem("userAuth", JSON.stringify(res.data))
      }
    })
}

//Getting token from the server

const logIn = async (email, password) => {
  return await axios
    .post(/* path to backend i.e. /user/logIn */, {
      userEmail: email,
      userPassword: password,
    })
    .then((res) => {
      if(res.data.accessToken) {
        localStorage("userAuth", JSON.stringify(res.data) )
      }
    })
}

const getUserData = async(token) => {
  return await axios
  .post(/* path to backend i.e. /user/userProfile */, {
    accessToken: token,
  })
  .then((res) => {
    return res.data
  })
}

const logOut = () {
  localStorage.removeItem("userAuth")
  localStorage.removeItem("userData")
}

const identifyCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
}

export default authUtils = {
  signUp,
  logIn,
  logOut,
  getUserData,
  identifyCurrentUser
}