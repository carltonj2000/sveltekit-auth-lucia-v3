import { userTable, type UserInsertSchema } from '$lib/db/schema';
import { db } from '$lib/db/server';
import { eq } from 'drizzle-orm';

export const checkIfEmailExists = async (email: string) => {
	const queryResult = await db
		.select({ email: userTable.email })
		.from(userTable)
		.where(eq(userTable.email, email));
	return queryResult.length > 0;
};

export const insertNewUser = async (user: UserInsertSchema) => {
	return await db.insert(userTable).values(user);
};

export const getAllUsers = async () => {
	const queryResult = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			email: userTable.email
		})
		.from(userTable);
	return queryResult;
};

export const deleteAllUsers = async () => await db.delete(userTable);

export const deleteUsers = async (email: string) =>
	await db.delete(userTable).where(eq(userTable.email, email));

export const getUserName = async (userId: string) => {
	const result = await db
		.select({ name: userTable.name })
		.from(userTable)
		.where(eq(userTable.id, userId));
	return result[0]?.name;
};

export const getUser = async (email: string) => {
	const result = await db
		.select({
			name: userTable.name,
			password: userTable.password,
			id: userTable.id
		})
		.from(userTable)
		.where(eq(userTable.email, email));
	return result[0];
};
