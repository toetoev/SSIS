import { Button, Col, Form, Row } from "react-bootstrap";

import React from "react";

export default function MaintainDeptForm() {
	return (
		<div className="">
			<h3>Maintain Department</h3>
			<Form>
				<fieldset>
					<Form.Group as={Row}>
						<Form.Label as="legend" className="" column sm={2}>
							Collection Point :{" "}
						</Form.Label>

						<Col sm={10}>
							<Form.Check
								type="radio"
								label="Stationery Store - Administration Building (9:30 AM)"
								value="STORE"
								className=""
							/>
							<Form.Check
								type="radio"
								label="Management School (11:00 AM)"
								value="DEPARTMENT"
								className=""
							/>
							<Form.Check
								type="radio"
								label="Medical School (9:30 AM)"
								value="DEPARTMENT"
								className=""
							/>
							<Form.Check
								type="radio"
								label="Engineering School (9:30 AM)"
								value="DEPARTMENT"
								className=""
							/>
							<Form.Check
								type="radio"
								label="Science School (9:30 AM)"
								value="DEPARTMENT"
								className=""
							/>
							<Form.Check
								type="radio"
								label="University Hospital (11:00 AM)"
								value="DEPARTMENT"
								className=""
							/>
						</Col>
					</Form.Group>
				</fieldset>
				<Form.Group as={Row} controlId="nameOrEmail">
					<Form.Label className="" column sm={2}>
						New Representative Name :{" "}
					</Form.Label>
					<Col sm={10}>
						<Form.Control as="select">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group className="justify-content-center">
					<Col sm={1}>
						<Button type="button" className="btn btn-success floatRight">
							Update
						</Button>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
}
