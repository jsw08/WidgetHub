import { addDynamicIconSelectors } from '@iconify/tailwind';
import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
	theme: {
		extend: {}
	},
	plugins: [daisyui, addDynamicIconSelectors()],
	daisyui: {
		themes: [
			"light",
			"dark",
			"aqua",
			"black",
			"business",
			"coffee",
			"dim",
			"dracula",
			"forest",
			"halloween",
			"luxury",
			"night",
			"sunset",
			"synthwave",
			"acid",
			"autumn",
			"bumblebee",
			"cmyk",
			"corporate",
			"cupcake",
			"cyberpunk",
			"emerald",
			"fantasy",
			"garden",
			"lemonade",
			"lofi",
			"nord",
			"pastel",
			"retro",
			"valentine",
			"winter",
			"wireframe",
		]
	}
};
