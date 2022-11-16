import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";

import {
	generateCarouselItemsForLargeScreens,
	generateCarouselItemsForMediumScreens,
	generateCarouselItemsForMobileScreens,
} from "../utils/carousel";
import { tests } from "../utils/testData";

const LabTestSection = () => {
	const [tests, setTests] = useState([]);

	const getTests = async () => {
		try {
			const res = await axiosInstance.get("/test");
			setTests(res.data);
			console.log("res.data", res.data);
		} catch (error) {
			console.log("error.response", error.response);
		}
	};

	useEffect(() => {
		getTests();
	}, []);

	return tests.length ? (
		<section id="labTests" className="py-5 text-light text-center" style={{ backgroundColor: "#055160" }}>
			<div className="container my-lg-5 py-lg-5">
				<h2 className="display-5  fw-bolder pb-3 pb-lg-5" style={{ color: "#0AA2C0" }}>
					Lab Tests
				</h2>
				<div>
					<div className="my-3 mb-5">
						We have a wide range of lab test, pick those you want to book appointments for
					</div>
					<Link
						className="my-3 text-end me-3 d-block text-decoration-none"
						style={{ color: "#0AA2C0" }}
						to="/lab_tests"
					>
						SEE ALL
					</Link>
				</div>
				{/* Carousel for mobile to sm screens */}
				<div id="carouselMobile" className="carousel slide d-sm-none" data-bs-ride="carousel">
					<div className="carousel-inner ">{generateCarouselItemsForMobileScreens(tests)}</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselMobile" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselMobile" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
				{/* Carousel for sm to lg screens */}
				<div id="carouselMedium" className="carousel slide  d-none d-sm-block d-lg-none" data-bs-ride="carousel">
					<div className="carousel-inner">{generateCarouselItemsForMediumScreens(tests)}</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselMedium" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselMedium" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
				{/* Carousel for lg and above screens */}
				<div id="carouselLarge" className="carousel slide d-none d-lg-block" data-bs-ride="carousel">
					<div className="carousel-inner">{generateCarouselItemsForLargeScreens(tests)}</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselLarge" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselLarge" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</section>
	) : null;
};

export default LabTestSection;
