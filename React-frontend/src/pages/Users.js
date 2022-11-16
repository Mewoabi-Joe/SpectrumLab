import React, { useEffect, useState } from "react";
import MyLabTestCard from "../components/MyLabTestCard.js";
import Navbar from "../components/Navbar.js";
import UserCard from "../components/UserCard.js";
import useWindowDimensions from "../hooks/WindowsDimensionHook.js";
import axiosInstance from "../utils/axios.js";
import { users } from "../utils/testData.js";

const Users = ({ currentUser }) => {
	const { height, width } = useWindowDimensions();
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState([]);

	const [originalUsers, setOriginalUsers] = useState([]);
	const [variableUsers, setVariableUsers] = useState([]);
	const [filterLoading, setFilterLoading] = useState(false);
	const [filterStates, setFilterStates] = useState({});
	const [searchTerm, setSearchTerm] = useState("");

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		const getAllUsers = async () => {
			setLoading(true);

			try {
				const res = await axiosInstance.get("/auth/get-users");
				console.log(res);
				setOriginalUsers(res.data);
				setVariableUsers(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error.response);
			}
		};
		getAllUsers();

		const theFilters = ["New users", "Age", "Recently tested"];
		setFilters(theFilters);
		let localFilterStates = {};
		theFilters.forEach((filter) => (localFilterStates[filter] = false));
		setFilterStates(localFilterStates);
	}, []);

	const handleCheckBoxChange = async (e) => {
		setSearchTerm("");
		setFilterLoading(true);
		let localFilterStates = filterStates;
		localFilterStates[e.target.id] = e.target.checked;
		setFilterStates(localFilterStates);
		filterVariableTest();
		setTimeout(() => {
			setFilterLoading(false);
		}, 1000);
	};

	const filterVariableTest = () => {
		// const tagKeys = Object.keys(tagStates);
		// const checkedTags = tagKeys.filter((tagKey) => tagStates[tagKey] === true);
		// console.log("checkedTags", checkedTags);
		// const filteredOriginalTest = originalUsers.filter((test) => {
		// 	let match = false;
		// 	test.tags.forEach((tag) => {
		// 		if (checkedTags.includes(tag)) {
		// 			match = true;
		// 		}
		// 	});
		// 	if (match) return true;
		// });
		// if (filteredOriginalTest.length) {
		// 	setVariableUsers(filteredOriginalTest);
		// } else {
		// 	setVariableUsers(originalUsers);
		// }
	};

	const unTickAllCheckBoxes = () => {
		const filterKeys = Object.keys(filterStates);
		const localFilterStates = filterStates;
		filterKeys.forEach((filterKey) => (localFilterStates[filterKey] = false));
		console.log(localFilterStates);
		setFilterStates(localFilterStates);
	};

	const handleSearchInputChange = (text) => {
		unTickAllCheckBoxes();
		setSearchTerm(text);
		console.log("variableUsers", variableUsers);
		const usersCorrespondingToSearch = originalUsers.filter((user) => {
			return (
				user.firstName.toLowerCase().includes(text.toLowerCase()) ||
				user.lastName.toLowerCase().includes(text.toLowerCase())
			);
		});
		// console.log("usersCorrespondingToSearch", usersCorrespondingToSearch);
		setVariableUsers(usersCorrespondingToSearch);
	};

	const handleEmptySearch = () => {
		setSearchTerm("");
		setVariableUsers(originalUsers);
	};

	// const navigate = useNavigate();

	return (
		<>
			<Navbar currentUser={currentUser} page={"users"} />
			<div className="container">
				<div className="pt-3">
					<h2 className="text-center m-0 mt-0 mt-3 d-md-none">Users</h2>
					<div className="d-flex justify-content-evenly m-4 pb-3 pt-lg-2 pb-lg-4">
						<h2 className="d-none mb-0 d-md-block">Users</h2>
						<div className="input-group" style={{ width: width >= 576 ? "50%" : "75%" }}>
							<button className="btn btn-outline-info" type="button" id="button-addon2" disabled>
								<span className="material-symbols-outlined d-flex">search</span>
							</button>
							<input
								// value={searchTerm}
								type="text"
								className="form-control"
								placeholder="search user by name"
								aria-label="Recipient's username"
								aria-describedby="button-addon2"
								onChange={(e) => handleSearchInputChange(e.target.value)}
							></input>
							{searchTerm && (
								<button className="btn btn-outline-info" type="button" id="button-addon2" onClick={handleEmptySearch}>
									<span className="material-symbols-outlined d-flex"> close </span>
								</button>
							)}
						</div>
						{/* <div className="dropdown-center">
						<button
							type="button"
							className="btn btn-info dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							data-bs-auto-close="outside"
							// data-bs-offset="10,20"
						>
							Sort by
						</button>
						<ul className="dropdown-menu">
							{filters.map((filter) => (
								<li>
									<div class="dropdown-item">
										<div className="form-check ">
											<input
												class="form-check-input"
												type="checkbox"
												checked={filterStates[filter]}
												onChange={handleCheckBoxChange}
												value=""
												id={filter}
											></input>
											<label class="form-check-label" htmlFor={filter}>
												{filter}
											</label>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div> */}
					</div>
					{/* list of lab test */}
					{loading ? (
						<div className="text-center mt-5 pt-5 text-info">
							<div class="spinner-grow" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					) : filterLoading ? (
						<div className="text-center mt-5 pt-5 text-primary">
							<div class="spinner-grow" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					) : !variableUsers.length ? (
						<p className="fw-bold text-center mt-5 pt-5">
							<span class="material-symbols-outlined ">search_off</span>
							<span className="ms-2">No Match</span>
						</p>
					) : (
						<div>
							{variableUsers.map((test, index) => (
								<UserCard
									userId={test._id}
									firstName={test.firstName}
									lastName={test.lastName}
									email={test.email}
									phoneNo={test.phoneNo}
									dateOfBirth={test.dateOfBirth}
									index={index}
									key={index}
									// handleViewDetails={() => handleViewDetails(test)}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Users;
