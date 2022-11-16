import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axiosInstance, { baseURL } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function ConfirmBookTest({ initiatePayment }) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
	};

	const confirm = () => {
		initiatePayment();
		setShow(false);
	};
	return (
		<>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Book Test</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to book this test</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						cancel
					</Button>
					<Button variant="info" onClick={confirm}>
						{!loading ? (
							<div className="d-flex justify-content-center align-items-center">
								<span class="material-symbols-outlined me-2">payments</span>
								<span>Book test</span>
							</div>
						) : (
							<div class="spinner-border spinner-border-sm text-secondary" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
