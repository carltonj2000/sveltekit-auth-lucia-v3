# SvelteKit Auth With Lucia V3

## Code History

The code in this repository is base on the following:

- https://youtu.be/iouhcbeLe60?si=72__Cx7_j3t5eY2-
- [flash messages](https://youtu.be/hB6OkaYWS5I?si=aQn_gWg58TtICwBA)

## Creation History

```bash
npm create svelte@latest sveltekit-auth-lucia-v3
npm i
cd sveltekit-auth-lucia-v3/
git init && git add -A && git commit -m "Initial commit"
npm install lucia oslo
npm i @lucia-auth/adapter-drizzle
npm i drizzle-orm better-sqlite3
npm i -D @types/better-sqlite3
npm i -D drizzle-kit

npm run db:generate
npm run db:push

npm i -D sveltekit-superforms zod
npm i drizzle-zod
npm install --save @paralleldrive/cuid2
npm install bcrypt
npm i -D sveltekit-flash-message
npm i svelte-sonner

```
