import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: () => ({
				// use tool https://javisperez.github.io/tailwindcolorshades/
				brand: {
					50: '#edf7f6',
					100: '#e1f2ef',
					200: '#b6ded6',
					300: '#91c9bc',
					400: '#50a18a',
					500: '#23795c',
					600: '#1c6b4e',
					700: '#14593c',
					800: '#0c472c',
					900: '#07361d',
					950: '#032411',
					default: '#50a18a'
				}
			}),
			fontFamily: {
				sans: [...defaultTheme.fontFamily.sans, 'Inter']
			}
		}
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/container-queries')
	]
};
