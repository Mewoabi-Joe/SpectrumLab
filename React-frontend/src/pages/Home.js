import React from "react";
import About from "../components/About";
import FirstSection from "../components/FirstSection";
import Footer from "../components/Footer";
import GetInTouch from "../components/GetInTouch";
import LabTestSection from "../components/LabTestSection";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";

const Home = ({ currentUser }) => {
	return (
		<main>
			<Navbar currentUser={currentUser} page={"home"} />
			<FirstSection />
			<About />
			<ServicesSection />
			<LabTestSection />
			<GetInTouch />
			<Footer />
		</main>
	);
};

export default Home;
