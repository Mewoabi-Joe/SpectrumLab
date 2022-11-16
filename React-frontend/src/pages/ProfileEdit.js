import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/WindowsDimensionHook";
import axiosInstance from "../utils/axios";

const ProfileEdit = ({ currentUser }) => {
	const [loading, setLoading] = useState(false);

	const { height, width } = useWindowDimensions();
	const [isChecked, setIsChecked] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((user) => {
			return { ...user, [name]: value };
		});
	};

	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		vPassword: "",
		oldPassword: "",
		phoneNo: "",
		dateOfBirth: "",
	});

	const [error, setError] = useState({
		email: "",
		password: "",
	});

	const handleCheckBoxChange = async (e) => {
		setIsChecked(!isChecked);
		setUser((user) => {
			return { ...user, password: "", vPassword: "", oldPassword: "" };
		});
	};

	const { userId } = useParams();
	const [gottenUser, setGottenUser] = useState(null);
	const getUserById = async () => {
		try {
			const res = await axiosInstance.get("/auth/get-user");
			const localUser = res.data;
			setGottenUser(localUser);
			setUser({
				firstName: localUser.firstName,
				lastName: localUser.lastName,
				email: localUser.email,
				password: "",
				vPassword: "",
				oldPassword: "",
				phoneNo: localUser.phoneNo,
				dateOfBirth: localUser.dateOfBirth,
			});
			console.log("localUser", localUser);
		} catch (error) {
			console.log(error);
		}
	};

	const editUser = async (e) => {
		e.preventDefault();
		setError({});
		if (user.password != user.vPassword) {
			setError((error) => {
				return { ...error, password: "Passwords don't match" };
			});
			return;
		}

		const { vPassword, ...rest } = user;
		try {
			const res = await axiosInstance.put("/auth/edit-user/" + userId, rest);
			console.log(res.data);
			localStorage.setItem("token", res.data.token);
			window.location.href = "/profile/" + userId;
		} catch (error) {
			console.log(error.response);
			const errors = error.response.data;
			let errorObj = {};
			errors.map((err) => {
				errorObj = {
					...errorObj,
					...err,
				};
			});
			console.log(errorObj);
			setError(errorObj);
		}
	};

	useEffect(() => {
		getUserById();
	}, []);

	return (
		<>
			<Navbar currentUser={currentUser} page={"profile_edit"} />
			{gottenUser ? (
				<div class="container-lg">
					<h3 class="text-center my-4">User info modification</h3>

					<div class="row justify-content-center mt-2 mb-3 g-0 ">
						<form
							class="col-11 col-sm-9 col-md-8 col-lg-6  border border-info px-5 py-4 "
							style={{
								borderRadius: width >= 1200 ? "0px 20px 20px 0px" : "20px 20px 20px 20px",
							}}
						>
							<div class="mb-3">
								<label for="first_name" class="form-label">
									First name:
								</label>
								<input
									onChange={handleChange}
									name="firstName"
									type="text"
									class="form-control"
									id="first_name"
									value={user.firstName}
									required={true}
								/>
								<div class="text-danger firstname">{error.firstName ? error.firstName : ""}</div>
							</div>
							<div class="mb-3">
								<label for="last_name" class="form-label">
									Last name:
								</label>
								<input
									onChange={handleChange}
									name="lastName"
									value={user.lastName}
									type="text"
									class="form-control"
									id="last_name"
								/>
								<div class="text-danger last_name">{error.lastName ? error.lastName : ""}</div>
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">
									Email address:
								</label>
								<input
									onChange={handleChange}
									name="email"
									value={user.email}
									type="email"
									class="form-control"
									id="email"
									required={true}
								/>
								<div class="text-danger email">{error.email ? error.email : ""}</div>
							</div>
							<div class="mb-3">
								<label for="number" class="form-label">
									Phone number:
								</label>
								<input
									onChange={handleChange}
									name="phoneNo"
									type="number"
									value={user.phoneNo}
									class="form-control"
									id="number"
									required={true}
								/>
								<div class="text-danger number">{error.phoneNo ? error.phoneNo : ""}</div>
							</div>
							<div class="mb-3">
								<label for="vPassword" class="form-label">
									Date of birth:
								</label>
								<input
									value={user.dateOfBirth}
									onChange={handleChange}
									name="dateOfBirth"
									type="date"
									class="form-control"
									required={true}
								/>
								<div class="text-danger vPassword">{error.dateOfBirth ? error.dateOfBirth : ""}</div>
							</div>
							<div class="form-check mb-3">
								<input
									checked={isChecked}
									onChange={handleCheckBoxChange}
									class="form-check-input"
									type="checkbox"
									value=""
									id="flexCheckDefault"
								/>
								<label class="form-check-label" for="flexCheckDefault">
									Change password aswell
								</label>
							</div>
							{isChecked && (
								<div class="mb-3">
									<label for="password" class="form-label">
										Current password:
									</label>
									<div
										style={{
											position: "relative",
										}}
										className="password-container"
									>
										<input
											onChange={handleChange}
											name="oldPassword"
											value={user.oldPassword}
											type="password"
											class="form-control"
											id="oldpassword"
											required={true}
										/>
										<i
											style={{
												position: "absolute",
												top: "28%",
												right: "4%",
											}}
											onClick={(e) => {
												e.target.classList.toggle("fa-eye-slash");
												const passwordField = document.querySelector("#oldpassword");
												const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
												passwordField.setAttribute("type", type);
											}}
											class="fa-solid fa-eye"
											id="eye"
										></i>
									</div>

									<div class="text-danger password">{error.oldPassword ? error.oldPassword : ""}</div>
								</div>
							)}
							{isChecked && (
								<div class="mb-3">
									<label for="password" class="form-label">
										New password:
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
											value={user.password}
											type="password"
											class="form-control"
											id="password"
											required={true}
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
							)}
							{isChecked && (
								<div class="mb-3">
									<label for="vPassword" class="form-label">
										New password again:
									</label>
									<div
										style={{
											position: "relative",
										}}
										className="password-container"
									>
										<input
											onChange={handleChange}
											name="vPassword"
											value={user.vPassword}
											type="password"
											class="form-control"
											id="vPassword"
											required={true}
										/>
										<i
											style={{
												position: "absolute",
												top: "28%",
												right: "4%",
											}}
											onClick={(e) => {
												e.target.classList.toggle("fa-eye-slash");
												const passwordField = document.querySelector("#vPassword");
												const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
												passwordField.setAttribute("type", type);
											}}
											class="fa-solid fa-eye"
											id="eye"
										></i>
									</div>

									<div class="text-danger vPassword">{error.vPassword ? error.vPassword : ""}</div>
								</div>
							)}

							<br />

							{/* <div class="mb-3">
    <input name="radio" type="radio" id=""></input>
    remember me
  </div> */}

							<div class="text-center">
								<button onClick={editUser} class="btn btn-info" style={{ width: "100%", borderRadius: 10 }}>
									{!loading ? (
										"Update Info"
									) : (
										<div class="spinner-border spinner-border-sm text-secondary" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="text-center mt-5 pt-5 text-info">
					<div class="spinner-grow" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileEdit;
