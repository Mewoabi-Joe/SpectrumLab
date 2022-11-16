import React from "react";
import firstIllus from "../assets/illustrations/undraw_medicine_b-1-ol.svg";
import photo from "../assets/photos/new.webp";
import { Link } from "react-router-dom";

const FirstSection = () => {
	return (
		<section id="sectionOne" className="py-5 text-dark" style={{ backgroundColor: "#ccc" }}>
			<div className="container mb-lg-5 pt-0 pb-lg-5">
				<h1 className="title display-5 fw-bolder  text-center mb-5">
					<span style={{ color: "#055160" }}>SPECTRUM</span>{" "}
					<span className="ms-4" style={{ color: "#6E943D" }}>
						LAB
					</span>
				</h1>
				<div className="d-lg-flex justify-content-between align-items-center text-center py-0 py-lg-5">
					<div className="text-center text-lg-start h4 me-lg-3">
						{/* <p>
							We carry out tests{" "}
							<span className=" fw-bolder" style={{ color: "#0AA2C0" }}>
								24
							</span>{" "}
							hours a day,{" "}
							<span className=" fw-bolder" style={{ color: "#0AA2C0" }}>
								365
							</span>{" "}
							days a year.
						</p> */}
						<p>
							Your{" "}
							<span className=" fw-bolder" style={{ color: "#0AA2C0" }}>
								health
							</span>{" "}
							is our top priority so
						</p>
						<p className="">
							Ensuring you get accurate results as fast possible is our priority at{" "}
							<span className="   fw-bolder" style={{ color: "#0AA2C0" }}>
								Spectrum Lab
							</span>
						</p>

						<Link
							to="/lab_tests"
							className="call-to-action btn btn-info btn-lg my-5"
							style={{ backgroundColor: "#0AA2C0" }}
						>
							Book a lab exam
						</Link>
					</div>
					<img
						style={{ border: "none" }}
						src={photo}
						alt="first illustration"
						className="d-none img-fluid d-lg-inline-block w-50 rounded-4"
					/>
				</div>
			</div>
		</section>
	);
};
export default FirstSection;
