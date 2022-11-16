import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button } from "react-bootstrap"
import axiosInstance, { baseURL } from "../utils/axios"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function UpdateStateModal({ id, state }) {
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [done, setDone] = useState(false)
  const [results, setResults] = useState(false)

  useEffect(() => {
    if (state === "DONE") {
      setDone(true)
    } else if (state === "RESULTS_OUT") {
      setDone(true)
      setResults(true)
    }
  }, [])

  const update = async () => {
    try {
      console.log(id)
      if (done && state !== "DONE") {
        const res = await axiosInstance.put(`/rendezvous/${id}`, {
          state: "DONE",
        })
        console.log(res)
      }
      if (results && state !== "RESULTS_OUT") {
        const resq = await axiosInstance.put(`/rendezvous/${id}`, {
          state: "RESULTS_OUT",
        })
        console.log(resq)
      }

      if (!done && !results) {
        const resq = await axiosInstance.put(`/rendezvous/${id}`, {
          state: "PENDING",
        })
        console.log(resq)
      }
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update State of booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This lab test has been:
          <Form.Check
            type="checkbox"
            // id={`default-${type}`}
            label="Booked"
            checked
            disabled
          />
          <Form.Check
            type="checkbox"
            // id={`default-${type}`}
            label="Done"
            value="DONE"
            checked={done}
            onChange={e => {
              setDone(e.target.checked)
            }}
          />
          {state !== "PENDING" && (
            <Form.Check
              type="checkbox"
              // id={`default-${type}`}
              label="Results Out"
              value="RESULTS_OUT"
              checked={results}
              onChange={e => {
                setResults(e.target.checked)
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="danger" onClick={update}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
