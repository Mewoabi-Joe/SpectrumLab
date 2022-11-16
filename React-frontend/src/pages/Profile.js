import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/WindowsDimensionHook";
import axiosInstance from "../utils/axios";

const Profile = ({ currentUser }) => {
	const { userId } = useParams();
	const { height, width } = useWindowDimensions();

	const [user, setUser] = useState(null);

	const getUserById = async () => {
		try {
			const res = await axiosInstance.get("/auth/get-user");
			const localUser = res.data;
			setUser(localUser);
			console.log("localUser", localUser);
		} catch (error) {
			console.log(error);
		}
	};

	const getTHMargin = () => {
		if (width < 500) return 50;
		if (width > 500) return 60;
	};

	useEffect(() => {
		getUserById();
	}, []);

	return (
		<>
			<Navbar currentUser={currentUser} page={"profile"} />
			{user ? (
				<div class="container-lg">
					<h3 class="text-center mt-4 my-5">My Profile</h3>

					<div className="m-auto ps-md-5 small" style={{ maxWidth: 500 }}>
						<div className="ms-2">
							<div className="d-flex mb-4">
								<p className="w-50">First name</p>
								<p className="w-50">{user.firstName}</p>
							</div>
							<div className="d-flex mb-4">
								<p className="w-50">Last name</p>
								<p className="w-50">{user.lastName}</p>
							</div>
							<div className="d-flex mb-4">
								<p className="w-50">Email</p>
								<p className="w-50 small">{user.email}</p>
							</div>
							<div className="d-flex mb-4">
								<p className="w-50">Phone number</p>
								<p className="w-50">{user.phoneNo}</p>
							</div>
							<div className="d-flex mb-4">
								<p className="w-50">Date of birth</p>
								<p className="w-50">{user.dateOfBirth}</p>
							</div>
							<div className="ms-5">
								<Link to={"/profileEdit/" + user.userId} className="btn btn-info w-50 ms-5 mt-4">
									Edit
								</Link>
							</div>
						</div>
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

export default Profile;
