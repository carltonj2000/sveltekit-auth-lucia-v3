<script>
	import Nav from './nav.svelte';
</script>

<div>
	<Nav />
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		margin-inline: auto;
	}
</style>
