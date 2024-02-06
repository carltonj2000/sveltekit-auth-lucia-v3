<script lang="ts">
	const name = 'Carlton';
	const email = 'carlton.joseph@gmail.com';
</script>

<h2>Dashboard</h2>

<h3>Hello {name}</h3>

<form>
	<button type="submit">Logout</button>
</form>

<form class="lower">
	<button type="submit">Delete User</button>
	<label for="email">Email</label>
	<input type="email" name="email" id="email" value={email} disabled />
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
		margin-top: 3rem;
	}
</style>
