import React, { useState } from "react"
import { baseURL } from "../utils/axios"
import UpdateStateModal from "./UpdateStateModal"
import store from "../redux/store"

const MyLabTestCard = ({
  id,
  name,
  image,
  price,
  state,
  bookedOn,
  doneOn,
  resultsOutOn,
}) => {
  const user = store.getState().auth.user
  console.log(state)
  const [resultsOutText, setResultsOutText] = useState("Results out")
  const [modal, setModal] = useState("")
  return (
    <div className="card mb-3 w-100 border-0">
      <div className="row g-0">
        <div className="col-4">
          <img src={baseURL + image} className="img-fluid " alt={name}></img>
        </div>
        <div className="col-8">
          <div className="card-body p-0 ps-3">
            <h6 className="card-title mb-0">{name}</h6>
            <div className=" mt-sm-1 mt-md-2 mt-lg-3  mt-xl-5">
              <small className="text-muted ">Booked on</small>{" "}
              <small>{new Date(bookedOn).toDateString()}</small>
            </div>
            {state !== "PENDING" && (
              <div className=" mt-sm-1 mt-md-2 mt-lg-3  mt-xl-5">
                <small className="text-muted ">Date when test was done</small>{" "}
                <small>{new Date(doneOn).toDateString()}</small>
              </div>
            )}
            {state === "RESULTS_OUT" && (
              <div className=" mt-sm-1 mt-md-2 mt-lg-3  mt-xl-5">
                <small className="text-muted ">
                  Date when result was available
                </small>{" "}
                <small>{new Date(resultsOutOn).toDateString()}</small>
              </div>
            )}
            <p className="card-text mt-md-1 mt-lg-3 mt-xl-4">
              {price ? (
                <div>
                  <small className="text-muted">{price}</small>
                  <small className="text-muted ms-3">frs CFA</small>
                </div>
              ) : (
                <small>free</small>
              )}
            </p>
            <div className="d-flex justify-content-between mt-sm-1 mt-md-2 mt-lg-3 mt-xl-5">
              {user.admin && (
                <button
                  onMouseEnter={() => setModal("")}
                  onClick={() =>
                    setModal(<UpdateStateModal id={id} state={state} />)
                  }
                  className="btn btn-sm bg-info"
                >
                  update
                  {modal}
                </button>
              )}

              {state == "PENDING" ? (
                <span className="badge bg-secondary rounded-pill d-flex align-items-center">
                  Not done
                </span>
              ) : state == "DONE" ? (
                <span className="badge bg-warning rounded-pill d-flex align-items-center">
                  Done
                </span>
              ) : (
                <span
                  onMouseEnter={() => setResultsOutText("View results")}
                  onMouseLeave={() => setResultsOutText("Results out")}
                  className="badge bg-success rounded-pill d-flex align-items-center results-out-badge"
                >
                  {resultsOutText}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-0" />
    </div>
  )
}

export default MyLabTestCard
