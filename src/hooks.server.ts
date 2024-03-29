import { lucia } from '$lib/db/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { routes } from './routes/routes';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	const loggedInRoute = Object.values(routes).reduce(
		(a, v) => (event.url.pathname === v.href ? a || v.loggedInD : a),
		false
	);
	if (session && !loggedInRoute) {
		redirect(303, routes.home.href);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
