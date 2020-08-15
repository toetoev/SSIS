import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";

import React from "react";

const { TextArea } = Input;

const { Option } = Select;

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};

const dataSource = [
	{
		key: "1",
		startDate: "17 August",
		endDate: "20 August",
		delegate: "Meka",
		reason: "Sick Leave",
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
		title: "Reason",
		dataIndex: "reason",
		key: "reason",
	},
	{
		title: "Action",
		dataIndex: "action",
		key: "action",
		render: () => (
			<span>
				<Button type="primary">
					<a>Edit</a>
				</Button>
				<span className="ant-divider" />
				<Button type="danger">
					<a>Delete</a>
				</Button>
			</span>
		),
	},
];

export default function MaintainDelegation() {
	return (
		<div className="">
			<h3>Authority Delegation</h3>
			<br />
			<Add />
			<Table columns={columns} dataSource={dataSource} />
		</div>
	);
}

class Add extends React.Component {
	state = { visible: false };
	showModal = () => {
		this.setState({
			visible: true,
		});
	};
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	render() {
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>
					Add
				</Button>

				<Modal
					title="Delegation Options"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Form {...layout} onSubmit={this.handleSubmit}>
						<Form.Item label="Start Date">
							<DatePicker onChange={onChange} />
						</Form.Item>
						<Form.Item label="End Date">
							<DatePicker onChange={onChange} />
						</Form.Item>
						<Form.Item label="Delegate">
							<Select
								defaultValue="Martini Zhao"
								style={{ width: 120 }}
								onChange={handleChange}
							>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yiminghe">Yiminghe</Option>
							</Select>
						</Form.Item>
						<Form.Item label="Reason">
							<TextArea rows={4}></TextArea>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}

function onChange(date, dateString) {
	console.log(date, dateString);
}

function handleChange(value) {
	console.log(`selected ${value}`);
}
