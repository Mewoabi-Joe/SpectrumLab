import axios from "axios";

export const baseURL = "http://localhost:8080";
// export const baseURL = "https://backend-clinic.herokuapp.com"

const axiosInstance = axios.create({
	baseURL: baseURL,
	// timeout: 10000,
	headers: {
		Authorization: localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : null,
		"Content-Type": "application/json",
		accept: "application/json",
	},
});

export default axiosInstance;
