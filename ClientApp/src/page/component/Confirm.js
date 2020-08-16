import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
const Confirm = (title, content, onOk, onCancel) => {
	Modal.confirm({
		title: title,
		icon: <ExclamationCircleOutlined />,
		content: content,
		onOk: onOk,
		onCancel: onCancel,
	});
};
export default Confirm;
