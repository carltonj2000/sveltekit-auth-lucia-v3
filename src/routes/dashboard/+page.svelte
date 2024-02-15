<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
	const { form } = data;
</script>

<h2>Dashboard</h2>

<div>
	<h3>Hello {data.user.name}</h3>

	<form method="post" use:enhance action="?/logout">
		<button type="submit">Logout</button>
	</form>
</div>

<form method="post" use:enhance action="?/delete" class="lower">
	<label for="email">Email</label>
	<input type="email" name="email" value={data.user.email} />
	<button type="submit">Delete User</button>
</form>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	input {
		border: none;
	}
	.lower {
		margin-top: 2rem;
	}
	div {
		display: flex;
		gap: 2rem;
	}
</style>
