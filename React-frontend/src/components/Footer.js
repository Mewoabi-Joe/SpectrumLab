import React from "react";
import logo from "../assets/photos/spectrumLabSquareLogo.jpeg";

const Footer = () => {
	return (
		<footer className="pt-3 text-muted" style={{ backgroundColor: "#055160", position: "relative" }}>
			<div className="container">
				<div className="d-flex justify-content-around ">
					<div className="text-center d-block">
						<img
							className="d-block m-auto mb-2"
							src={logo}
							alt="logo"
							width="65rem"
							style={{ borderRadius: "16rem", marginRight: "1.5rem", backgroundColor: "white" }}
						/>
						<a href="#" className="small text-decoration-none">
							Spectrum Lab
						</a>
					</div>
					<div className="d-sm-flex w-50 text-center justify-content-between mt-sm-5">
						<a href="#services" className="d-block  small mt-1 mt-sm-0 text-decoration-none">
							Services
						</a>
						<a href="#labTests" className="d-block  small text-decoration-none">
							Lab Tests
						</a>
						<a href="#getInTouch" className="d-block  small text-decoration-none">
							Get in touch
						</a>
					</div>
				</div>
				<p className="small d-flex justify-content-between my-4">
					<span>Payment policy</span>
					<span>Privacy policy</span>
					<span>Terms of service</span>
				</p>
				<p className="text-center">&copy;2022 SpectrumLab</p>
				<a className="btn btn-sm btn-secondary" style={{ position: "absolute", bottom: 5, right: 5 }} href="#">
					<span class="material-symbols-outlined " sty>
						arrow_upward
					</span>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
