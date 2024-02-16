import { lucia } from '$lib/db/auth';
import { deleteUsers } from '$lib/db/util';
import { redirect } from 'sveltekit-flash-message/server';
import { routes } from '../routes';

export const actions = {
	logout: async ({ cookies, locals }) => {
		if (!locals.session?.id) return;
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(
			routes.login.href,
			{
				type: 'success',
				message: 'Logged Out'
			},
			cookies
		);
	},
	delete: async ({ cookies, locals, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		if (!email) {
			console.error('form has no email');
			return;
		}
		if (!locals.session?.id) return;
		await lucia.invalidateSession(locals.session.id);
		await deleteUsers(email);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(
			routes.home.href,
			{
				type: 'success',
				message: `Successfully deleted user with email: ${email}`
			},
			cookies
		);
	}
};

export const load = async ({ locals: { user }, cookies }) => {
	if (!user) {
		redirect(
			routes.login.href,
			{
				type: 'error',
				message: 'You must be logged in to view the dashboard'
			},
			cookies
		);
	}
	const { id, ...userNoId } = user;
	return { user: userNoId, form: { email: user.email } };
};
