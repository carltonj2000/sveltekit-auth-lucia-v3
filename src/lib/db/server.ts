import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: typeof __filename !== 'undefined'
			? path.dirname(__filename)
			: path.dirname(fileURLToPath(import.meta.url));

const dbLocation = path.join(dirname, '../../../localDB/sqlite.db');

const client = new Database(dbLocation);
export const db = drizzle(client);
