import React from "react";
import { baseURL } from "../utils/axios";
import MoreOptions from "./MoreOptions";

const MobileScreenCard = ({ id, image, name, price, handleViewDetails, handleEditTest }) => {
	console.log(baseURL + image);
	return (
		<div style={{ height: "fit-content" }} className="card mb-3 w-100 border-0">
			<div className="row g-0">
				<div className="col-4">
					<img
						onClick={handleViewDetails}
						src={baseURL + image}
						style={{ maxHeight: 300 }}
						className="img-fluid"
						alt={name}
					></img>
				</div>
				<div className="col-8">
					<div className="card-body p-0 ps-3">
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
						<p onClick={handleViewDetails} className="card-text">
							{price ? (
								<div>
									<small className="text-muted">{price}</small>
									<small className="text-muted ms-3">frs CFA</small>
								</div>
							) : (
								<small>free</small>
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileScreenCard;
