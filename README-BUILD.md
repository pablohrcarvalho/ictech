# ic_tech — Build Notes

This presentation is a single-page React app served statically via GitHub Pages.

## Why there's a build step

Previously `index.html` loaded React **and** `@babel/standalone` from the unpkg CDN
and transpiled the JSX **in the browser at runtime**. That broke (blank page) on
2026-06-22 when unpkg auto-upgraded `@babel/standalone` to v8, which threw
`Cannot use import statement outside a module` and stopped the app from mounting.

The proper fix: **pre-compile the JSX** and **vendor React locally**. There is now
zero runtime dependency on any CDN.

## Layout

- `src/app.jsx`        — source (edit this)
- `build/app.js`       — compiled output (generated; `React.createElement` calls)
- `vendor/`            — pinned React 18.3.1 + ReactDOM UMD builds (served locally)
- `index.html`         — loads `vendor/*` then `build/app.js` (no in-browser Babel)
- `build.sh`           — recompiles `src/app.jsx` -> `build/app.js`
- `.build-tools/`      — local Babel toolchain (NOT served; gitignored)

## How to edit

1. Edit `src/app.jsx`.
2. Run `./build.sh`.
3. Commit `src/app.jsx` and `build/app.js` together.

## First-time setup (only if `.build-tools/node_modules` is missing)

```bash
cd .build-tools && npm install
```

`.build-tools` depends on `@babel/core`, `@babel/cli`, `@babel/preset-react` (v7).

## Updating React

Replace the files in `vendor/` with new pinned versions, e.g.:

```bash
curl -sSL -o vendor/react.production.min.js      https://unpkg.com/react@18.3.1/umd/react.production.min.js
curl -sSL -o vendor/react-dom.production.min.js  https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js
```

Always pin an exact version. Never use an unpinned `@latest` CDN URL again.
