import emailjs from "emailjs-com";
export default function email(to_email, to_name, message) {
	var template_params = {
		to_email: to_email,
		from_name: localStorage.getItem("NAME"),
		to_name: to_name,
		message_html: message,
	};
	emailjs.send("gmail", "template_MdV3Gypf", template_params, "user_O573D07mQCCs3DhWxEJyv");
}
