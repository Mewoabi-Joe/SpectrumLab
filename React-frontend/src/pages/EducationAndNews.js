import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios.js"
import useWindowDimensions from "../hooks/WindowsDimensionHook.js"
import PostCard from "../components/PostCard"
import { informations as posts } from "../utils/testData"
// import Modal from "react-bootstrap/Modal"

const EducationAndNews = ({ currentUser }) => {
  const [filter, setFilter] = useState("none")
  const [originalInformations, setOriginalInformations] = useState([])
  const [informations, setInformations] = useState([])
  const [variableInformations, setVariableInformations] = useState([])
  const [filterLoading, setFilterLoading] = useState(false)
  const [informationsLoading, setInformationsLoading] = useState(false)
  const [typeStates, setTypeStates] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [types, setTypes] = useState([])
  const { height, width } = useWindowDimensions()
  const [postChanged, setPostChanged] = useState(false)
  const [loading, setLoading] = useState(false)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const capitalizeFirstLetterOfTypesInInformation = informations => {
    return informations.map(information => {
      const capitalisedTypes = information.type.map(type =>
        capitalizeFirstLetter(type)
      )
      information.type = capitalisedTypes
      return information
    })
  }

  useEffect(() => {
    const getInformations = async () => {
      try {
        setInformations(true)
        setInformationsLoading(true)
        let thePosts = []
        const res = await axiosInstance.get("/posts")

        console.log("res.data.posts.length", res.data.posts.length)
        if (res.data.posts.length) {
          let arrayOfPosts = res.data.posts

          thePosts = arrayOfPosts.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.created_at) - new Date(b.created_at)
          })
        } else {
          thePosts = posts
        }
        console.log("thePosts", res.data)
        const originalInformationsWithCapitalisedTypes =
          capitalizeFirstLetterOfTypesInInformation(thePosts)
        setOriginalInformations(originalInformationsWithCapitalisedTypes)
        setVariableInformations(originalInformationsWithCapitalisedTypes)
        let labInformationTypes = []
        originalInformationsWithCapitalisedTypes.forEach(information =>
          labInformationTypes.push(...information.type)
        )
        const setOflabInformationTypes = new Set(labInformationTypes)
        const theTypes = Array.from(setOflabInformationTypes)
        // console.log("theTypes", theTypes);
        setTypes(theTypes)
        let localTypeStates = {}
        theTypes.forEach(type => (localTypeStates[type] = false))
        setTypeStates(localTypeStates)
        setInformations(res.data)
        setInformationsLoading(false)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setInformationsLoading(false)
      }
    }
    getInformations()
  }, [])

  const handleCheckBoxChange = async e => {
    setSearchTerm("")
    setFilterLoading(true)
    let localTypeStates = typeStates
    localTypeStates[e.target.id] = e.target.checked
    setTypeStates(localTypeStates)
    filterVariableInformation()
    setTimeout(() => {
      setFilterLoading(false)
    }, 1000)
  }

  const filterVariableInformation = () => {
    const typeKeys = Object.keys(typeStates)
    const checkedTypes = typeKeys.filter(
      typeKey => typeStates[typeKey] === true
    )
    console.log("checkedTypes", checkedTypes)
    const filteredOriginalInformation = originalInformations.filter(
      information => {
        let match = false
        information.type.forEach(type => {
          if (checkedTypes.includes(type)) {
            match = true
          }
        })
        if (match) return true
      }
    )
    if (filteredOriginalInformation.length) {
      setVariableInformations(filteredOriginalInformation)
    } else {
      setVariableInformations(originalInformations)
    }
  }

  const unTickAllCheckBoxes = () => {
    const typeKeys = Object.keys(typeStates)
    const localTypeStates = typeStates
    typeKeys.forEach(typeKey => (localTypeStates[typeKey] = false))
    console.log("localTypeStates", localTypeStates)
    setTypeStates(localTypeStates)
  }

  const handleSearchInputChange = text => {
    unTickAllCheckBoxes()
    setSearchTerm(text)
    console.log("variableInformations", variableInformations)
    const informationsCorrespondingToSearch = originalInformations.filter(
      information => {
        console.log("text", text)
        return information.title.toLowerCase().includes(text.toLowerCase())
      }
    )
    console.log(
      "informationsCorrespondingToSearch",
      informationsCorrespondingToSearch
    )
    setVariableInformations(informationsCorrespondingToSearch)
  }

  const handleEmptySearch = () => {
    setSearchTerm("")
    setVariableInformations(originalInformations)
  }

  const navigate = useNavigate()

  const handleViewDetails = information => {
    console.log(information)
    navigate("/lab_information_details", { state: information })
  }

  return (
    <div>
      <Navbar currentUser={currentUser} page={"education_news"} />

      <div className="container">
				<div className="pt-3 row justify-content-center mt-xl-4">
					<h2
						style={width > 1200 ? { maxWidth: 330 } : null}
						className="col-12 col-xl-4 text-center py-3 py-xl-0 px-xl-0"
					>
						News and Education
					</h2>
					<div className="col-7 col-xl-6 pe-lg-5  px-xl-5">
						<div className="input-group">
							<button className="btn btn-outline-info" type="button" id="button-addon2" disabled>
								<span className="material-symbols-outlined d-flex">search</span>
							</button>
							<input
								value={searchTerm}
								type="text"
								className="form-control"
								placeholder="search"
								aria-label="Recipient's username"
								aria-describedby="button-addon2"
								onChange={(e) => handleSearchInputChange(e.target.value)}
							></input>
							{searchTerm && (
								<button className="btn btn-outline-info" type="button" id="button-addon2" onClick={handleEmptySearch}>
									<span className="material-symbols-outlined d-flex"> close </span>
								</button>
							)}
						</div>
					</div>
					<div style={{ maxWidth: 75 }} className="col-3 col-xl-2 dropdown-center">
						<button
							type="button"
							className="btn btn-info dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							data-bs-auto-close="outside"
							// data-bs-offset="10,20"
						>
							filter
						</button>
						<ul className="dropdown-menu">
							{types.map((type) => (
								<li>
									<div className="dropdown-item">
										<div className="form-check ">
											<input
												className="form-check-input bg-info"
												type="checkbox"
												checked={typeStates[type]}
												onChange={handleCheckBoxChange}
												value=""
												id={type}
											></input>
											<label className="form-check-label" htmlFor={type}>
												{type}
											</label>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div
					className={`row  ${
						variableInformations.length < 4 && width > 768 ? "justify-content-start m-auto" : "justify-content-evenly"
					}`}
				>
					{informationsLoading ? (
						<div className="text-center mt-5 pt-5 text-info">
							<div class="spinner-grow" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					) : filterLoading ? (
						<div className="text-center mt-5 pt-5 text-info">
							<div class="spinner-grow" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					) : !originalInformations.length ? (
						<p className="fw-bold text-center mt-5 pt-5">
							<span className="ms-2">No Educational resource or News has been published yet</span>
						</p>
					) : !variableInformations.length ? (
						<p className="fw-bold text-center mt-5 pt-5">
							<span class="material-symbols-outlined ">search_off</span>
							<span className="ms-2">No Match</span>
						</p>
					) : (
						variableInformations.map((info, index) => (
							<PostCard
								key={index}
								title={info.title}
								description={info.description}
								youtubeVideoUrl={info.youtubeVideoUrl}
								types={info.types}
								created_at={info.created_at}
								imageUrl={info.imagePath}
								width={width}
								index={index}
								maxNumber={variableInformations.length}
								id={info._id}
								setPostChanged={setPostChanged}
								postChanged={postChanged}
							/>
						))
					)}
				</div>
			</div>
			{/* ${
						variableInformations.length < 4 && width > 768 ? "justify-content-start m-auto" : "justify-content-evenly"
					}` */}
    </div>
  )
}

export default EducationAndNews
