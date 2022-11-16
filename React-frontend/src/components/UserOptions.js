import React from "react";

const UserOptions = ({ handleViewDetails, handleEditTest }) => {
	return (
		<div>
			<div className="dropdown">
				<button
					className="btn btn-outline-info rounded-circle caret-off pt-2 border-0"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<span className="material-symbols-outlined fs-5" style={{ color: "black" }}>
						more_vert
					</span>
				</button>
				<ul className="dropdown-menu">
					<li onClick={handleViewDetails}>
						<div className="dropdown-item d-flex">
							<span class="material-symbols-outlined  me-2">visibility</span>
							<span>view tests</span>
						</div>
					</li>

					<li>
						<a className="dropdown-item d-flex" href="#a">
							<span class="material-symbols-outlined me-2">delete_forever</span>
							Delete user
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserOptions;
