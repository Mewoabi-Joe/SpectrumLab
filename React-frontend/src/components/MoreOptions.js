import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DeleteTestModal from "./DeleteTestModal"
import { connect } from "react-redux"
import ConfirmBookTest from "./ConfirmBookTest"
import store from "../redux/store"
import CannotBookModal from "./CannotBookModal"
import axiosInstance from "../utils/axios"

const MoreOptions = ({ testId, handleViewDetails, currentUser, price }) => {
  const [modal, setModal] = useState("")
  const navigate = useNavigate()

  const admin = currentUser ? currentUser.admin : null

  const [confirmModal, setConfirmModal] = useState("")
  const [cannotBookModal, setCannotBookModal] = useState("")

  const user = store.getState().auth.user

  const initiatePayment = async () => {
    if (!user) {
      return setCannotBookModal(<CannotBookModal />)
    }
    const body = {
      userId: user.userId,
      amount: price,
      externalId: testId,
      email: user.email,
      redirectUrl: `https://frontend-clinic.herokuapp.com/my_lab_tests/${user.userId}`,
    }

    console.log(body)
    try {
      const res = await axiosInstance.post(`/payment/initiate_pay`, body)
      window.location.href = res.data.link
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {modal}
      {confirmModal}
      {cannotBookModal}
      <div className="dropdown">
        <button
          onClick={() => setModal("")}
          className="btn btn-outline-info rounded-circle caret-off pt-2 border-0"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            className="material-symbols-outlined fs-5"
            style={{ color: "black" }}
          >
            more_vert
          </span>
        </button>
        <ul className="dropdown-menu">
          <li onClick={handleViewDetails}>
            <div className="dropdown-item d-flex">
              <span class="material-symbols-outlined  me-2">visibility</span>
              <span>view details</span>
            </div>
          </li>
          {/* <li>
            <a className="dropdown-item d-flex" href="#a">
              <span class="material-symbols-outlined me-2">payments</span>
              Book test
            </a>
          </li> */}
          {admin ? (
            <>
              <li onClick={() => navigate("/edit_test/" + testId)}>
                <div
                  className="dropdown-item d-flex"
                  href={"/edit_test/" + testId}
                >
                  <span class="material-symbols-outlined me-2">edit</span>
                  Edit test
                </div>
              </li>

              <li
                onClick={() => {
                  console.log("delete")
                  console.log(modal)
                  setModal(<DeleteTestModal testId={testId} />)
                }}
              >
                <a className="dropdown-item d-flex">
                  <span class="material-symbols-outlined me-2">
                    delete_forever
                  </span>
                  Delete test
                </a>
              </li>
            </>
          ) : (
            <li
              onMouseEnter={() => {
                setConfirmModal("")
                setCannotBookModal("")
              }}
              onClick={() => {
                setConfirmModal(
                  <ConfirmBookTest initiatePayment={initiatePayment} />
                )
              }}
            >
              <div className="dropdown-item d-flex">
                <span class="material-symbols-outlined me-2">payments</span>
                <span>Book test</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.user,
  }
}

export default connect(mapStateToProps)(MoreOptions)
