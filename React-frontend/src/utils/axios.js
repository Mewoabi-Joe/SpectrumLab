import axios from "axios";

// export const baseURL = "http://localhost:8080";
// export const baseURL = "https://backend-clinic.herokuapp.com"
export const baseURL = "https://spectrumlab-dfhcj2cqgq-uc.a.run.app";

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
