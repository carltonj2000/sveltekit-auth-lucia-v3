import { dev } from '$app/environment';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { sessionTable, userTable } from './schema';
import { db } from './server';

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

type DatabaseUserAttributes = {
	name: string;
	email: string;
	verified: number;
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
			email: databaseUserAttributes.email,
			verified: databaseUserAttributes.verified
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
