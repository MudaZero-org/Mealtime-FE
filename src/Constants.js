// if process.env.NODE_ENV === production, use Production, else (default) use Development
// if Production, use process.env.API_URL, else (default) use http://localhost:8080

const environment = process.env.REACT_APP_ENV || "development";
let API_URL;
if (environment === "development") {
  API_URL = "http://localhost:8080";
} else {
  API_URL = process.env.API_URL;
}

export default API_URL;
