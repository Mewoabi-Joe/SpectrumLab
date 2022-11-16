import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useWindowDimensions from "../hooks/WindowsDimensionHook";
import axiosInstance, { baseURL } from "../utils/axios";
import store from "../redux/store";
import ConfirmBookTest from "../components/ConfirmBookTest";
import CannotBookModal from "../components/CannotBookModal";
import Navbar from "../components/Navbar";
// import ConfirmBookTest from "../components/ConfirmBookTest"

const LabTestDetails = ({ currentUser }) => {
	const [loading, setLoading] = useState(false);

	const { height, width } = useWindowDimensions();
	console.log("width", width);

	const [modal, setModal] = useState("");
	const [cannotBookModal, setCannotBookModal] = useState("");

	const { state } = useLocation();
	const user = store.getState().auth.user;

	console.log("user", user);

	const initiatePayment = async () => {
		setLoading(true);
		if (!user) {
			return setCannotBookModal(<CannotBookModal />);
		}
		const body = {
			userId: user.userId,
			amount: state.price,
			externalId: state._id,
			email: user.email,
			redirectUrl: `https://frontend-clinic.herokuapp.com/my_lab_tests/${user.userId}`,
		};

		console.log(body);
		try {
			const res = await axiosInstance.post(`/payment/initiate_pay`, body);
			window.location.href = res.data.link;
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		// If anything disturbs add container class
		<>
			<Navbar currentUser={currentUser} page={"lab_test_details"} />
			<div className="mt-lg-3">
				<div className="row justify-content-center">
					<div className="py-2 pt-3 col-md-8 col-lg-5">
						<h2 className="text-center d-lg-none ">{state.name}</h2>
						<img
							style={{ objectFit: "cover", height: 310, width: 482 }}
							src={baseURL + state.imagePath}
							alt="Test Image"
							className="img-fluid "
						/>
					</div>
					<div className="col col-md-8 col-lg-6  p-3 px-4">
						<h2 className="d-none d-lg-block">{state.name}</h2>
						<p className="lead pb-1">{state.price} frs CFA</p>
						<p className="pb-3">{state.description}</p>
						<div className="d-xl-flex justify-content-between">
							<button
								onMouseEnter={() => {
									setModal("");
									setCannotBookModal("");
								}}
								onClick={() => {
									setModal(<ConfirmBookTest initiatePayment={initiatePayment} />);
								}}
								style={width > 1200 ? { width: "47%" } : { width: "100%" }}
								className="d-flex justify-content-center mb-2 btn btn-info btn-info d-inline-block"
							>
								{!loading ? (
									<div className="d-flex justify-content-center align-items-center">
										<span class="material-symbols-outlined me-2">payments</span>
										<span>Book test</span>
									</div>
								) : (
									<div class="spinner-border spinner-border-sm text-secondary" role="status">
										<span class="visually-hidden">Loading...</span>
									</div>
								)}
								{modal}
								{cannotBookModal}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LabTestDetails;
