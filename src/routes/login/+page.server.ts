import { lucia } from '$lib/db/auth';
import { UserInsertSchemaZ } from '$lib/db/schema';
import { checkIfEmailExists, getUser } from '$lib/db/util.js';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { routes } from '../routes';
export const actions = {
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, UserInsertSchemaZ);
		if (!form.valid) return { form };
		try {
			const emailExists = await checkIfEmailExists(form.data.email);
			if (!emailExists) {
				return setError(form, 'email', 'Email not registered');
			}
			const user = await getUser(form.data.email);
			const passwordOk = await bcrypt.compare(
				form.data.password,
				user.password
			);
			if (!passwordOk) {
				return setError(form, 'password', 'Password incorrect');
			}
			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			throw redirect(307, routes.dashboard.href);
		} catch (e) {
			return { form };
		}
		return { form };
	}
};

export const load = async () => {
	const from = await superValidate(UserInsertSchemaZ);
	return { from };
};
