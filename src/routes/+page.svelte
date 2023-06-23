<script lang="ts">
	import { Otp, OtpInput } from '$lib/index.js';
	import { Minus } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-8 p-12">
	<h1 class="text-3xl font-bold">Otp Input</h1>

	<Otp />

	<Otp value="428822" size={6} isNumberInput />

	<Otp isNumberInput>
		<svelte:fragment let:getOtpInputProps>
			<OtpInput {...getOtpInputProps()} placeholder="0" />
		</svelte:fragment>
	</Otp>

	<Otp value="abcd">
		<svelte:fragment let:getOtpInputProps>
			<OtpInput {...getOtpInputProps()} disabled />
		</svelte:fragment>
	</Otp>

	<Otp class="gap-0">
		<svelte:fragment let:getOtpInputProps>
			{@const props = getOtpInputProps()}
			<div class="flex flex-row items-center text-primary/50">
				<OtpInput {...props} placeholder="0" />
				{#if props.index < 3}
					<Minus class="mx-0.5" />
				{/if}
			</div>
		</svelte:fragment>
	</Otp>
</div>
