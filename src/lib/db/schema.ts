import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
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

export const verificationTable = sqliteTable('verification', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	code: text('code').notNull(),
	email: text('email').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type UserInsertSchema = typeof userTable.$inferInsert;
export type UserSelectSchema = typeof userTable.$inferSelect;

export type VerificationInsertSchema = typeof verificationTable.$inferInsert;
export type VerificationSelectSchema = typeof verificationTable.$inferSelect;

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

export const VerificationInsertSchemaZ = createInsertSchema(verificationTable, {
	code: (schema) =>
		schema.code
			.length(8, { message: 'The code has to be exactly 8 characters.' })
			.default('12345678')
});
