import React from "react";

import { Button, Form, Radio, Row, Col, Select  } from "antd";

export default function MaintainDeptForm() {
	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
	  };

	const { Option } = Select;

	return (
		<div className="col-lg-10 mt-3">
			<h4>Maintain Department</h4>
			<Form className="mt-4">
				<Row>
					<Col span={4}>
        				<Form.Item
						label="Collection Point :"
					  	>
						</Form.Item>
     				</Col>
					<Col span={8}>
						<Radio.Group>
							<Radio value={1}>
								Stationery Store - Administration Building (9:30 AM)
							</Radio>
							<Radio  value={2} style={radioStyle}>
								Management School (11:00 AM)
							</Radio>
							<Radio value={3} style={radioStyle}>
								Medical School (9:30 AM)
							</Radio>
							<Radio value={4} style={radioStyle}>
								Engineering School (9:30 AM)
							</Radio>
							<Radio value={5} style={radioStyle}>
								Science School (9:30 AM)
							</Radio>
							<Radio value={6} style={radioStyle}>
								University Hospital (11:00 AM)
							</Radio>
						</Radio.Group>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col span={4}>
        				<Form.Item
						label="New Representative Name :"
					  	>
						</Form.Item>
     				</Col>
					<Col span={8}>
						<Select
							style={{ width: '100%' }}
							defaultValue="martini"
						>
							<Option value="martini">Martini</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="tom">Tom</Option>
						</Select>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Button
							type="button"
							className="btn btn-success float-right"
						>
							Update
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
	
}
