import axios from "axios"

// export const baseURL = "http://localhost:5000"
export const baseURL = "https://backend-clinic.herokuapp.com"

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
})
=======
	baseURL: baseURL,
	// timeout: 10000,
	headers: {
		Authorization: localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : null,
		"Content-Type": "application/json",
		accept: "application/json",
	},
});
>>>>>>> c7cc8bddb21e5cb728a9535496fb8fa5108b39a9

export default axiosInstance
