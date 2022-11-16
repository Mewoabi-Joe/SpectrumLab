import LabTestCard from "../components/LabTestCard";
import { baseURL } from "./axios";

// Remember that I have to get a hold of the carousel item in my css to remove the margin around it so that flex can work well to arrange more that one in a row.

export const generateCarouselItemsForMobileScreens = (tests) => {
	//One carousel item for mobile screens
	return tests.map((test, index) => {
		if (index === 0)
			return (
				<div className="carousel-item active" data-bs-interval="3000" key={index}>
					<LabTestCard name={test.name} image={`${baseURL}${test.imagePath}`} price={test.price} />
				</div>
			);
		return (
			<div className="carousel-item" data-bs-interval="3000" key={index}>
				<LabTestCard name={test.name} image={`${baseURL}${test.imagePath}`} price={test.price} />
			</div>
		);
	});
};

export const generateCarouselItemsForMediumScreens = (tests) => {
	//Two carousel items for Medium screens
	let carouselTests = [];
	for (let i = 0; i < tests.length; i += 2) {
		if (i === 0)
			carouselTests.push(
				<div className="carousel-item active  " data-bs-interval="4000" key={i}>
					<div className="d-flex justify-content-evenly">
						<LabTestCard name={tests[i].name} image={`${baseURL}${tests[i].imagePath}`} price={tests[i].price} />
						{i + 1 < tests.length && (
							<LabTestCard
								name={tests[i + 1].name}
								image={`${baseURL}${tests[i + 1].imagePath}`}
								price={tests[i + 1].price}
							/>
						)}
					</div>
				</div>
			);
		else if (i + 1 < tests.length)
			carouselTests.push(
				<div className="carousel-item  " data-bs-interval="4000" key={i}>
					<div className="d-flex justify-content-evenly">
						<LabTestCard name={tests[i].name} image={`${baseURL}${tests[i].imagePath}`} price={tests[i].price} />
						<LabTestCard
							name={tests[i + 1].name}
							image={`${baseURL}${tests[i + 1].imagePath}`}
							price={tests[i + 1].price}
						/>
					</div>
				</div>
			);
	}

	return carouselTests;
};

export const generateCarouselItemsForLargeScreens = (tests) => {
	//Three carousel items for large screens
	let carouselTests = [];
	for (let i = 0; i < tests.length; i += 3) {
		if (i === 0)
			carouselTests.push(
				<div className="carousel-item active" data-bs-interval="4000" key={i}>
					<div className="d-flex justify-content-evenly">
						<LabTestCard name={tests[i].name} image={`${baseURL}${tests[i].imagePath}`} price={tests[i].price} />
						{i + 1 < tests.length && (
							<LabTestCard
								name={tests[i + 1].name}
								image={`${baseURL}${tests[i + 1].imagePath}`}
								price={tests[i + 1].price}
							/>
						)}
						{i + 2 < tests.length && (
							<LabTestCard
								name={tests[i + 2].name}
								image={`${baseURL}${tests[i + 2].imagePath}`}
								price={tests[i + 2].price}
							/>
						)}
					</div>
				</div>
			);
		else if (i + 2 < tests.length)
			carouselTests.push(
				<div className="carousel-item  " data-bs-interval="4000" key={i}>
					<div className="d-flex justify-content-evenly">
						<LabTestCard name={tests[i].name} image={`${baseURL}${tests[i].imagePath}`} price={tests[i].price} />
						<LabTestCard
							name={tests[i + 1].name}
							image={`${baseURL}${tests[i + 1].imagePath}`}
							price={tests[i + 1].price}
						/>
						<LabTestCard
							name={tests[i + 2].name}
							image={`${baseURL}${tests[i + 2].imagePath}`}
							price={tests[i + 1].price}
						/>
					</div>
				</div>
			);
	}

	return carouselTests;
};
