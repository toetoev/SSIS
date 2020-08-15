import { Button, DatePicker, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useState } from "react";

export default function MaintainDelegation() {
	const dataSource = [
		{
			key: "1",
			startDate: "17 August",
			endDate: "20 August",
			delegate: "Meka",
			comment: "Sick Leave",
			action: "Delete",
		},
	];
	const columns = [
		{
			title: "Start Date",
			dataIndex: "startDate",
			key: "startDate",
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			key: "endDate",
		},
		{
			title: "Delegate",
			dataIndex: "delegate",
			key: "delegate",
		},
		{
			title: "Comment",
			dataIndex: "comment",
			key: "comment",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Button type="primary">
						<a>Edit</a>
					</Button>
					<Button type="danger">
						<a>Delete</a>
					</Button>
				</Space>
			),
		},
	];
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Authority Delegation</h3>
			<Row justify="end">
				<Add />
			</Row>
			<Table columns={columns} dataSource={dataSource} />
		</Space>
	);
}

const Add = () => {
	const { TextArea } = Input;
	const { Option } = Select;
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = (e) => {
		setVisible(false);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};
	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};
	const handleChange = () => {
		console.log("handle change");
	};
	const handleSubmit = () => {};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Delegation Options"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form layout="vertical" onSubmit={handleSubmit}>
					<Form.Item label="Start Date">
						<DatePicker onChange={onChange} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item label="End Date">
						<DatePicker onChange={onChange} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item label="Delegate">
						<Select
							defaultValue="Martini Zhao"
							style={{ width: "100%" }}
							onChange={handleChange}
						>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="Yiminghe">Yiminghe</Option>
						</Select>
					</Form.Item>
					<Form.Item label="Comment">
						<TextArea rows={4}></TextArea>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
