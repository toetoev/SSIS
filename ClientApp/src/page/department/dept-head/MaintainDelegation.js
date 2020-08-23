import { Button, DatePicker, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

export default function MaintainDelegation() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const columns = [
		{
			title: "Start Date",
			dataIndex: "startDate",
		},
		{
			title: "End Date",
			dataIndex: "endDate",
		},
		{
			title: "Delegated To",
			dataIndex: "delegatedTo",
		},
		{
			title: "Comment",
			dataIndex: "comment",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text) => (
				<Space>
					<Edit text={text} />
					<Delete text={text} />
				</Space>
			),
		},
	];
	// TODO: get all delegation
	useEffect(() => {}, [loading]);
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<Row justify="space-between">
				<h3>Authority Delegation</h3>
				<Add />
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" loading={loading} />
		</Space>
	);
}

const Add = () => {
	// TODO: get deptStaff by role set to select ( /?roles=EMPLOYEE)
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [delegatedTo, setDelegatedTo] = useState("");
	const [comment, setComment] = useState("");
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleSubmit = (e) => {
		// TODO: create delegation
		setVisible(false);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};
	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};
	const onValuesChange = (val) => {
		if (val.startDate) setStartDate(val.startDate);
		if (val.endDate) setEndDate(val.endDate);
		if (val.delegatedTo) setDelegatedTo(val.delegatedTo);
		if (val.comment) setComment(val.comment);
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Delegation Options"
				visible={visible}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item label="Start Date" name="startDate">
						<DatePicker onChange={onChange} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item label="End Date" name="endDate">
						<DatePicker onChange={onChange} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item label="Delegated To" name="delegatedTo">
						<Select style={{ width: "100%" }}></Select>
					</Form.Item>
					<Form.Item label="Comment" name="comment">
						<Input type="text"></Input>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

// TODO: edit modal, put initial value to modal, then call updateDelegation
const Edit = ({ text }) => {
	return <Button type="primary">Edit</Button>;
};

const Delete = ({ text }) => {
	// TODO: delete delegation
	const handleDelete = () => {};
	return (
		<Button type="danger" onClick={handleDelete}>
			Delete
		</Button>
	);
};
