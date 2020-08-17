import { Button, DatePicker, Form, Input, Modal, Row, Select, Space, Table, Col, InputNumber } from "antd";
import React, { useState } from "react";

export default function CreateSupplier() {
	const { TextArea } = Input;

	return (
		<>
			<h3>Create Supplier</h3>
			<br />

			<Form
				labelCol={{
					span: 8,
				}}
			>
				<Row gutter={24}>
					<Col span={8}>
						<Form.Item label="Supplier Name">
							<Input placeholder="Enter Supplier Name"/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item label="Phone Number">
							<Input placeholder="Enter Phone Number" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col
						span={8}
					>
						<Form.Item label="Contact Name">
							<Input placeholder="Enter Contact Name" />
						</Form.Item>
					</Col>
					<Col span={10}
					>
						<Form.Item label="GST Registration No">
							<Input placeholder="Enter GST No" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col
						span={8}
					>
						<Form.Item label="Fax No :">
							<Input placeholder="Enter Fax No" />
						</Form.Item>
					</Col>
					<Col
						span={10}
					>
						<Form.Item label="Address">
							<TextArea rows={4} placeholder="Enter address..." />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col
						span={18}
						style={{
							textAlign: 'right',
						}}
					>
						<Space>
							<Button type="danger">
								<a>Cancel</a>
							</Button>
							<Button type="primary">
								<a>Save</a>
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</>
	);
};
