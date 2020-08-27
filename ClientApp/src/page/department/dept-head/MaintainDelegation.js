import { Button, DatePicker, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Confirm from "../../component/Confirm";
import Error from "../../component/Error";
import Success from "../../component/Success";

const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;

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
			key: "action",
			render: (text) => (
				<Space>
					<Edit text={text} setLoading={setLoading} />
					<Delete text={text} setLoading={setLoading} />
				</Space>
			),
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/delegation", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, delegation) => {
							return [
								...rows,
								{
									key: delegation.id,
									startDate: delegation.startDate,
									endDate: delegation.endDate,
									delegatedTo: delegation.delegatedTo.name,
									comment: delegation.comment,
									action: delegation,
								},
							];
						}, [])
					);
				}
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, [loading]);

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<Row justify="space-between">
				<h3>Authority Delegation</h3>
				<Add setLoading={setLoading} />
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" loading={loading} />
		</Space>
	);
}

const Add = ({ setLoading }) => {
	const [dateRange, setDateRange] = useState([]);
	const [delegatedTo, setDelegatedTo] = useState("");
	const [comment, setComment] = useState("");
	const [visible, setVisible] = useState(false);
	const [deptRepOptions, setDeptRepOptions] = useState([]);

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setDateRange([]);
		setDelegatedTo("");
		setComment("");
		setDeptRepOptions([]);
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.dateRange) setDateRange(val.dateRange.map((val) => val.format(dateFormat)));
		if (val.delegatedTo) setDelegatedTo(val.delegatedTo);
		if (val.comment) setComment(val.comment);
	};

	const handleSubmit = () => {
		let data = {
			startDate: dateRange[0],
			endDate: dateRange[1],
			delegatedToEmail: delegatedTo,
			comment: comment,
		};

		axios
			.post(`https://localhost:5001/api/delegation`, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					Success("Delegation assigned successfully");
					setLoading(true);
				} else {
					Error(result.message);
				}
			});
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
				onCancel={hideModal}
				footer={[
					<Button key="cancel" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item label="Select Date" name="dateRange">
						<RangePicker style={{ width: "100%" }} format={dateFormat} />
					</Form.Item>
					<Form.Item label="Delegated To" name="delegatedTo">
						<Select
							style={{ width: "100%" }}
							options={deptRepOptions}
							placeholder="Select employee to delegate"
						></Select>
					</Form.Item>
					<Form.Item label="Comment (Optional)" name="comment">
						<Input type="text"></Input>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const Edit = ({ text, setLoading }) => {
	const delegation = text.action;
	const [form] = Form.useForm();

	const [dateRange, setDateRange] = useState([]);
	const [delegatedTo, setDelegatedTo] = useState("");
	const [visible, setVisible] = useState(false);
	const [deptRepOptions, setDeptRepOptions] = useState([]);

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.dateRange) setDateRange(val.dateRange.map((val) => val.format(dateFormat)));
		if (val.delegatedTo) setDelegatedTo(val.delegatedTo);
	};

	const handleSubmit = () => {
		let data = {
			startDate: dateRange[0],
			endDate: dateRange[1],
			delegatedToEmail: delegatedTo,
		};
		axios
			.put(`https://localhost:5001/api/delegation/${delegation.id}`, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setLoading(true);
					Success("Delegation updated successfully");
				} else {
					Error(result.message);
				}
			});
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

					setDelegatedTo(delegation.delegatedTo.email);
					form.setFieldsValue({
						delegatedTo: delegation.delegatedTo.name,
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Edit
			</Button>
			<Modal
				title="Delegation Options"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button key="cancel" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item label="Select Date" name="dateRange">
						<RangePicker
							style={{ width: "100%" }}
							format={dateFormat}
							defaultValue={[
								moment(delegation.startDate, dateFormat),
								moment(delegation.endDate, dateFormat),
							]}
						/>
					</Form.Item>
					<Form.Item label="Delegated To" name="delegatedTo">
						<Select style={{ width: "100%" }} options={deptRepOptions}></Select>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const Delete = ({ text, setLoading }) => {
	const delegation = text.action;
	const handleDelete = () => {
		Confirm("Are you sure about deleting this delegation?", "", () => {
			axios
				.delete(`https://localhost:5001/api/delegation/${delegation.id}`, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						setLoading(true);
					} else Error(result.message);
				});
		});
	};

	return (
		<Button type="danger" onClick={handleDelete}>
			Delete
		</Button>
	);
};
