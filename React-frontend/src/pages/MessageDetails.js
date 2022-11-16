import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const MessageDetails = ({ currentUser }) => {
	const { state } = useLocation();
	const { firstName, lastName, message, date, email, phone } = state;
	return (
		<div>
			<Navbar currentUser={currentUser} page={"message_details"} />
			<h2 className="text-center m-3">Message details</h2>

			<div className="row justify-content-center">
				<div className="col-11 col-md-9 col-lg-8 col-xl-7">
					<div class="card">
						<div class="card-header">
							<div className="text-center p-3">{firstName + " " + lastName}</div>
							<div className="d-flex  d-flex justify-content-between">
								<div className="small px-md-3">{email}</div>
								<div className="small px-md-3">{phone}</div>
							</div>
						</div>
						<div class="card-body">
							<p class="card-text">{message}</p>
						</div>
						<div className="card-footer text-center text-muted">{new Date(date).toDateString()}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageDetails;
