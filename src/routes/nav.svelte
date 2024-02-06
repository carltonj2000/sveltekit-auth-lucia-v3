<script>
	import { page } from '$app/stores';

	const links = [
		{ href: '/', name: 'Home' },
		{ href: '/dashboard', name: 'Dashboard' },
		{ href: '/login', name: 'Login' },
		{ href: '/register', name: 'Register' }
	];
</script>

<div>
	<h1>Lucia Auth V3</h1>
	<nav>
		{#each links as { href, name }}
			<a {href} class:active={$page.url.pathname === href}>{name}</a>
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
