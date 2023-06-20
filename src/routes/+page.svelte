<script lang="ts">
	import { Otp, OtpInput } from "$lib/index.js";


</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<Otp value="" size={6} >
	<OtpInput />
</Otp>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.brand.50);
	}
</style>
