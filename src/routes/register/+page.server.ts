import { lucia } from '$lib/db/auth';
import { UserInsertSchemaZ } from '$lib/db/schema';
import { checkIfEmailExists, insertNewUser } from '$lib/db/util.js';
import { createId } from '@paralleldrive/cuid2';
import bcrypt from 'bcrypt';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const actions = {
	register: async ({ request, cookies }) => {
		const form = await superValidate(request, UserInsertSchemaZ);
		if (!form.valid) return { form };
		try {
			const emailExists = await checkIfEmailExists(form.data.email);
			if (emailExists) {
				return setError(form, 'email', 'Email already registered');
			}
			const { password } = form.data;
			form.data.password = await bcrypt.hash(password, 10);
			form.data.id = createId();
			await insertNewUser(form.data);
			form.data.password = password;

			const session = await lucia.createSession(form.data.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			return { form };
		} catch (e) {
			console.error(e);
			return { form };
		}
		return { form };
	}
};

export const load = async () => {
	const from = await superValidate(UserInsertSchemaZ);
	return { from };
};
