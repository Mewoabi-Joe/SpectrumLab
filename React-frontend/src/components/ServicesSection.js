import React from "react";
import diagnosis from "../assets/illustrations/undraw_doctor_kw-5-l.svg";
import treatment from "../assets/illustrations/undraw_medical_care_movn.svg";
import prevention from "../assets/illustrations/undraw_scientist_0ft9.svg";
// import followUp from "../assets/illustrations/undraw_medical_research_qg4d.svg";

const ServicesSection = () => {
	//Remember I'm using just two break point mobile screens(xsm) to lg then lg and above
	// Things have been douplicated for handle responsiveness so if text has to be modified don't forget to modify twice
	return (
		<section id="services" className="py-5" style={{ backgroundColor: "#ccc" }}>
			<div className="container my-lg-5 py-lg-5">
				<h2 className="display-5 text-center text-dark fw-bolder er mb-lg-5 pb-3 pb-lg-5">Our Services</h2>
				{/* physical examination */}
				<div className="d-lg-flex justify-content-between align-items-center text-center">
					{/* This Diagnosis should show above the image from lg and below */}
					<p className="display-6   my-4 pb-md-3 d-lg-none" style={{ color: "#0AA2C0" }}>
						Physical examination
					</p>

					<img src={diagnosis} alt="diagnosis" className="d-none img-fluid d-lg-inline-block w-50" />
					<img src={diagnosis} alt="diagnosis" className="d-inline-block mb-4 d-lg-none img-fluid w-75" />
					<div className="text-center text-lg-start ps-lg-5  ">
						<p className="display-6 d-none d-lg-block   my-3" style={{ color: "#0AA2C0" }}>
							Physical examination
						</p>
						<p className="">
							We can draw some insight on your health state by examining some of your physical parameters including your
							weight, heart rate, and blood pressure
						</p>
					</div>
				</div>
				{/* Lab test */}
				<div className="d-lg-flex justify-content-between align-items-center text-center pt-5">
					<div className="text-center text-lg-start  ">
						<p className="display-6 pb-md-3 pb-lg-0   my-3" style={{ color: "#0AA2C0" }}>
							Laboratory testing
						</p>
						<p className="d-none d-lg-block  ">
							By examining your clinical specimen, we obtain information about your health, necessary for your
							diagnosis, treatment and disease prevention.
						</p>
					</div>
					<img src={prevention} alt="prevention" className="d-none img-fluid d-lg-inline-block w-50" />
					<img src={prevention} alt="prevention" className="d-inline-block d-lg-none mb-4 img-fluid w-75" />
					<p className="d-lg-none  ">
						By examining your clinical specimen, we obtain information about your health, necessary for your diagnosis,
						treatment and disease prevention.
					</p>
				</div>
				{/* prevention */}
				<div className="d-lg-flex justify-content-between align-items-center text-center pt-5">
					{/* This Diagnosis should show above the image from lg and below */}
					<p className="display-6   my-4 pb-md-3 d-lg-none" style={{ color: "#0AA2C0" }}>
						Pharmaceutical care
					</p>

					<img src={treatment} alt="treatment" className="d-none img-fluid d-lg-inline-block w-50" />
					<img src={treatment} alt="treatment" className="d-inline-block mb-4 d-lg-none img-fluid w-75" />
					<div className="text-center text-lg-start ps-lg-5  ">
						<p className="display-6 d-none d-lg-block    my-3" style={{ color: "#0AA2C0" }}>
							Pharmaceutical care
						</p>
						<p className="">
							We provide drug therapy and decisions on medication usage for our patients ensuring their quality of life
							improves definitely.
						</p>
					</div>
				</div>
				{/* follow-up
				<div className="d-lg-flex justify-content-between align-items-center text-center pt-5">
					<div className="text-center text-lg-start  ">
						<p className="display-6 pb-md-3 pb-lg-0   my-3" style={{ color: "#0AA2C0" }}>
							Follow-up
						</p>
						<p className="d-none d-lg-block  ">We stay in touch with you till you are completely healed</p>
					</div>
					<img src={followUp} alt="follow-up" className="d-none img-fluid d-lg-inline-block w-50" />
					<img src={followUp} alt="follow-up" className="d-inline-block d-lg-none mb-4 img-fluid w-75" />
					<p className="d-lg-none  ">We stay in touch with you till you are completely healed</p>
				</div> */}
			</div>
		</section>
	);
};

export default ServicesSection;
