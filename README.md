# create-wsx

A simple CLI tool to bootstrap React projects with options for Tailwind, shadcn/ui, Biome, ESLint, and more.

## Features

- Choose project type: TypeScript or JavaScript
- Select tooling preset: Biome + Tailwind + shadcn, ESLint + Tailwind + shadcn, or ESLint only
- Quickly scaffold your React project from templates or Vite

## Installation

You can install it globally with npm or pnpm:

```bash
npm install -g create-wsx
# or
pnpm add -g create-wsx
````

## Usage

Run the CLI anywhere to start creating a new project:

```bash
create-wsx
```

Follow the interactive prompts to select your options and generate your project.

## Scripts

* `dev` - Start development server (inside generated project)
* `build` - Build the project
* `format` - Format code using Biome or  Prettier
* `lint` - Lint code using Biome or Eslint
* `lint:fix` - Fix linting errors using Biome or Eslint + Prettier

## Contributing

Feel free to open issues or submit PRs to improve the CLI.

---

## License

MIT

