<script>
</script>

<div>
	<h2>Register</h2>

	<form>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" required />
		<label for="email">Email</label>
		<input type="email" name="email" id="email" required />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required />
		<button type="submit">Submit</button>
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
</style>
