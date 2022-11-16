import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";

const UserCard = ({ userId, firstName, lastName, email, phoneNo, dateOfBirth, index }) => {
	const navigate = useNavigate();
	const getColorByPosition = () => {
		const firstLetter = firstName.charAt(0).toLowerCase();

		switch (index % 10) {
			case 0:
				return "#aa2e25";
			case 1:
				return "#357a38";
			case 2:
				return "#6d1b7b";
			case 3:
				return "#482880";
			case 4:
				return "#00695f";
			case 5:
				return "#a31545";
			case 6:
				return "#2a3eb1";
			case 7:
				return "#9500ae";
			case 8:
				return "#b26a00";
			case 9:
				return "#2c387e";
			default:
				break;
		}
	};

	const [resultsOutText, setResultsOutText] = useState("Results out");
	return (
		<div
			onClick={() => navigate("/my_lab_tests/" + userId, { state: `${firstName} ${lastName}'s` })}
			className="card mb-3 w-100 border-0 user-card"
		>
			<div className="row g-0 justify-content-center">
				<div
					style={{
						width: 90,
						height: 90,
						verticalAlign: "middle",
						backgroundColor: getColorByPosition(),
					}}
					className="d-flex col-4 text-center rounded-circle text-light justify-content-center align-items-center  "
				>
					{firstName.charAt(0).toUpperCase() + " " + lastName.charAt(0).toUpperCase()}
				</div>
				<div className="col-8">
					<div className="card-body p-0 ps-3">
						<div className="d-flex justify-content-between align-items-center p-0">
							<h6 className="card-title mb-0">{firstName + " " + lastName}</h6>
							{/* <UserOptions /> */}
						</div>
						<div className="  ">
							<small className="text-muted ">Born on</small> <small>{new Date(dateOfBirth).toDateString()}</small>
						</div>
						<p className="card-text ">
							<small className="text-muted ">Telephone</small> <small>{phoneNo}</small>
						</p>
						<p className="card-text mb-2 ">
							<small className="text-muted ">Email</small> <small>{email}</small>
						</p>
					</div>
				</div>
			</div>
			<hr className="mb-0 w-75 m-auto" />
		</div>
	);
};

export default UserCard;
