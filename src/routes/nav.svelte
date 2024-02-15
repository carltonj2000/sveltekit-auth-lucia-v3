<script lang="ts">
	import { page } from '$app/stores';
	import { routes } from './routes';
	export let isLoggedIn: boolean;
</script>

<div>
	<h1>Lucia Auth V3</h1>
	<nav>
		{#each Object.values(routes) as { href, name, loggedInD }}
			{#if isLoggedIn}
				{#if loggedInD}
					<a {href} class:active={$page.url.pathname === href}>{name}</a>
				{/if}
			{:else}
				<a {href} class:active={$page.url.pathname === href}>{name}</a>
			{/if}
		{/each}
	</nav>
</div>
<hr />

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	h1 {
		margin: 0;
		padding: 0;
	}
	nav {
		display: flex;
		gap: 0.5rem;
		justify-content: end;
	}
	a {
		-webkit-appearance: button;
		-moz-appearance: button;
		appearance: button;

		text-decoration: none;
		color: initial;
		border: 1px solid gray;
		border-radius: 2px;
		padding: 0.25rem 0.5rem;
		background: lightgray;
	}
	hr {
		border: 1px solid gray;
		width: 100%;
	}
	.active {
		background: lightcyan;
	}
</style>
