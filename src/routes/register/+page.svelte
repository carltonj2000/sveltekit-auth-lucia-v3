<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	export let data: PageData;
	const { form, errors, constraints, enhance, tainted } = superForm(data.from, {
		taintedMessage:
			'Do you want to leave the page as changes have been made by you.'
	});
</script>

<div>
	<h2>Register</h2>

	<form method="post" use:enhance action="?/register">
		<label for="name">Name</label>
		<input
			type="text"
			name="name"
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

		<label for="email">Email</label>
		<input
			type="email"
			name="email"
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

		<label for="password">Password</label>
		<input
			type="password"
			name="password"
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		<button type="submit">Register</button>
	</form>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		align-items: center;
	}
	h2 {
		border-bottom: 1px solid gray;
		width: min-content;
	}
	form {
		display: grid;
		grid-template-columns: 5rem 15rem;
		gap: 0.1rem;
	}
	form > *:nth-last-child(1) {
		grid-column: 1/-1;
	}
	label {
		text-align: end;
		margin-right: 0.5rem;
	}
	.invalid {
		grid-column: 1/-1;
		background-color: red;
		color: yellow;
		margin-bottom: 0.5rem;
		padding: 0.2rem 0.5rem;
		border-radius: 0.5rem;
	}
</style>
