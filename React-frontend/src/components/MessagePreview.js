import React from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/WindowsDimensionHook";

const MessagePreview = ({ firstName, lastName, message, date, email, phone }) => {
	console.log("date", date);
	const { height, width } = useWindowDimensions();
	const navigate = useNavigate();

	const sliceBasedOnScreenWidth = (message) => {
		if (width < 576) {
			return message.slice(0, 30);
		} else if (width < 768) {
			return message.slice(0, 60);
		} else if (width < 992) {
			return message.slice(0, 90);
		} else if (width < 1200) {
			return message.slice(0, 120);
		} else {
			return message.slice(0, 150);
		}
	};
	return (
		<div
			className="row g-0 justify-content-center mb-4"
			onClick={() => {
				navigate("/message_details", { state: { firstName, lastName, message, date, email, phone } });
			}}
		>
			<div className="col-8">
				<div class="card">
					<div class="card-header d-flex justify-content-between">
						<div>{firstName + " " + lastName}</div>
						<div className="small">{new Date(date).toDateString()}</div>
					</div>
					<div class="card-body">
						<p class="card-text">{sliceBasedOnScreenWidth(message)}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessagePreview;
