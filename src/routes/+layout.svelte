<script lang="ts">
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import type { PageData } from './$types';
	import Nav from './nav.svelte';

	export let data: PageData;

	const flash = getFlash(page);
	$: if ($flash) {
		toast.info($flash.message);
		$flash = undefined;
	}
</script>

<div>
	<Toaster richColors closeButton position={'top-center'} />
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
