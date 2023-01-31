const environment = process.env.REACT_APP_ENV || "development";
let API_URL;
let REACT_APP_URL;

environment === "development"
  ? (API_URL = "http://localhost:8080")
  : (API_URL = process.env.REACT_APP_API_URL);

environment === "development"
  ? (REACT_APP_URL = "http://localhost:3000")
  : (REACT_APP_URL = process.env.REACT_APP_URL);

export default API_URL;
export { REACT_APP_URL };
