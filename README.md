# Dreamcatcher Docs

A React-based frontend for the `dreamcatcher-api` documentation portal.

This open source app is built with React, Vite, and TypeScript, and it is designed to serve as a polished docs UI for your API backend.

## What this project is

- React UI for the `dreamcatcher-api` docs experience
- Open source frontend for developers and contributors
- Simple, fast, and modern using Vite HMR
- Ready to extend with additional docs pages, API examples, and auth flows

## Theme

The app embraces a bold red styling to match a strong, memorable brand identity for the docs frontend.

## Technologies

- React 19
- TypeScript
- Vite
- React Router DOM
- ESLint

## Install

```bash
pnpm install
```

If you do not have `pnpm` installed yet:

```bash
npm install -g pnpm
```

## ▶️ Run locally

```bash
pnpm dev
```

Then open the URL shown in the terminal, typically `http://localhost:5173`.

## Build for production

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project scripts

- `pnpm dev` — start the development server
- `pnpm build` — build the app for production
- `pnpm preview` — preview the production build
- `pnpm lint` — run ESLint checks

## Recommended usage

This frontend is intended to sit alongside the `dreamcatcher-api` backend, serving API documentation, examples, and interactive guides.

You can customize the app by adding pages under `src/pages`, updating routes in `src/router/routes.tsx`, and styling components in `src/index.css`.

##  Contributing

Contributions are welcome! If you'd like to improve the docs UI, add new content, or enhance the branding, open a PR.