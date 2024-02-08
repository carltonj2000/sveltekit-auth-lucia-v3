import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

import sqlite from 'better-sqlite3';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const sqliteDB = sqlite(':memory:');
const db = drizzle(sqliteDB);

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export type UserInsertSchema = typeof userTable.$inferInsert;
export type UserSelectSchema = typeof userTable.$inferSelect;
