# Contributing guide

## Prerequisites

This repository is a [pnpm](https://pnpm.io/) workspace driven by [turbo](https://turborepo.com/).
Node.js is pinned in `.node-version`.

```sh
corepack enable
pnpm install
```

## Everyday commands

```sh
pnpm verify      # lint, build, and typecheck — what CI runs
pnpm build       # compile every extension
pnpm typecheck   # type-check without emitting
pnpm lint:fix    # apply biome fixes
```

## Running the extension tests

`vscode-just-web` has integration tests that download VS Code and run it. They need a display, so
they are not part of `pnpm verify` and do not run in CI:

```sh
pnpm --filter vscode-just-web test
```

On Linux without a desktop session, wrap the command in `xvfb-run`.

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/); a husky
`commit-msg` hook runs commitlint. Neither extension is published, so no changeset is needed.
