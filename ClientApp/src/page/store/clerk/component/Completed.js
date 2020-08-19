import { Form, Table } from "antd";

import React from "react";
import { ReadyForDeliveryModal } from "./ReadyForDeliveryModal";
export const Completed = () => {
	const [form] = Form.useForm();

	const dataSource = [];

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
		},
		{
			title: "Collection Date",
			dataIndex: "collectionDate",
		},
		{
			title: "Disbursement List",
			dataIndex: "action",
			key: "action",
			render: () => <ReadyForDeliveryModal />,
		},
	];

	return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};
