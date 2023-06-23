<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { DIGIT_REGEX, isValueDigit, isValueNonEmptySpace, type OtpCtxType } from './otp.svelte';
	import { cn } from '$lib/utilities/class.js';

	const ctx = getContext<OtpCtxType>('ctx');

	const dispatch = createEventDispatcher<{
		change: string;
		complete: void;
	}>();

	export let inputValue: string | number = '';
	export let index: number = 0;

	let className: string | undefined | null = undefined;
	export { className as class };

	const handleInputChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const target = event.target as HTMLInputElement;
		let targetValue = target.value.trim();

		const isTargetValueValid = ctx.isNumberInput
			? isValueDigit(targetValue)
			: isValueNonEmptySpace(targetValue);

		if (!isTargetValueValid && targetValue !== '') {
			return;
		}

		const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

		// only delete digit if next input element has no value
		if (!isTargetValueValid && nextInputEl && nextInputEl.value !== '') {
			return;
		}

		targetValue = isTargetValueValid ? targetValue : ' ';
		const targetValueLength = targetValue.length;

		if (targetValueLength === 1) {
			const newValue = ctx.value.substring(0, index) + targetValue + ctx.value.substring(index + 1);
			if (!isTargetValueValid) return;
			focusToNextInput(target);

			dispatch('change', newValue);
		} else if (targetValueLength === ctx.size) {
			// allow for paste event
			dispatch('change', targetValue);
			target.blur();
		}
	};

	// allow delete with backspace
	const handleInputKeyDown = (e: KeyboardEvent) => {
		const { key } = e;
		const target = e.target as HTMLInputElement;

		if (key === 'ArrowRight' || key === 'ArrowDown') {
			e.preventDefault();
			return focusToNextInput(target);
		}

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			e.preventDefault();
			return focusToPrevInput(target);
		}

		const targetValue = target.value;

		// keep the selection range position
		// if the same digit was typed
		target.setSelectionRange(0, targetValue.length);

		if (e.key !== 'Backspace' || target.value !== '') {
			return;
		}
		focusToPrevInput(target);
	};

	const handleInputFocus = (e: FocusEvent) => {
		const target = e.target as HTMLInputElement;
		// // keep focusing back until previous input
		// // element has value
		// const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

		// if (prevInputEl && prevInputEl.value === '') {
		// 	return prevInputEl.focus();
		// }

		target.setSelectionRange(0, target.value.length);
	};

	const focusToNextInput = (target: HTMLElement) => {
		let nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

		if (nextElementSibling?.type !== 'input') {
			nextElementSibling = nextElementSibling?.nextElementSibling as HTMLInputElement | null;
		}

		if (nextElementSibling) {
			nextElementSibling.focus();
		}
	};

	const focusToPrevInput = (target: HTMLElement) => {
		let previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

		if (previousElementSibling?.type !== 'input') {
			previousElementSibling =
				previousElementSibling?.previousElementSibling as HTMLInputElement | null;
		}

		if (previousElementSibling) {
			previousElementSibling.focus();
		}
	};
</script>

<input
	value={inputValue}
	on:keydown={handleInputKeyDown}
	on:focus={handleInputFocus}
	on:input={handleInputChange}
	type="password"
	inputMode="numeric"
	autoComplete="one-time-code"
	class={cn(
		'bg-secondary text-primary focus:border-primary focus:ring-primary w-12 appearance-none rounded-md border border-primary/75 text-center text-2xl placeholder-primary/60 shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:text-primary/50',
		className
	)}
	{...$$restProps}
/>
