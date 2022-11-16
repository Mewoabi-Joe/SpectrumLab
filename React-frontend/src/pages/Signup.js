import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useWindowDimensions from "../hooks/WindowsDimensionHook"
import axiosInstance from "../utils/axios"
import logo from "../assets/photos/spectrumLabCroppedLogo.jpeg"
import Navbar from "../components/Navbar"

const Signup = ({ currentUser }) => {
  const [loading, setLoading] = useState(false)

  const { height, width } = useWindowDimensions()

  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vPassword: "",
    phoneNo: "",
    dateOfBirth: "",
  })

  const [error, setError] = useState({
    email: "",
    password: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUser(user => {
      return { ...user, [name]: value }
    })
  }

  const register = async e => {
    e.preventDefault()
    setError({})
    if (user.password != user.vPassword) {
      setError(error => {
        return { ...error, password: "Passwords don't match" }
      })
      return
    }

    const { vPassword, ...rest } = user
    try {
      const res = await axiosInstance.post("/auth/register", rest)
      navigate("/login")
    } catch (error) {
      console.log(error.response)
      const errors = error.response.data
      let errorObj = {}
      errors.map(err => {
        errorObj = {
          ...errorObj,
          ...err,
        }
      })
      console.log(errorObj)
      setError(errorObj)
    }
  }

  return (
    <>
      <Navbar currentUser={currentUser} page={"signup"} />
      <div class="container-lg">
        <h3 class="text-center my-2">Sign up to Spectrum lab</h3>
        <small className="text-center d-block ">
          New to Spectrum lab with no account? Go ahead fill in the info and
          signup
        </small>

        <div class="row justify-content-center mt-2 mb-3 g-0 ">
          <div className="d-none d-xl-block col">
            <img
              className="img-fluid h-100"
              style={{ borderRadius: width >= 1200 && "20px 0px 0px 20px" }}
              src={logo}
              alt="logo"
            />
          </div>
          <form
            class="col-11 col-sm-9 col-md-8 col-lg-6 col-xl-5 border border-info px-5 py-4 "
            style={{
              borderRadius:
                width >= 1200 ? "0px 20px 20px 0px" : "20px 20px 20px 20px",
            }}
          >
            <div class="mb-1">
              <label for="first_name" class="form-label">
                First name:
              </label>
              <input
                onChange={handleChange}
                name="firstName"
                type="text"
                class="form-control"
                id="first_name"
                value={user.firstName}
                required={true}
              />
              <div class="text-danger firstname">
                {error.firstName ? error.firstName : ""}
              </div>
            </div>
            <div class="mb-1">
              <label for="last_name" class="form-label">
                Last name:
              </label>
              <input
                onChange={handleChange}
                name="lastName"
                value={user.lastName}
                type="text"
                class="form-control"
                id="last_name"
              />
              <div class="text-danger last_name">
                {error.lastName ? error.lastName : ""}
              </div>
            </div>
            <div class="mb-1">
              <label for="email" class="form-label">
                Email address:
              </label>
              <input
                onChange={handleChange}
                name="email"
                value={user.email}
                type="email"
                class="form-control"
                id="email"
                required={true}
              />
              <div class="text-danger email">
                {error.email ? error.email : ""}
              </div>
            </div>
            <div class="mb-1">
              <label for="number" class="form-label">
                Phone number:
              </label>
              <input
                onChange={handleChange}
                name="phoneNo"
                type="number"
                value={user.phoneNo}
                class="form-control"
                id="number"
                required={true}
              />
              <div class="text-danger number">
                {error.phoneNo ? error.phoneNo : ""}
              </div>
            </div>

            <div class="mb-1">
              <label for="password" class="form-label">
                Password:
              </label>
              <div
                style={{
                  position: "relative",
                }}
                className="password-container"
              >
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={user.password}
                  class="form-control"
                  id="password"
                  required
                />
                <i
                  style={{
                    position: "absolute",
                    top: "28%",
                    right: "4%",
                  }}
                  onClick={e => {
                    e.target.classList.toggle("fa-eye-slash")
                    const passwordField = document.querySelector("#password")
                    const type =
                      passwordField.getAttribute("type") === "password"
                        ? "text"
                        : "password"
                    passwordField.setAttribute("type", type)
                  }}
                  class="fa-solid fa-eye"
                  id="eye"
                ></i>
              </div>
              <div class="text-danger password">
                {error.password ? error.password : ""}
              </div>
            </div>

            <div class="mb-1">
              <label for="vPassword" class="form-label">
                Enter password again:
              </label>

              <div
                style={{
                  position: "relative",
                }}
                className="password-container"
              >
                <input
                  onChange={handleChange}
                  name="vPassword"
                  value={user.vPassword}
                  type="password"
                  class="form-control"
                  id="vPassword"
                  required={true}
                />
                <i
                  style={{
                    position: "absolute",
                    top: "28%",
                    right: "4%",
                  }}
                  onClick={e => {
                    e.target.classList.toggle("fa-eye-slash")
                    const passwordField = document.querySelector("#vPassword")
                    const type =
                      passwordField.getAttribute("type") === "password"
                        ? "text"
                        : "password"
                    passwordField.setAttribute("type", type)
                  }}
                  class="fa-solid fa-eye"
                  id="eye"
                ></i>
              </div>
              <div class="text-danger vPassword">
                {error.vPassword ? error.vPassword : ""}
              </div>
            </div>

            <div class="mb-1">
              <label for="vPassword" class="form-label">
                Date of birth:
              </label>
              <input
                onChange={handleChange}
                name="dateOfBirth"
                type="date"
                class="form-control"
                required={true}
              />
              <div class="text-danger vPassword">
                {error.dateOfBirth ? error.dateOfBirth : ""}
              </div>
            </div>
            <br />

            {/* <div class="mb-1">
            <input name="radio" type="radio" id=""></input>
            remember me
          </div> */}

            <div class="text-center">
              <button
                onClick={register}
                class="btn btn-info"
                style={{ width: "100%", borderRadius: 10 }}
              >
                {!loading ? (
                  "Sign Up"
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
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
