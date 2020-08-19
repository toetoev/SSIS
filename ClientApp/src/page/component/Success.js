import { Modal } from "antd";
const Success = (msg, onOk) => {
	Modal.success({
		content: msg,
		onOk: onOk,
	});
};
export default Success;
