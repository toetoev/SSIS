import { Button, DatePicker, Form, Input, Modal, Row, Select, Space, Table, Col, InputNumber } from "antd";
import React, { useState } from "react";

export default function CreateStationery() {
	const { TextArea } = Input;

	return (
		<>
			<h3>Create Stationery</h3>
			<br />

			<Form
				labelCol={{
					span: 8,
				}}
			>
				<Row gutter={24}>
					<Col span={8}>
						<Form.Item label="Category">
							<Select placeholder="Select Category">
								<Select.Option value="demo">Demo</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Bin">
							<Input placeholder="Enter Bin" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col
						span={8}
					>
						<Form.Item label="Unit Of Measure">
							<Input placeholder="Enter Unit of Measure" />
						</Form.Item>
					</Col>
					<Col
						span={8}
					>
						<Form.Item label="Reorder Level">
							<Input placeholder="Enter Reorder Level" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col
						span={8}
					>
						<Form.Item label="Supplier 1 : ">
							<Select placeholder="Select Supplier 1">
								<Select.Option value="demo">Demo</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="Tender Price">
							<InputNumber placeholder="0" />
						</Form.Item>
					</Col>
					<Col
						span={8}
					>
						<Form.Item label="Reorder Quantity">
							<Input placeholder="Enter Reorder Quantity" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col
						span={8}
					>
						<Form.Item label="Supplier 2 : ">
							<Select placeholder="Select Supplier 2">
								<Select.Option value="demo">Demo</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="Tender Price">
							<InputNumber placeholder="0" />
						</Form.Item>
					</Col>
					<Col
						span={8}
					>
						<Form.Item label="Description">
							<TextArea rows={4} placeholder="Enter description..."/>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col
						span={8}
					>
						<Form.Item label="Supplier 3 : ">
							<Select placeholder="Select Supplier 3">
								<Select.Option value="demo">Demo</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="Tender Price">
							<InputNumber placeholder="0" />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col
						span={16}
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
