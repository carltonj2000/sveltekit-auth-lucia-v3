import { lucia } from '$lib/db/auth';
import { deleteUsers } from '$lib/db/util';
import { redirect } from 'sveltekit-flash-message/server';
import { routes } from '../routes';

export const actions = {
	logout: async ({ cookies }) => {
		const session = cookies.get('auth_session');
		if (!session) return;
		await lucia.invalidateSession(session);
	},
	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		if (!email) {
			console.error('no email');
			return;
		}
		const session = cookies.get('auth_session');
		if (!session) return;
		await lucia.invalidateSession(session);
		await deleteUsers(email);
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
