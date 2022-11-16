import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axiosInstance, { baseURL } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function DeletePostModal({ showModal, setShowModal, asyncDelete, postIdToDelete }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleClose = () => setShowModal(false);

	const deleteTest = async () => {
		setLoading(true);
		await asyncDelete();
	};
	return (
		<>
			<Modal show={showModal} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete this post</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						cancel
					</Button>
					<Button variant="danger" onClick={deleteTest}>
						{!loading ? (
							<span>Delete</span>
						) : (
							<div class="spinner-border spinner-border-sm text-danger" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
