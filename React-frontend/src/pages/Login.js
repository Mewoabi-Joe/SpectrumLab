import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUser } from "../redux/actions/authActions";
import axiosInstance from "../utils/axios";
import logo from "../assets/photos/spectrumLabLogo.jpeg";
import useWindowDimensions from "../hooks/WindowsDimensionHook";
import Navbar from "../components/Navbar";

const Login = (props) => {
	setTimeout(() => {
		const links = document.querySelectorAll(".nav-link");
		links.forEach((link) => {
			link.classList.remove("active");
		});
		document.getElementById("login").classList.add("active");
	}, 500);

	const [loading, setLoading] = useState(false);
	const { height, width } = useWindowDimensions();

	const navigate = useNavigate();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState({
		email: "",
		password: "",
	});

	const login = async (e) => {
		setError({
			email: "",
			password: "",
		});
		setLoading(true);
		e.preventDefault();
		try {
			const res = await axiosInstance.post("/auth/login", user);
			console.log(res);
			localStorage.setItem("token", res.data.token);
			props.setUser(res.data.user);
			window.location.href = "/spectrumlab";
			setLoading(false);
		} catch (error) {
			// console.log(error);
			const err = error.response.data;
			console.log("err", err);
			setError({
				email: err.includes("email") ? err : "",
				password: err.includes("password") ? err : "",
			});
			setLoading(false);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((user) => {
			return { ...user, [name]: value };
		});
	};

	return (
		<>
			<Navbar currentUser={props.currentUser} page={"login"} />

			<div class="container-lg">
				<h3 class="text-center my-3">Log in to Spectrum Lab</h3>
				<small className="text-center d-block">Already created an account? Go ahead fill in the info and login</small>

				<div class="row justify-content-center mb-5 mt-4 g-0 ">
					<div className="d-none d-xl-block col-6">
						<img
							className="img-fluid"
							style={{ borderRadius: width >= 1200 && "20px 0px 0px 20px" }}
							src={logo}
							alt="logo"
						/>
					</div>
					<form
						class="col-11 col-sm-9 col-md-8 col-lg-6 col-xl-5 border border-info p-5"
						style={{
							borderRadius: width >= 1200 ? "0px 20px 20px 0px" : "20px 20px 20px 20px",
						}}
					>
						<div class="mb-3">
							<label for="email" class="form-label">
								Email address:
							</label>
							<input
								onChange={handleChange}
								name="email"
								type="email"
								value={user.email}
								class="form-control"
								id="email"
								placeholder="name@example.com"
								required
							/>
							<div class="text-danger firstname">{error.email ? error.email : ""}</div>
						</div>
						<div class="mb-5">
							<label for="password" class="form-label">
								Password:
							</label>
							<div
								style={{
									position: "relative",
								}}
								className="password-container"
							>
								<input
									onChange={handleChange}
									name="password"
									type="password"
									value={user.password}
									class="form-control"
									id="password"
									required
								/>
								<i
									style={{
										position: "absolute",
										top: "28%",
										right: "4%",
									}}
									onClick={(e) => {
										e.target.classList.toggle("fa-eye-slash");
										const passwordField = document.querySelector("#password");
										const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
										passwordField.setAttribute("type", type);
									}}
									class="fa-solid fa-eye"
									id="eye"
								></i>
							</div>

							<div class="text-danger password">{error.password ? error.password : ""}</div>
						</div>
						{/* <div class="mb-3">
							<Link to="/verify_email">forgotten password?</Link>
						</div> */}
						<div class="text-center mb-3">
							<button onClick={login} class="btn btn-info" style={{ width: "100%", borderRadius: 10 }}>
								{!loading ? (
									"Login"
								) : (
									<div class="spinner-border spinner-border-sm text-secondary" role="status">
										<span class="visually-hidden">Loading...</span>
									</div>
								)}
							</button>
						</div>

						<Link className="text-info" to="/signup">
							Don't yet have an account? Create one.
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => {
	return {
		newUser: auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ setUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
