import { redirect } from '@sveltejs/kit';

export const actions = {
	redir: async () => {
		redirect(303, '/'); // found this does not work in a try catch
	}
};
