import { UserInsertSchemaZ } from '$lib/db/schema';
import { checkIfEmailExists, insertNewUser } from '$lib/db/util.js';
import { createId } from '@paralleldrive/cuid2';
import bcrypt from 'bcrypt';
import { redirect } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { routes } from '../routes';

export const actions = {
	register: async ({ request, cookies }) => {
		const form = await superValidate(request, UserInsertSchemaZ);
		if (!form.valid) return { form };
		const emailExists = await checkIfEmailExists(form.data.email);
		if (emailExists) {
			return setError(form, 'email', 'Email already registered');
		}
		const { password } = form.data;
		form.data.password = await bcrypt.hash(password, 10);
		form.data.id = createId();
		await insertNewUser(form.data);
		form.data.password = password;

		redirect(
			routes.login.href,
			{
				type: 'success',
				message: 'Confirm your email before logging in'
			},
			cookies
		);
	}
};

export const load = async () => {
	const from = await superValidate(UserInsertSchemaZ);
	return { from };
};
