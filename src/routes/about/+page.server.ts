import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import * as nodemailer from 'nodemailer';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);
const transporter = nodemailer.createTransport({
	host: 'smtp.forwardemail.net',
	port: 465,
	secure: true,
	auth: {
		user: 'carlton@appsfortracking.com',
		pass: env.FORWARDEMAIL_PW
	}
});

export const actions = {
	redir: async () => {
		redirect(303, '/'); // found this does not work in a try catch
	},
	resend: async () => {
		console.log('sending');
		const { data, error } = await resend.emails.send({
			from: 'AppsForTracking <admin@appsfortracking.com>',
			to: ['carlton.joseph@gmail.com'],
			subject: 'Hello World',
			html: '<strong>It works!</strong>'
		});

		if (error) {
			return console.error({ error });
		}

		console.log({ data });
	},
	forwardemail: async () => {
		console.log('forwarding');
		const info = await transporter.sendMail({
			from: '"AppsForTracking" <carlton@appsfortracking.com>',
			to: 'carlton.joseph@gmail.com',
			subject: 'Howdy',
			html: '<p>Hello <b>world?</b></p>'
		});

		console.log('Message sent: %s', info.messageId);
	}
};
