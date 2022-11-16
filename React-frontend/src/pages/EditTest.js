import React, { useEffect, useState } from "react";
import cbc from "../assets/photos/cbc.jpg";
// import useWindowDimensions from "../hooks/WindowsDimensionHook";
import { tests } from "../utils/testData.js";
import axiosInstance, { baseURL } from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditTest = ({ currentUser }) => {
	const { testId } = useParams();
	console.log(testId);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [tagStates, setTagStates] = useState({});
	const [tags, setTags] = useState([]);
	// const { height, width } = useWindowDimensions();
	const [checkedTags, setCheckedTags] = useState([]);
	const [errors, setErrors] = useState([]);

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const [test, setTest] = useState({
		name: "",
		imagePath: "",
		image: "",
		price: "",
		description: "",
		tags: "",
	});

	const editTest = async (e) => {
		setLoading(true);
		setErrors([]);
		e.preventDefault();
		const data = new FormData();
		data.append("name", test.name);
		data.append("description", test.description);
		data.append("tags", JSON.stringify(checkedTags));
		data.append("image", test.image);
		data.append("price", test.price);

		try {
			const res = await axiosInstance.put("/test/" + testId, data);
			navigate("/lab_test_details", { state: res.data.test });
			console.log(res);
		} catch (error) {
			console.log("error", error);
			console.log("error.response.data", error.response.data);
			const axiosErrors = error.response.data;
			const localErrors = [];
			axiosErrors.forEach((error) => localErrors.push(` - ${error.name || error.image || error.price}`));
			console.log("localErrors", localErrors);
			setErrors(localErrors);
			setLoading(false);
		}
	};

	const initialTest = {
		name: "Complete Blood Count(CBC)",
		description:
			"A blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia. A complete blood count test measures several components and features of your blood, including: Red blood cells, which carry oxygen",
		image: cbc,
		tags: ["blood test", "screening test"],
		price: 50000,
	};

	const capitalizeFirstLetterOfTagsInTest = () => {
		return tests.map((test) => {
			const capitalisedTags = test.tags.map((tag) => capitalizeFirstLetter(tag));
			test.tags = capitalisedTags;
			return test;
		});
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		const getTest = async () => {
			try {
				const res = await axiosInstance.get(`${baseURL}/test/${testId}`);
				res.data.imageURL = baseURL + res.data.imagePath;
				setTest(res.data);
				setCheckedTags(res.data.tags);

				setTags(theTags);
				let localTagStates = {};
				console.log(test);
				theTags.forEach((tag) =>
					res.data.tags.includes(tag) ? (localTagStates[tag] = true) : (localTagStates[tag] = false)
				);
				setTagStates(localTagStates);
			} catch (error) {
				console.log(error.response);
			}
		};
		getTest();
		const originalTestsWithCapitalisedTags = capitalizeFirstLetterOfTagsInTest();
		let labTestTags = [];
		originalTestsWithCapitalisedTags.forEach((test) => labTestTags.push(...test.tags));
		const setOflabTestTags = new Set(labTestTags);
		const theTags = Array.from(setOflabTestTags);
		// console.log("theTags", theTags);
	}, []);

	const handleCheckBoxChange = (e) => {
		let localTagStates = tagStates;
		localTagStates[e.target.id] = e.target.checked;
		setTagStates(localTagStates);
		updateCheckedTags();
		console.log("tagStates", tagStates);
		console.log("tags", tags);
		forceUpdate();
	};

	console.log("A rerender");
	const updateCheckedTags = () => {
		const tagKeys = Object.keys(tagStates);
		const localCheckedTags = tagKeys.filter((tagKey) => tagStates[tagKey] === true);
		console.log("checkedTags", localCheckedTags);
		setCheckedTags(localCheckedTags);
	};

	return (
		<div>
			<Navbar currentUser={currentUser} page={"edit_test"} />
			{errors.length ? (
				<div class="alert alert-danger position-sticky" style={{ top: 70 }} role="alert">
					{errors.map((error) => (
						<div>{error}</div>
					))}
				</div>
			) : null}
			<h2 className="text-center mt-3">Edit lab test</h2>
			<div className="mt-lg-3">
				<div className="row justify-content-center">
					<div className="py-2 px-4 pt-3 col-md-8 col-lg-5">
						<input
							onChange={(e) =>
								setTest((test) => {
									return { ...test, name: e.target.value };
								})
							}
							className="text-center d-lg-none h2 form-control form-control-lg d-block mb-3"
							type="text"
							placeholder="Enter lab test name"
							value={test.name}
						/>
						<label
							style={{ height: 310 }}
							className="d-flex justify-content-center align-items-center d-block w-100 border  rounded-3"
							for="upload-photo"
						>
							{test.imagePath === "" ? (
								<>
									<span class="d-flex material-symbols-outlined me-2 ">add</span>
									Test image
								</>
							) : (
								<img style={{ height: 310, width: 482 }} src={test.imageURL} alt="" />
							)}
						</label>
						<input
							onChange={(e) => {
								const [file] = e.target.files;
								setTest((test) => {
									return { ...test, image: file };
								});
								let reader = new FileReader();

								reader.onload = function (ev) {
									console.log(ev.target.result);
									setTest((test) => {
										return { ...test, imageURL: ev.target.result };
									});
								};
								reader.readAsDataURL(file);
							}}
							type="file"
							name="photo"
							id="upload-photo"
							accept="image/*"
							required
						/>
					</div>
					<div className="col col-md-8 col-lg-6  py-3 px-4">
						<input
							onChange={(e) =>
								setTest((test) => {
									return { ...test, name: e.target.value };
								})
							}
							className="d-none mb-3 d-lg-block text-center h2 form-control form-control-lg d-block "
							type="text"
							placeholder="Enter lab test name"
							value={test.name}
						/>

						<div class="input-group pb-3">
							<input
								onChange={(e) =>
									setTest((test) => {
										return { ...test, price: e.target.value };
									})
								}
								type="number"
								class="form-control lead"
								placeholder="Enter cost"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
								value={test.price}
							/>
							<span class="input-group-text lead" id="basic-addon2">
								frs CFA
							</span>
						</div>
						<textarea
							onChange={(e) =>
								setTest((test) => {
									return { ...test, description: e.target.value };
								})
							}
							placeholder="Enter description"
							class="form-control mb-3"
							id="exampleFormControlTextarea1 "
							value={test.description}
							rows="7"
						></textarea>
						<div className="dropdown-center w-100 mb-3">
							<button
								type="button"
								className="btn btn-light border dropdown-toggle w-100 d-flex justify-content-between align-items-center"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								// data-bs-offset="10,20"
							>
								Select tags which describe the lab test
							</button>
							<ul className="dropdown-menu">
								{tags.map((tag, index) => (
									<li key={index}>
										<div class="dropdown-item">
											<div className="form-check ">
												<input
													class="form-check-input"
													type="checkbox"
													checked={tagStates[tag]}
													onChange={handleCheckBoxChange}
													value=""
													id={tag}
												></input>
												<label class="form-check-label" htmlFor={tag}>
													{tag}
												</label>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>

						<button
							onClick={editTest}
							className="d-flex justify-content-center align-items-center btn btn-info btn-lg  w-100"
						>
							{!loading ? (
								<>
									<span class="material-symbols-outlined me-2">task_alt</span>
									<span>Save</span>
								</>
							) : (
								<div class="spinner-border spinner-border-sm text-secondary" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTest;
