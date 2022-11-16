import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { tests } from "../utils/testData.js"

import ShortCartNoBorder from "../components/ShortCartNoBorder.js";
import MobileScreenCard from "../components/MobileScreenCard.js";
import axiosInstance from "../utils/axios.js";
import Navbar from "../components/Navbar.js";
const LabTests = ({ currentUser }) => {
	const [filter, setFilter] = useState("none");
	const [originalTests, setOriginalTests] = useState([]);
	const [tests, setTests] = useState([]);
	const [variableTests, setVariableTests] = useState([]);
	const [filterLoading, setFilterLoading] = useState(false);
	const [testsLoading, setTestsLoading] = useState(true);
	const [tagStates, setTagStates] = useState({});
	const [searchTerm, setSearchTerm] = useState("");
	const [tags, setTags] = useState([]);
	console.log("originalTests", originalTests);
	console.log("variableTests", variableTests);
	switch (filter) {
		case "none":
			break;

		default:
			break;
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const capitalizeFirstLetterOfTagsInTest = (tests) => {
		return tests.map((test) => {
			const capitalisedTags = test.tags.map((tag) => capitalizeFirstLetter(tag));
			test.tags = capitalisedTags;
			return test;
		});
	};

	useEffect(() => {
		const getTests = async () => {
			try {
				const res = await axiosInstance.get("/test");
				console.log(res.data);
				const originalTestsWithCapitalisedTags = capitalizeFirstLetterOfTagsInTest(res.data);
				setOriginalTests(originalTestsWithCapitalisedTags);
				setVariableTests(originalTestsWithCapitalisedTags);
				let labTestTags = [];
				originalTestsWithCapitalisedTags.forEach((test) => labTestTags.push(...test.tags));
				const setOflabTestTags = new Set(labTestTags);
				const theTags = Array.from(setOflabTestTags);
				// console.log("theTags", theTags);
				setTags(theTags);
				let localTagStates = {};
				theTags.forEach((tag) => (localTagStates[tag] = false));
				setTagStates(localTagStates);
				setTests(res.data);
				setTestsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getTests();
	}, []);

	const handleCheckBoxChange = async (e) => {
		setSearchTerm("");
		setFilterLoading(true);
		let localTagStates = tagStates;
		localTagStates[e.target.id] = e.target.checked;
		setTagStates(localTagStates);
		filterVariableTest();
		setTimeout(() => {
			setFilterLoading(false);
		}, 1000);
	};

	const filterVariableTest = () => {
		const tagKeys = Object.keys(tagStates);
		const checkedTags = tagKeys.filter((tagKey) => tagStates[tagKey] === true);
		console.log("checkedTags", checkedTags);
		const filteredOriginalTest = originalTests.filter((test) => {
			let match = false;
			test.tags.forEach((tag) => {
				if (checkedTags.includes(tag)) {
					match = true;
				}
			});
			if (match) return true;
		});
		if (filteredOriginalTest.length) {
			setVariableTests(filteredOriginalTest);
		} else {
			setVariableTests(originalTests);
		}
	};

	const unTickAllCheckBoxes = () => {
		const tagKeys = Object.keys(tagStates);
		const localTagStates = tagStates;
		tagKeys.forEach((tagKey) => (localTagStates[tagKey] = false));
		console.log(localTagStates);
		setTagStates(localTagStates);
	};

	const handleSearchInputChange = (text) => {
		unTickAllCheckBoxes();
		setSearchTerm(text);
		console.log("variableTests", variableTests);
		const testsCorrespondingToSearch = originalTests.filter((test) => {
			console.log("text", text);
			return test.name.toLowerCase().includes(text.toLowerCase());
		});
		console.log("testsCorrespondingToSearch", testsCorrespondingToSearch);
		setVariableTests(testsCorrespondingToSearch);
	};

	const handleEmptySearch = () => {
		setSearchTerm("");
		setVariableTests(originalTests);
	};

	const navigate = useNavigate();

	const handleViewDetails = (test) => {
		console.log(test);
		navigate("/lab_test_details", { state: test });
	};

	const handleEditTest = (test) => {
		console.log(test);
		// navigate("/lab_test_details", { state: test })
	};

	return (
		<div className="container">
			<Navbar currentUser={currentUser} page={"lab_tests"} />

			{/* for mobile to sm screens */}
			<div className="pt-3 d-sm-none">
				<h2 className="text-center pb-2">Lab Tests</h2>
				<div className="d-flex justify-content-evenly mb-4">
					<div className="input-group w-75">
						<button className="btn btn-outline-info" type="button" id="button-addon2" disabled>
							<span className="material-symbols-outlined d-flex">search</span>
						</button>
						<input
							value={searchTerm}
							type="text"
							className="form-control"
							placeholder="search lab test"
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
					<div className="dropdown-center">
						<button
							type="button"
							className="btn btn-info dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							data-bs-auto-close="outside"
							// data-bs-offset="10,20"
						>
							filter
						</button>
						<ul className="dropdown-menu">
							{tags.map((tag) => (
								<li>
									<div class="dropdown-item">
										<div className="form-check ">
											<input
												class="form-check-input bg-info"
												type="checkbox"
												checked={tagStates[tag]}
												onChange={handleCheckBoxChange}
												value=""
												id={tag}
											></input>
											<label class="form-check-label" htmlFor={tag}>
												{tag}
											</label>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* list of lab test */}
				{testsLoading ? (
					<div className="text-center mt-5 pt-5 text-info">
						<div class="spinner-grow" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				) : filterLoading ? (
					<div className="text-center mt-5 pt-5 text-info">
						<div class="spinner-grow" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				) : !variableTests.length ? (
					<p className="fw-bold text-center mt-5 pt-5">
						<span class="material-symbols-outlined ">search_off</span>
						<span className="ms-2">No Match</span>
					</p>
				) : (
					<div>
						{variableTests.map((test, index) => (
							<MobileScreenCard
								id={test._id}
								name={test.name}
								image={test.imagePath}
								price={test.price}
								key={index}
								handleViewDetails={() => handleViewDetails(test)}
								handleEditTest={() => handleEditTest(test)}
							/>
						))}
					</div>
				)}
			</div>
			{/* to display from sm screens and above */}
			<div className="d-none d-sm-block">
				<div className="d-flex justify-content-around align-items-center my-4">
					<h2 className="mb-0">Lab tests</h2>

					<div className="input-group w-50">
						<button className="btn btn-outline-info disabled" type="button" id="button-addon1">
							<span className="material-symbols-outlined d-flex"> search </span>
						</button>
						<input
							value={searchTerm}
							type="text"
							className="form-control"
							placeholder="search lab test"
							aria-label="Recipient's username"
							aria-describedby="button-addon1"
							onChange={(e) => handleSearchInputChange(e.target.value)}
						></input>
						{searchTerm && (
							<button className="btn btn-outline-info" type="button" id="button-addon2" onClick={handleEmptySearch}>
								<span className="material-symbols-outlined d-flex"> close </span>
							</button>
						)}
					</div>
					<div className="dropdown-center">
						<button
							type="button"
							className="btn btn-info dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							// data-bs-offset="10,20"
						>
							filter
						</button>
						<ul className="dropdown-menu">
							{tags.map((tag, index) => (
								<li key={index}>
									<div class="dropdown-item">
										<div className="form-check ">
											<input
												class="form-check-input"
												type="checkbox"
												checked={tagStates[tag]}
												onChange={handleCheckBoxChange}
												value=""
												id={tag}
											></input>
											<label class="form-check-label" htmlFor={tag}>
												{tag}
											</label>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				{testsLoading ? (
					<div className="text-center mt-5 pt-5 text-info">
						<div class="spinner-grow" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				) : filterLoading ? (
					<div className="text-center mt-5 pt-5 text-info">
						<div class="spinner-grow" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				) : !variableTests.length ? (
					<p className="fw-bold text-center mt-5 pt-5">
						<span class="material-symbols-outlined ">search_off</span>
						<span className="ms-2">No Match</span>
					</p>
				) : (
					<div className="row gy-md-2 gy-xl-5">
						{variableTests.map((test, index) => (
							<div className="col-sm-5 me-sm-4 mb-sm-4 me-md-0 mb-md-0 col-md-4 col-lg-3" key={index}>
								<ShortCartNoBorder
									id={test._id}
									image={test.imagePath}
									name={test.name}
									price={test.price}
									handleViewDetails={() => handleViewDetails(test)}
									handleEditTest={() => handleEditTest(test)}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default LabTests;
