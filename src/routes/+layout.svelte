<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import type { PageData } from './$types';
	import Nav from './nav.svelte';
	export let data: PageData;

	const flash = getFlash(page);
	$: if ($flash) {
		toast.info($flash.message);
	}
</script>

<div>
	<Nav isLoggedIn={data.isLoggedIn} />
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
