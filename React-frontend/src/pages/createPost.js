import React, { useEffect, useState } from "react"
import cbc from "../assets/photos/cbc.jpg"
// import useWindowDimensions from "../hooks/WindowsDimensionHook";
import { tests } from "../utils/testData.js"
import axiosInstance from "../utils/axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const CreatePost = ({ currentUser }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [tagStates, setTagStates] = useState({})
  const [tags, setTags] = useState([])
  // const { height, width } = useWindowDimensions();
  const [checkedTags, setCheckedTags] = useState([])

  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [errors, setErrors] = useState([])

  const [post, setPost] = useState({
    title: "",
    imagePath: "",
    image: "",
    category: "",
    description: "",
    youtubeVideoUrl: "",
    tags: "",
  })

  const createPost = async e => {
    setLoading(true)
    setErrors([])
    e.preventDefault()
    const data = new FormData()
    data.append("title", post.title)
    data.append("description", post.description)
    data.append("tags", JSON.stringify(checkedTags))
    data.append("image", post.image)
    data.append("youtubeVideoUrl", post.youtubeVideoUrl)

    const string = JSON.stringify(checkedTags)
    console.log(string)
    console.log(JSON.parse(string))

    try {
      console.log(data)
      const res = await axiosInstance.post("/posts", data)
      console.log(res)
      setLoading(false)
      navigate("/education_news")
    } catch (error) {
      console.log("error", error)
      console.log("error.response.data", error?.response.data)
      const axiosErrors = error?.response.data
      const localErrors = []
      axiosErrors.forEach(error =>
        localErrors.push(
          ` - ${
            error.title ||
            error.description ||
            error.image ||
            error.video ||
            error.url
          }`
        )
      )
      console.log("localErrors", localErrors)
      setErrors(localErrors)
      setLoading(false)
    }
  }

  // const initialpost = {
  //   name: "Complete Blood Count(CBC)",
  //   description:
  //     "A blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia. A complete blood count test measures several components and features of your blood, including: Red blood cells, which carry oxygen",
  //   image: cbc,
  //   tags: ["blood test", "screening test"],
  //   price: 50000,
  // }

  const capitalizeFirstLetterOfTagsInTest = () => {
    return tests.map(test => {
      const capitalisedTags = test.tags.map(tag => capitalizeFirstLetter(tag))
      test.tags = capitalisedTags
      return test
    })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    const originalTestsWithCapitalisedTags = capitalizeFirstLetterOfTagsInTest()
    let labTestTags = []
    originalTestsWithCapitalisedTags.forEach(test =>
      labTestTags.push(...test.type)
    )
    const setOflabTestTags = new Set(labTestTags)
    const theTags = Array.from(setOflabTestTags)
    // console.log("theTags", theTags);
    setTags(theTags)
    let localTagStates = {}
    theTags.forEach(tag => (localTagStates[tag] = false))
    setTagStates(localTagStates)
  }, [])

  const handleCheckBoxChange = e => {
    let localTagStates = tagStates
    localTagStates[e.target.id] = e.target.checked
    setTagStates(localTagStates)
    updateCheckedTags()
    console.log("tagStates", tagStates)
    console.log("tags", tags)
    forceUpdate()
  }

  console.log("A rerender")
  const updateCheckedTags = () => {
    const tagKeys = Object.keys(tagStates)
    const localCheckedTags = tagKeys.filter(
      tagKey => tagStates[tagKey] === true
    )
    console.log("checkedTags", localCheckedTags)
    setCheckedTags(localCheckedTags)
  }

  return (
    <div>
      <Navbar currentUser={currentUser} page={"create_post"} />
      {errors.length ? (
        <div
          class="alert alert-danger position-sticky"
          style={{ top: 70 }}
          role="alert"
        >
          {errors.map(error => (
            <div>{error}</div>
          ))}
        </div>
      ) : null}
      <h2 className="text-center mt-3">Create a Post</h2>
      <div className="mt-lg-3">
        <div className="row justify-content-center">
          <div className="py-2 px-4 pt-3 col-md-8 col-lg-5">
            <input
              onChange={e =>
                setPost(post => {
                  return { ...post, title: e.target.value }
                })
              }
              value={post.title}
              className="text-center d-lg-none h2 form-control form-control-lg d-block mb-3"
              type="text"
              placeholder="Enter Title"
            />
            <label
              style={{ height: 310 }}
              className="d-flex justify-content-center align-items-center d-block w-100 border  rounded-3"
              for="upload-photo"
            >
              {post.imagePath === "" ? (
                <>
                  <span class="d-flex material-symbols-outlined me-2 ">
                    add
                  </span>
                  Post image
                </>
              ) : (
                <img
                  style={{ height: 310, width: 482 }}
                  src={post.imagePath}
                  alt=""
                />
              )}
            </label>
            <input
              onChange={e => {
                const [file] = e.target.files
                setPost(post => {
                  return { ...post, image: file }
                })
                let reader = new FileReader()

                reader.onload = function (ev) {
                  console.log(ev.target.result)
                  setPost(post => {
                    return { ...post, imagePath: ev.target.result }
                  })
                }
                reader.readAsDataURL(file)
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
              onChange={e =>
                setPost(post => {
                  return { ...post, title: e.target.value }
                })
              }
              value={post.title}
              className="d-none mb-3 d-lg-block text-center h2 form-control form-control-lg d-block "
              type="text"
              placeholder="Enter Title"
            />

            <div class="input-group pb-3">
              <input
                onChange={e =>
                  setPost(post => {
                    return { ...post, youtubeVideoUrl: e.target.value }
                  })
                }
                type="text"
                class="form-control lead"
                placeholder="Enter Link to Youtube Video"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              {/* <span class="input-group-text lead" id="basic-addon2">
			frs CFA
			</span> */}
            </div>

            <textarea
              onChange={e =>
                setPost(post => {
                  return { ...post, description: e.target.value }
                })
              }
              placeholder="Enter description"
              class="form-control mb-3"
              id="exampleFormControlTextarea1 "
              rows="6"
            ></textarea>
            <div className="dropdown-center w-100 mb-3">
              <button
                type="button"
                className="btn btn-light border dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                // data-bs-offset="10,20"
              >
                Select Category
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
              onClick={createPost}
              className=" btn btn-info btn-lg  w-100"
            >
              {!loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <span class="material-symbols-outlined me-2">task_alt</span>
                  <span>Save</span>
                </div>
              ) : (
                <div
                  class="spinner-border spinner-border-sm text-secondary"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
