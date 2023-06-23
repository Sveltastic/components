<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export const DIGIT_REGEX = new RegExp(/^\d+$/);
	export const isValueDigit = (value: string) => DIGIT_REGEX.test(value);
	export const isValueNonEmptySpace = (value: string) => value !== ' ' && value?.length > 0;

	export interface OtpCtxType {
		size: number;
		value: string;
		isNumberInput: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utilities/class.js';
	import { createEventDispatcher, setContext } from 'svelte';
	import OtpInput from './otp-input.svelte';

	const dispatch = createEventDispatcher<{
		change: string;
		complete: void;
	}>();

	/** Initial Value */
	export let value = '';
	/** Number of inputs to be rendered */
	export let size = 4;

	export let inputType: Pick<HTMLInputAttributes, 'type'>;
	export let inputMode: Pick<HTMLInputAttributes, 'inputmode'>;

	export let isNumberInput = false;

	let className: string | undefined | null = undefined;
	export { className as class };

	let valueItems: string[];
	$: {
		const valueArray = value.split('');
		const items: string[] = [];

		for (let i = 0; i < size; i++) {
			const char = valueArray[i];
			if (isNumberInput) {
				if (DIGIT_REGEX.test(char)) {
					items.push(char);
				} else {
					items.push('');
				}
			} else {
				items.push(char);
			}
		}
		valueItems = items;
		if (
			valueItems.every((item) => (isNumberInput ? isValueDigit(item) : isValueNonEmptySpace(item)))
		) {
			dispatch('complete');
		}
	}

	const ctx: OtpCtxType = {
		size,
		value,
		isNumberInput
	};

	setContext<OtpCtxType>('ctx', ctx);
</script>

<div class={cn('flex flex-row gap-2 text-center', className)} {...$$restProps}>
	{#each valueItems as inputValue, index}
		<slot
			getOtpInputProps={() => ({
				inputValue,
				index
			})}
		>
			<OtpInput {inputValue} {index} />
		</slot>
	{/each}
</div>
