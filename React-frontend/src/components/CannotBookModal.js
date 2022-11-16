import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button } from "react-bootstrap"
import axiosInstance, { baseURL } from "../utils/axios"
import { useNavigate } from "react-router-dom"

export default function CannotBookModal() {
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cannot book a test</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must sign in before you can book a test</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              window.location.href = "/login"
            }}
          >
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
