# Repository Guidelines

## Project Structure & Module Organization

This is a small Cloudflare Worker app for displaying UTC time. Source files live in `src/`: `src/worker.js` handles Worker requests and plain-text responses, while `src/index.html` contains the browser UI, styles, and client-side timer logic. Build output is generated into `dist/` and should not be edited by hand. Deployment and Worker metadata are in `wrangler.toml`; tool versions are declared in `mise.toml`.

## Build, Test, and Development Commands

Use pnpm for local workflows.

- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm run dev`: run `wrangler dev` for local Worker testing.
- `pnpm run build`: minify `src/index.html`, copy `src/worker.js`, and write `dist/`.
- `pnpm run deploy`: deploy from `dist/` with Wrangler.
- `pnpm run clean`: remove generated build output.

`wrangler.toml` also defines a build command for Cloudflare, currently `npm run build`; keep it compatible with the package scripts.

## Coding Style & Naming Conventions

Use modern JavaScript modules and keep the Worker entrypoint in `src/worker.js`. Match the existing style: two-space indentation in HTML/CSS blocks, semicolons in JavaScript, `const` by default, and `let` only for state that changes. Keep route names short and lowercase, such as `/iso`, `/rfc`, and `/unix`. Prefer small, explicit helpers over broad abstractions; this project’s behavior is intentionally minimal.

## Testing Guidelines

There is no automated test suite yet. Before submitting changes, run `pnpm run build` and manually verify key paths with `pnpm run dev`, including `/`, `/iso`, `/rfc`, `/unix`, an unknown path for `404`, and `robots.txt`. Check both browser HTML behavior and plain-text responses, for example `curl -H 'Accept: text/plain' http://localhost:8787/iso`.

## Commit & Pull Request Guidelines

Recent commits use short imperative summaries, for example `Fix about link display` and `Use mise for tooling`. Keep commits focused and describe the user-visible behavior or tooling change. This machine uses 1Password for GPG signing, so create commits with `git commit --no-gpg-sign -m "message"`.

Pull requests should include a concise description, the commands run, and notes for any manual browser or `curl` checks. Include screenshots only when UI presentation changes.

## Agent-Specific Instructions

When committing from this environment, always use `git commit --no-gpg-sign -m "message"` to avoid triggering the local 1Password signing agent.
