const sgMail = require("@sendgrid/mail");

const sendgridAPI = "YOUR_SENDGRID_API";

sgMail.setApiKey(sendgridAPI);

sgMail
	.send({
		to: "dantespardaforce@gmail.com",
		from: "menaaziz27@gmail.com",
		subject: "Sending with SendGrid",
		text: "this is my content",
	})
	.then(() => {
		console.log("Email sent");
	})
	.catch((error) => {
		console.error(error);
	});
