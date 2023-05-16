/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			height: {
				"9/10": "90%",
			},
			colors: {
				background: "#F5F5F5",
				primary: "#14262E",
				gold: "#C2AA77",
			},
			animatedSettings: {
				animatedSpeed: 1000,
				classes: ["fadeIn", "fadeOut"],
			},
			fontFamily: {
				Laila: ["Laila"],
				Libre: ["Libre Baskerville"],
				Lustria: ["Lustria"],
			},
			screens: {
				xs: "320px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
		},
	},
	plugins: [require("tailwindcss-animatecss")],
};
