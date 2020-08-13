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
		<div className="col-lg-10 mt-3">
			<h4>Maintain Department</h4>
			<Form className="mt-4">
				<Form.Group as={Row} sm={12}>
					<Form.Label as="legend" className="" column sm={3}>
						Collection Point :
					</Form.Label>
					<Col sm={8}>
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
>>>>>>> Stashed changes
				<Form.Group as={Row} controlId="nameOrEmail">
					<Form.Label className="" column sm={3}>
						New Representative Name :
					</Form.Label>
					<Col sm={4}>
						<Form.Control as="select">
							<option>Martini</option>
							<option>2</option>
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group className="justify-content-center">
					<Col sm={1}>
						<Button type="button" className="btn btn-success floatRight">
=======
					<Col sm={7}>
						<Button
							type="button"
							className="btn btn-success float-right"
						>
							Update
						</Button>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
}
