import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { db } from './server';

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
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

export const UserInsertSchemaZ = createInsertSchema(userTable, {
	name: (schema) =>
		schema.name
			.min(8, { message: 'The name has to be 8 characters or longer.' })
			.max(20, { message: 'The name has to be 20 characters or less' })
			.default('carlton2000'),
	email: (schema) =>
		schema.email
			.email()
			.min(6, { message: 'The email has to be 6 characters or longer.' })
			.max(40, { message: 'The email has to be 40 characters or less' })
			.default('a@b.com'),
	password: (schema) =>
		schema.password
			.min(8, { message: 'The password has to be 8 characters or longer.' })
			.max(20, { message: 'The password has to be 20 characters or less' })
			.default('password')
});

export const UserSelectSchemaZ = createSelectSchema(userTable);
