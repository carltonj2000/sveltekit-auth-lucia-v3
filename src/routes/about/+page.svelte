<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h2>About</h2>

<div>
	<h3>Just Testing A redirect here</h3>

	<form method="post" use:enhance action="?/redir">
		<button type="submit">Server Redirect</button>
	</form>

	<form method="post" use:enhance action="?/resend">
		<button type="submit">Send Email (via Resend)</button>
	</form>

	<form method="post" use:enhance action="?/forwardemail">
		<button type="submit">Send Email (via forwardemail)</button>
	</form>
</div>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
