import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Table from "react-bootstrap/Table";

export default function MaintainAuthDelegation() {
	return (
		<div className="">
			<h3>Authority Delegation</h3>
			<br />

			{Add()}
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Delegate</th>
						<th>Reason</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1 Aug 2020</td>
						<td>3 Aug 2020</td>
						<td>Martini Zhao</td>
						<td>Sick Leave</td>
						<td>
							{Edit()}
							{Delete()}
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

function Add() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				Add
			</Button>

			<DelegationModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}

function Edit() {
	return (
		<>
			<Button variant="primary">Edit</Button>
		</>
	);
}

function Delete() {
	return (
		<>
			<Button variant="primary">Delete</Button>
		</>
	);
}

function DelegationModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Delegation Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					<form>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Start Date:</Form.Label>
							<Form.Control type="date" style={{ width: "100%" }} />
							<Form.Label>End Date:</Form.Label>
							<Form.Control type="date" style={{ width: "100%" }} />
							<Form.Label>Delegate:</Form.Label>
							<Form.Control as="select">
								<option>Martini Zhao</option>
								<option>Meka Weka</option>
								<option>Win Zin</option>
								<option>Zana Mama</option>
								<option>ToeToeWoe</option>
							</Form.Control>
							<Form.Label>Reason:</Form.Label>
							<Form.Control as="textarea" rows="3">
								Specify the Delegation Reason
							</Form.Control>
						</Form.Group>
						<Button variant="outline-success">Save</Button>{" "}
						<Button variant="outline-danger">Clear</Button>{" "}
					</form>
				</div>
			</Modal.Body>
			{/* <Modal.Footer>
		  <Button onClick={props.onHide}>Close</Button>
		</Modal.Footer> */}
		</Modal>
	);
}
