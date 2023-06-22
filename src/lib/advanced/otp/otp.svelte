<script context="module" lang="ts">
	export const DIGIT_REGEX = new RegExp(/^\d+$/);

	export interface OtpCtxType {
		size: number;
		value: string;
		placeholder: string;
		disabled: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utilities/class.js';
	import { createEventDispatcher, setContext } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: string;
		complete: void;
	}>();

	export let size: number;
	export let value: string;
	export let disabled = false;
	export let placeholder = '0';

	let className: string | undefined | null = undefined;
	export { className as class };

	let valueItems: string[];
	$: {
		const valueArray = value.split('');
		const items: string[] = [];

		for (let i = 0; i < size; i++) {
			const char = valueArray[i];
			if (DIGIT_REGEX.test(char)) {
				items.push(char);
			} else {
				items.push('');
			}
		}
		valueItems = items;
		if (valueItems.every((item) => DIGIT_REGEX.test(item))) {
			dispatch('complete');
		}
	}

	const ctx: OtpCtxType = {
		size,
		value,
		disabled,
		placeholder
	};

	setContext<OtpCtxType>('ctx', ctx);
</script>

<div class={cn('flex flex-row gap-2 text-center', className)} {...$$restProps}>
	{#each valueItems as digit, index}
		<slot value={digit} {index} />
	{/each}
</div>
