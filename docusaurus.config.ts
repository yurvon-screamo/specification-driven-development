import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "Specification Driven Development",
	favicon: "img/favicon.ico",

	// Future flags, see https://docusaurus.io/methodology/api/docusaurus-config#future
	future: {
		v4: true, // Improve compatibility with the upcoming Docusaurus v4
	},

	// Set the production url of your site here
	url: "https://methodology.uwuwu.net",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "yurvon_screamo", // Usually your GitHub org/user name.
	projectName: "specification_driven_development", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Internationalization config
	i18n: {
		defaultLocale: "en",
		locales: ["en", "ru"],
		localeConfigs: {
			en: {
				htmlLang: "en-US",
				label: "English",
			},
			ru: {
				htmlLang: "ru-RU", 
				label: "Русский",
			},
		},
	},

	presets: [
		[
			"classic",
			{
				docs: {
					path: "./methodology",
					routeBasePath: "methodology",
					sidebarPath: "./sidebars.ts",
				},
				blog: false,
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "prompts",
				path: "./prompts",
				routeBasePath: "prompts",
				sidebarPath: "./sidebars-prompts.ts",
			},
		],
	],

	themeConfig: {
		image: "img/logo.png",
		navbar: {
			title: "Specification Driven Development",
			logo: {
				alt: "uwuwu Logo",
				src: "img/logo.png",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "docsSidebar",
					position: "left",
					label: "📋 Документация"
				},
				{
					type: "docSidebar",
					sidebarId: "promptsSidebar",
					position: "left",
					label: "🤖 Промпты",
					docsPluginId: "prompts",
				},
				{
					type: "localeDropdown",
					position: "right",
				},
				{
					href: "https://github.com/yurvon-screamo/specification-driven-development/",
					label: "🐙 GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Source",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/yurvon-screamo/specification-driven-development/",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} yurvon_screamo · ていねいに作りました.`,
		},
		prism: {
			theme: prismThemes.ultramin,
			darkTheme: prismThemes.dracula,
		},
		docs: {
			sidebar: {
			},
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
