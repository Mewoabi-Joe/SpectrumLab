import React from "react";
import MoreOptions from "./MoreOptions.js";
import { baseURL } from "../utils/axios";

const ShortCartNoBorder = ({ id, image, name, price, handleViewDetails, handleEditTest }) => {
	return (
		<div
			className="m-auto card short-card-style text-dark text-start shadow rounded border-0 pb-4"
			style={{ width: 230, maxHeight: "250px" }}
		>
			<img
				onClick={handleViewDetails}
				src={baseURL + image}
				className="d-block card-img-top h-75"
				alt="Complete Blood Count"
				style={{ maxHeight: 150, objectFit: "cover" }}
			></img>
			<div className="card-body pt-1">
				<div className="d-flex align-items-center justify-content-between">
					<h6 onClick={handleViewDetails} className="card-title mb-0">
						{name}
					</h6>
					<MoreOptions
						price={price}
						testId={id}
						handleViewDetails={handleViewDetails}
						handleEditTest={handleEditTest}
					/>
				</div>
				<p onClick={handleViewDetails} className="card-text mb-1">
					<small>{price == 0 ? "free" : `${price} frs CFA`}</small>
				</p>
			</div>
		</div>
	);
};

export default ShortCartNoBorder;
