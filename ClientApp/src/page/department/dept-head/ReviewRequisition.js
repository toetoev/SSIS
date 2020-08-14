import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Table from "react-bootstrap/Table";

export default function ReviewRequisition() {
	return (
		<div className="">
			<h3>Review Requisitions</h3>
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Requested By</th>
						<th>Requested Date</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Joseph Joestar</td>
						<td>21/06/20</td>
						<td>Applied</td>
						<td>{View()}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

function View() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				View
			</Button>

			<RequisitionModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}

function RequisitionModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Requisition Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					<p>Requested by: Joseph Joestar</p>
					<p>Requested date: 21/06/20</p>
					<p>Requested items: </p>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Item</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Hamon</td>
								<td>1,998</td>
							</tr>
						</tbody>
					</Table>
					<form>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Rejection reason (optional)</Form.Label>
							<Form.Control as="textarea" rows="3" />
						</Form.Group>
						<Button variant="outline-success">Approve</Button>{" "}
						<Button variant="outline-danger">Reject</Button>{" "}
					</form>
				</div>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Modal>
	);
}
