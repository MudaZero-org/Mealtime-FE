const environment = process.env.REACT_APP_ENV || "development";
let API_URL;
if (environment === "development") {
  API_URL = "http://localhost:8080";
} else {
  API_URL = process.env.REACT_APP_API_URL;
}

export default API_URL;
