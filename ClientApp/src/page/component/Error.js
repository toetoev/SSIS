import { Modal } from "antd";
const Error = (title, content) => {
	Modal.error({
		title: title,
		content: content,
	});
};
export default Error;
