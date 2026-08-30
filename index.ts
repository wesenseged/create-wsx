#!/usr/bin/env

import * as p from "@clack/prompts";
import { execa } from "execa";
import { existsSync, rmSync } from "fs";

p.intro("🏖  create-wsx-app");

// Prompt: Project name
const projectName = await p.text({ message: "Project name:" });
if (p.isCancel(projectName)) process.exit(0);

// Prompt: Language
const language = await p.select({
	message: "Pick a language:",
	options: [
		{ value: "typescript", label: "TypeScript" },
		{ value: "javascript", label: "JavaScript" },
	],
});
if (p.isCancel(language)) process.exit(0);

// Dynamically determine framework options
const frameworkOptions =
	language === "typescript"
		? [
				{
					label: "Tailwind + shadcn/ui + Biome",
					value: "biome",
					hint: "recommended",
				},
				{ label: "Tailwind + shadcn/ui + ESLint", value: "eslint" },
				{ label: "Vite + ESLint only", value: "eslint-only" },
			]
		: [
				{ label: "Vite + ESLint only", value: "eslint-only" }, // Only for JS
			];

// Prompt: Framework
const framework = await p.select({
	message: "Choose your UI setup:",
	options: frameworkOptions,
});
if (p.isCancel(framework)) process.exit(0);

// Setup spinner
const spinner = p.spinner();
spinner.start("Setting up your project...");

// Git repo + temp dir for templates
const repo = "https://github.com/wesenseged/my-starter-templates";
const tmpDir = "my-starter-templates";

try {
	if (framework === "biome" || framework === "eslint") {
		if (!existsSync(tmpDir)) {
			await execa("git", ["clone", repo]);
		}

		const templatePath =
			framework === "biome"
				? "templates/tailwind-shadcn-biome"
				: "templates/tailwind-shadcn-eslint";

		await execa("cp", ["-r", `${tmpDir}/${templatePath}`, projectName]);
		rmSync(tmpDir, { recursive: true, force: true });
	} else if (framework === "eslint-only") {
		const viteTemplate = language === "typescript" ? "react-ts" : "react";
		await execa("pnpm", [
			"create",
			"vite",
			projectName,
			"--",
			"--template",
			viteTemplate,
		]);
	}

	spinner.stop("done!");
	p.note(
		`Next steps:
  cd ${projectName}
  pnpm install
  pnpm dev`,
		"🚀 Ready to go!",
	);
} catch (err) {
	spinner.stop("❌ Project setup failed.");
	console.error(err);
	process.exit(1);
}
