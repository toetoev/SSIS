import { message } from "antd";
const Error = (content) => {
	message.error({
		content: content,
	});
};
export default Error;
