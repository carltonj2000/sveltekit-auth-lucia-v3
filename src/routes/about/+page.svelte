<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h2>About</h2>

<div>
	<h3>Just Testing A redirect here</h3>

	<form method="post" use:enhance action="?/redir">
		<button type="submit">Server Redirect</button>
	</form>
</div>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
