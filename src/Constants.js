const environment = process.env.REACT_APP_ENV || "development";
let API_URL;
environment === "development"
  ? (API_URL = "http://localhost:8080")
  : (API_URL = process.env.REACT_APP_API_URL);

export default API_URL;
