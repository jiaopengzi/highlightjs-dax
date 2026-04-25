# highlightjs-dax

DAX (Data Analysis Expressions) language definition for [highlight.js](https://highlightjs.org/).

This package provides syntax highlighting for DAX.

## Installation

```bash
# npm
npm install highlightjs-dax

# pnpm
pnpm install highlightjs-dax
```

## Usage

### Register with highlight.js

```javascript
import hljs from "highlight.js"
import dax from "highlightjs-dax"

hljs.registerLanguage("dax", dax)
```

### Use the DAX Theme CSS

If you want the public theme asset exposed by this package, import the compiled CSS:

```javascript
import "highlightjs-dax/theme.css"
```

The current public theme entry is the compiled CSS file.

## Local Development

This project uses [Vite+](https://github.com/voidzero-dev/vite-plus) for development and building.

### Setup

```bash
vp install
```

### Development

Run the local demo page with the Vite dev server:

```bash
vp dev
```

### Watch Build

If you want to keep the package build running in watch mode, use the package script:

```bash
vp run dev
```

### Testing

Run the test suite:

```bash
vp test
```

### Check and Lint

Run type checks, linting, and formatting:

```bash
vp check
```

### Build

Create a publish-ready build. The current `vite.config.ts` packs ESM + CJS outputs, minifies the library bundle, and compiles the compressed CSS theme on success:

```bash
vp pack
```

### Publish from GitHub Actions

Do not need to create the package manually on npm first. The package page is created automatically on the first successful publish.

Before using the GitHub Actions workflow, configure the repository secret `NPM_TOKEN` in GitHub repository settings.

With GitHub Actions, the Git tag must exactly match `package.json.version`, and it must not include a `v` prefix.

For prerelease versions such as `1.0.0-beta1`, npm requires an explicit dist-tag.
This repository's workflow publishes prerelease versions with the `beta` tag, and stable versions with the default `latest` tag.

Examples:

```bash
# stable release
git tag 1.0.0
git push origin 1.0.0

# prerelease
git tag 1.0.0-beta1
git push origin 1.0.0-beta1
```

## License

MIT
