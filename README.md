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

This repository uses npm Trusted Publisher with GitHub Actions OIDC. Do not configure an `NPM_TOKEN` secret for publishing.

Before using the workflow, open the `highlightjs-dax` package settings on npmjs.com and configure a Trusted Publisher that matches:

- GitHub user or org: `jiaopengzi`
- Repository: `highlightjs-dax`
- Workflow filename: `publish.yaml`

If the workflow log shows `Signed provenance statement` and then fails with `E404`, GitHub Actions authentication is already working. In that case, the issue is usually that the package's Trusted Publisher binding or publishing access on npm does not match this repository/workflow.

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
