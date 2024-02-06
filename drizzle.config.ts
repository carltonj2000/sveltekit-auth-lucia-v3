import type { Config } from 'drizzle-kit';

export default {
	schema: 'src/lib/dd/schema.ts',
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: 'localDB/sqlite.db'
	}
} satisfies Config;
