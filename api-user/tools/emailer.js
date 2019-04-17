import nodemailer from 'nodemailer';
import config from '../config';

// async..await is not allowed in global scope, must use a wrapper
export default async function (recipients, content) {
	const { subject, text, html } = content;
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	const testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: config.HOST,
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: config.USER_EMAIL, // generated ethereal user
			pass: config.USER_PASSWORD // generated ethereal password
		}
	});

	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <noreply@jjwmcgregor.com>', // sender address
		to: recipients, // list of receivers
		subject, // Subject line
		text, // plain text body
		html // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
