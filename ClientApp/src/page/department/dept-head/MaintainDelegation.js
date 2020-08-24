import { Button, DatePicker, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
import Error from "../../component/Error";
import Success from "../../component/Success";
import sorter from "../../../util/sorter";
import axios from "axios";
import moment from "moment";
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
	useEffect(() => { }, [loading]);

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<Row justify="space-between">
				<h3>Authority Delegation</h3>
				<Add dataSource={dataSource} handleDataChange={(data) => setDataSource(data)} />
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" loading={loading} />
		</Space>
	);
}

const Add = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const { RangePicker } = DatePicker;
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [delegatedTo, setDelegatedTo] = useState("");
	const [comment, setComment] = useState("");
	const [visible, setVisible] = useState(false);
	const [deptRepOptions, setDeptRepOptions] = useState([]);
	const dateFormat = "yyyy-MM-DD HH:mm:ss"

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};
	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};
	const onValuesChange = (val) => {
		if (val.startDate) setStartDate(moment(val.startDate).format(dateFormat));
		if (val.endDate) setEndDate(moment(val.endDate).format(dateFormat));
		if (val.delegatedTo) setDelegatedTo(val.delegatedTo);
		if (val.comment) setComment(val.comment);
	};

	const handleSubmit = () => {
		let data = [];
		data.push({
			startDate: startDate,
			endDate : endDate,
			delegatedToEmail : delegatedTo,
			comment: comment,
		})
		console.log(data.length);
		console.log(data);
		if (data.length > 0) {
			axios
				.post("https://localhost:5001/api/delegation", data, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					console.log(result);
					if (result.success) {
						handleDataChange([]);
						Success("Delegation Applied Successfully");
					} else {
						Error(result.message);
					}
				});
		} else {
			Error("Please fill the form correctly.");
		}
		setVisible(false);
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/deptStaff?roles=DEPTREP&roles=EMPLOYEE", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDeptRepOptions(
						result.data.reduce(
							(options, deptStaff) => [
								...options,
								{ label: deptStaff.name, value: deptStaff.email },
							],
							[]
						)
					);
					let currentDeptRep = result.data.filter((val) => val.role === "DEPTREP");
					if (currentDeptRep.length === 1) {
						setDelegatedTo(currentDeptRep[0].email);
						form.setFieldsValue({
							deptRep: currentDeptRep[0].email,
						});
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

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
					<Button key="submit" type="primary" onClick={handleSubmit} >
						Submit
					</Button>,
				]}
			>
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item label="Start Date" name="startDate">
						<DatePicker showTime 
							onChange={onChange}
							style={{ width: "100%" }}
							onChange={onChange}
							format={dateFormat} />
					</Form.Item>
					<Form.Item label="End Date" name="endDate">
						<DatePicker showTime 
							onChange={onChange}
							style={{ width: "100%" }}
							onChange={onChange} 
							format={dateFormat}/>
					</Form.Item>
					<Form.Item label="Delegated To" name="delegatedTo">
						<Select style={{ width: "100%" }} options={deptRepOptions} placeholder="Select employee to delegate"></Select>
					</Form.Item>
					<Form.Item label="Comment (Optional)" name="comment">
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
	const handleDelete = () => { };
	return (
		<Button type="danger" onClick={handleDelete}>
			Delete
		</Button>
	);
};
