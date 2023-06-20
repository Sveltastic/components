import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: () => ({
				// use tool https://javisperez.github.io/tailwindcolorshades/
				brand: {
					50: '#fef8fb',
					100: '#fef1f7',
					200: '#fcdceb',
					300: '#fac7df',
					400: '#f69cc6',
					500: '#f272ae',
					600: '#da679d',
					700: '#b65683',
					800: '#914468',
					900: '#773855',
					default: '#00d395'
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
