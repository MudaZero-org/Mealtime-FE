import axios from "axios";

//Sending info to backend for sign-up

const signUp = async( username, email, password) => {
  return await axios
    .post(/* path to backend i.e. /user/signUP */ , {
      userName: username,
      userEmail: email,
      userPassword: password
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