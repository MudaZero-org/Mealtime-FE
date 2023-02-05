import axios from "axios";
import API_URL from "../../../Constants";

//Sending info to backend for sign-up

const signUp = async (
  storename,
  companyname,
  postalcode,
  address,
  phonenumber,
  email,
  storemanager,
  password
) => {
  return await axios
    .post(`${API_URL}/user/signup`, {
      storeName: storename,
      companyName: companyname,
      postalCode: postalcode,
      address: address,
      phoneNumber: phonenumber,
      email: email,
      storeManager: storemanager,
      password: password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res;
    });
};

//Getting token from the server

const logIn = async (email, password) => {
  return await axios
    .post(`${API_URL}/user/login`, {
      userEmail: email,
      userPassword: password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};

const logOut = () => {
  localStorage.removeItem("user");
};

const identifyCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authUtils = {
  signUp,
  logIn,
  logOut,
  identifyCurrentUser,
};

export default authUtils;
