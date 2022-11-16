import React from "react";

const LabTestCard = ({ image, name, price }) => {
	return (
		<div className="m-auto card card-style text-dark text-start shadow rounded" style={{ width: 230, height: 290 }}>
			<img
				style={{ marginBottom: "30px", height: 160 }}
				src={image}
				className="d-block card-img-top"
				alt="Complete Blood Count"
			></img>
			<div className="card-body pt-1">
				<h5 className="card-title">{name}</h5>
				<p className="card-text mb-1">{price} frs CFA</p>
				{/* <button className="btn btn-info w-100 d-flex justify-content-center">
					<span className="material-symbols-outlined">
						<span className="material-symbols-outlined">payments</span>
					</span>
					<span className="ms-2">BOOK TEST</span>
				</button> */}
				{/* <button className="btn btn-info w-100 mt-2 d-flex justify-content-center">
					<span className="material-symbols-outlined">add_shopping_cart</span>
					<span className="ms-2">ADD TO CART</span>
				</button> */}
			</div>
		</div>
	);
};

export default LabTestCard;
