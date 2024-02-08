import { dev } from '$app/environment';
import { Lucia } from 'lucia';
import { adapter } from './schema';

type DatabaseUserAttributes = {
	name: string;
	email: string;
};

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (databaseUserAttributes) => {
		return {
			name: databaseUserAttributes.name,
			email: databaseUserAttributes.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
