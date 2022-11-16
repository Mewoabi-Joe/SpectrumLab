import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MyLabTestCard from "../components/MyLabTestCard.js";
import useWindowDimensions from "../hooks/WindowsDimensionHook.js";
import axiosInstance from "../utils/axios.js";
import { myLabTests } from "../utils/testData.js";
import whatsappbtn from "../assets/icons/WhatsAppButtonGreenSmall.svg";
import Navbar from "../components/Navbar.js";

const MyLabTest = ({ currentUser }) => {
	const [loading, setLoading] = useState(false);
	const { state } = useLocation();
	const { height, width } = useWindowDimensions();
	const { userId } = useParams();
	console.log(userId);
	const [filters, setFilters] = useState([]);
	const [user, setUser] = useState(null);
	const [originalTests, setOriginalTests] = useState([]);
	const [variableTests, setVariableTests] = useState([]);
	const [filterLoading, setFilterLoading] = useState(false);
	const [filterStates, setFilterStates] = useState({});
	const [searchTerm, setSearchTerm] = useState("");

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const getUser = async () => {
		try {
			const res = await axiosInstance.get("/auth/get-user");
			setUser(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getMyTest = async () => {
			try {
				setLoading(true);
				const res = await axiosInstance.get(`/rendezvous/${userId}`);

				for (let i = 0; i < res.data.length; i++) {
					let test = await axiosInstance.get(`/test/${res.data[i].testId}`);
					res.data[i] = {
						...res.data[i],
						name: test.data.name,
						image: test.data.imagePath,
						price: test.data.price,
					};
				}

				setOriginalTests(res.data);
				setVariableTests(res.data);
				console.log(res);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		getMyTest();
		getUser();
		const theFilters = ["booked lab tests", "tested", "results out"];
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

	const filterVariableTest = () => {};

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

	const getTitle = () => {
		return state ? `${state} lab tests` : "My lab tests";
	};

	return (
		<>
			<Navbar currentUser={currentUser} page={"my_lab_tests"} />
			<div className="container">
				{/* for mobile to sm screens */}
				<div className="pt-3">
					<h4 className="text-center pt-lg-4">{getTitle()}</h4>
					<div className="d-flex justify-content-evenly m-4 py-lg-3">
						<div className="input-group" style={{ width: width >= 576 ? "50%" : "75%" }}>
							<button className="btn btn-outline-info" type="button" id="button-addon2" disabled>
								<span className="material-symbols-outlined d-flex">search</span>
							</button>
							<input
								// value={searchTerm}
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
					) : !variableTests.length ? (
						<p className="fw-bold text-center mt-5 pt-5">
							<span class="material-symbols-outlined ">search_off</span>
							<span className="ms-2">No lab test booked yet</span>
						</p>
					) : (
						<div>
							{variableTests.map((test, index) => (
								<MyLabTestCard
									id={test._id}
									name={test.name}
									image={test.image}
									price={test.price}
									state={test.state}
									bookedOn={test.bookedOn}
									doneOn={test.doneOn}
									resultsOutOn={test.resultsOutOn}
									key={index}
									// handleViewDetails={() => handleViewDetails(test)}
								/>
							))}
						</div>
					)}
				</div>
				{variableTests.length < 2 && !user?.admin && !loading && !filterLoading && (
					<div className=" text-white rounded" style={{ position: "fixed", bottom: 20, backgroundColor: "#aaa" }}>
						<p className="p-3">
							After booking a lab test, you can call, email or message us if you're not clear on the test requirements.
							You'll send to us your home location, the date and time when your samples would be ready.{" "}
						</p>
						<a aria-label="Chat on WhatsApp" href="https://wa.me/+237670240005">
							{" "}
							<img alt="Chat on WhatsApp" src={whatsappbtn}></img>
						</a>
					</div>
				)}
			</div>
		</>
	);
};

export default MyLabTest;
