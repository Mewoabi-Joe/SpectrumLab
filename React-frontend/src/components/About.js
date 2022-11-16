import React from "react";
import { Link } from "react-router-dom";

import laboWorkers from "../assets/photos/manAndWoman1.jpg";
import useWindowDimensions from "../hooks/WindowsDimensionHook";

const About = () => {
	const { height, width } = useWindowDimensions();
	const getAboutContent = () => {
		if (width > 992) {
			return `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perspiciatis sed, ipsum mollitia
			laboriosam eveniet exercitationem illum, porro ex cum, eaque voluptates sunt. Ratione dignissimos
			temporibus voluptates, ducimus id sint pariatur illum sunt neque facere quod blanditiis veritatis
			mollitia rem dolore, assumenda, totam recusandae natus. Itaque pariatur tempore enim vitae voluptate?
			Cum ab sequi praesentium atque, eligendi distinctio sed iure est voluptatum, architecto ut voluptate
			nemo possimus alias consequuntur neque. Beatae hic fugiat aperiam nesciunt tenetur dolorum in omnis quia
			atque ullam facere deserunt eos voluptatibus voluptas cum, totam voluptatum repudiandae dolorem dolore
			exercitationem dignissimos. Nam alias autem enim libero maiores rem, voluptatem ad quod vel doloribus?
			Ex esse officia rerum eius ratione totam reiciendis ea quam rem, impedit omnis, ipsum ut sit veritatis.
			Nobis illum veniam veritatis tenetur nisi praesentium perspiciatis voluptates optio. Beatae suscipit
			tenetur illo eos sint, corporis doloribus adipisci eius. Quos debitis totam expedita repellendus ut?`;
		} else {
			return `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perspiciatis sed, ipsum mollitia
			laboriosam eveniet exercitationem illum, porro ex cum, eaque voluptates sunt. Ratione dignissimos
			temporibus voluptates, ducimus id sint pariatur illum sunt neque facere quod blanditiis veritatis
			mollitia rem dolore, assumenda, totam recusandae natus. Itaque pariatur tempore enim vitae voluptate?
			Cum ab sequi praesentium atque, eligendi distinctio sed iure est voluptatum, architecto ut voluptate
		 `;
		}
	};

	return (
		<div>
			<section id="sectionOne" className="py-5 text-light" style={{ backgroundColor: "#055160" }}>
				<div className="container my-lg-5">
					<div className="d-lg-flex justify-content-between py-lg-5">
						{/* <p className="display-6 fw-bold my-4 pb-md-3 d-lg-none" style={{ color: "#0AA2C0" }}>
						Physical examination
					</p> */}

						<img
							src={laboWorkers}
							alt="Laboratory technicieans"
							className="d-none img-fluid d-lg-inline-block w-50 rounded-4"
							style={{ height: 500, width: 315 }}
						/>

						<div className=" ps-lg-5  ">
							<h2 className="display-5 fw-bolder mb-4 " style={{ color: "#0AA2C0" }}>
								About Spectrum Lab
							</h2>
							<p className={width < 768 ? "small" : ""}>{getAboutContent()}</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
