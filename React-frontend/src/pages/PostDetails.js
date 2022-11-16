import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/WindowsDimensionHook";
import { baseURL } from "../utils/axios";

const PostDetails = ({ currentUser }) => {
	const { state } = useLocation();
	const { title, description, youtubeVideoUrl, imageUrl, types, created_at } = state;
	const { height, width } = useWindowDimensions();

	const myBackgroundImage = document.querySelector(".myBackgroundImage");
	const bestVerticalPos = myBackgroundImage?.offsetHeight;
	console.log("bestVerticalPos", bestVerticalPos);
	console.log("state", state);

	return (
		<div>
			<Navbar currentUser={currentUser} page={"post_details"} />
			{imageUrl ? (
				<header
					style={{
						width: "100vw",
						background: "black",
						overflow: "hidden",
					}}
				>
					<div
						className="myBackgroundImage"
						style={{
							opacity: 0.7,
							backgroundBlendMode: "darken",
							width: "100vw",
							backgroundImage: `url(${baseURL + imageUrl})`,
							// backgroundImage: `url(${externalImage})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
							height: "50vh",
							color: "white",
						}}
					>
						<h3 className="display-6 d-flex justify-content-center align-items-center h-100 ">
							<p className=" rounded-3 p-2 m-3 text-center" style={{ opacity: 0.7, backgroundColor: "#000" }}>
								{title}
							</p>
						</h3>
					</div>
				</header>
			) : (
				<iframe
					className="w-100"
					src={youtubeVideoUrl}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen;picture-in-picture"
					height="400"
				></iframe>
			)}

			<div className={`container ${youtubeVideoUrl ? "pt-3" : "pt-5"}`}>
				{!imageUrl && <h3>{title}</h3>}
				<div className="small py-2">{new Date(created_at).toDateString()}</div>
				<div>{description}</div>
			</div>
		</div>
	);
};

export default PostDetails;
