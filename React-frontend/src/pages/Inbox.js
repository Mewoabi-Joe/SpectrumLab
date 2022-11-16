import React, { useEffect, useState } from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/WindowsDimensionHook";
import axiosInstance from "../utils/axios";

const Inbox = ({ currentUser }) => {
	const { height, width } = useWindowDimensions();
	const [originalMessages, setOriginalMessages] = useState([]);
	const [variableMessages, setVariableMessages] = useState([]);
	const [filterLoading, setFilterLoading] = useState(false);
	const [filterStates, setFilterStates] = useState({});
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axiosInstance.get("/messages");
				setOriginalMessages(res.data.messages);
				setVariableMessages(res.data.messages);
				console.log("res.data", res.data.messages);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();
	}, []);

	const unTickAllCheckBoxes = () => {
		const filterKeys = Object.keys(filterStates);
		const localFilterStates = filterStates;
		filterKeys.forEach((filterKey) => (localFilterStates[filterKey] = false));
		console.log(localFilterStates);
		setFilterStates(localFilterStates);
	};

	const handleEmptySearch = () => {
		setSearchTerm("");
		setVariableMessages(originalMessages);
	};

	const handleSearchInputChange = (text) => {
		unTickAllCheckBoxes();
		setSearchTerm(text);
		console.log("variableMessages", variableMessages);
		const usersCorrespondingToSearch = originalMessages.filter((user) => {
			return (
				user.firstName.toLowerCase().includes(text.toLowerCase()) ||
				user.lastName.toLowerCase().includes(text.toLowerCase())
			);
		});
		// console.log("usersCorrespondingToSearch", usersCorrespondingToSearch);
		setVariableMessages(usersCorrespondingToSearch);
	};

	return (
		<div>
			<Navbar currentUser={currentUser} page={"inbox"} />
			<h2 className="d-md-none text-center mt-3">Inbox</h2>

			<div className="d-flex justify-content-center m-3 m-md-4 pb-3 pt-lg-2 pb-lg-4">
				<h2 className="d-none mb-0 d-md-block me-3">Inbox</h2>
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
			</div>
			<div className="">
				{loading ? (
					<div className="text-center mt-5 pt-5 text-info">
						<div class="spinner-grow" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				) : !originalMessages.length ? (
					<p className="fw-bold text-center mt-5 pt-5">
						<span className="ms-2">No message has been sent to you</span>
					</p>
				) : !variableMessages.length ? (
					<p className="fw-bold text-center mt-5 pt-5">
						<span class="material-symbols-outlined ">search_off</span>
						<span className="ms-2">No Match</span>
					</p>
				) : (
					variableMessages.map((message) => (
						<MessagePreview
							firstName={message.firstName}
							lastName={message.lastName}
							date={message.createdOn}
							message={message.message}
							email={message.email}
							phone={message.phoneNo}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Inbox;
