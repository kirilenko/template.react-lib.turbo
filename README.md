# template.react-lib.turbo

[![CI](https://github.com/kirilenko/template.react-lib.turbo/actions/workflows/ci.yml/badge.svg)](https://github.com/kirilenko/template.react-lib.turbo/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/template-react-lib-turbo)](https://www.npmjs.com/package/template-react-lib-turbo)

Turborepo + pnpm monorepo template for building and publishing a React component library to npm.

## What's inside

| Package / App     | Description                                         |
| ----------------- | --------------------------------------------------- |
| `packages/lib`    | React component library, built with tsup            |
| `apps/playground` | Vite app for developing and testing components live |
| `apps/storybook`  | Storybook 8 for component docs and visual testing   |

## Stack

| Tool                                                                                 | Purpose                                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------- |
| [Turborepo](https://turbo.build)                                                     | Task orchestration and caching                |
| [pnpm workspaces](https://pnpm.io/workspaces)                                        | Package manager                               |
| [tsup](https://tsup.egoist.dev)                                                      | Library bundler — CJS, ESM and `.d.ts` output |
| [Vite](https://vite.dev)                                                             | Dev server for playground and Storybook       |
| [Vitest](https://vitest.dev) + [@testing-library/react](https://testing-library.com) | Unit tests                                    |
| [Storybook 8](https://storybook.js.org)                                              | Component docs and visual testing             |
| CSS + `injectStyle`                                                                  | Styles injected into the JS bundle at runtime |
| [ESLint 9](https://eslint.org) + [Prettier](https://prettier.io)                     | Linting and formatting                        |
| [commitlint](https://commitlint.js.org) + [husky](https://typicode.github.io/husky)  | Conventional Commits enforcement              |

## Requirements

- [nvm](https://github.com/nvm-sh/nvm)
- pnpm 9+ (activated automatically via corepack in `setup.sh`)

## Getting started

Run the setup script once — it installs the correct Node.js and pnpm versions, then installs all dependencies:

```bash
pnpm setup
```

After setup:

```bash
pnpm build
pnpm dev      # starts playground on :5173 and Storybook on :6006
```

### All root commands

```bash
pnpm setup       # install correct Node.js and pnpm versions, then install dependencies
pnpm build       # build all packages
pnpm dev         # watch mode: playground + storybook
pnpm test        # run all tests
pnpm check       # lint + typecheck + format check (all at once)
```

## CI and automatic releases

Releases are handled automatically by [semantic-release](https://semantic-release.gitbook.io) on every push to `main`. A new version is published to npm when there is at least one `feat` or `fix` commit since the last release.

Pull requests run `check`, `test` and `build` only; the release job runs on `main` after they pass.

### npm trusted publishing

CI publishes to npm via [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) — no npm token is stored in the repository, and each version gets a provenance attestation.

Trusted publishing is configured per package, so the package must already exist on npm:

1. Publish the first version manually (see [Rename and publish](#rename-and-publish)).
2. On [npmjs.com](https://www.npmjs.com) open the package → **Settings** → **Trusted Publisher** → **GitHub Actions**, and fill in your GitHub user/org, repository name and workflow filename `ci.yml`.

### Required GitHub Actions secrets

| Secret           | Where to get it                                            |
| ---------------- | ---------------------------------------------------------- |
| `GITHUB_TOKEN`   | Provided automatically by GitHub Actions — no setup needed |
| `SSH_DEPLOY_KEY` | See below                                                  |

`GITHUB_TOKEN` is injected by GitHub automatically; the CI workflow already requests the required permissions (`contents: write`, `issues: write`, `pull-requests: write`, `id-token: write` for npm OIDC).

### SSH deploy key

CI uses SSH for all git push operations (tags, release commits) because GitHub's HTTPS smart-HTTP may reject pushes from `GITHUB_TOKEN` in some repository configurations.

Generate a key pair locally (no passphrase):

```bash
ssh-keygen -t ed25519 -C "ci deploy key" -f deploy_key -N ""
```

Then:

1. **Settings → Deploy keys → Add deploy key** — paste `deploy_key.pub`, enable **Allow write access**
2. **Settings → Secrets and variables → Actions → New repository secret** — name `SSH_DEPLOY_KEY`, paste the contents of `deploy_key`
3. Delete both key files locally

## Dependency updates

[Dependabot](.github/dependabot.yml) opens weekly PRs for npm packages and GitHub Actions; security alerts and security updates are enabled in the repository settings.

`pnpm.overrides` in the root `package.json` forces a patched `handlebars` (pulled in by semantic-release); drop it once its dependents require `>=4.7.10`.

## Rename and publish

1. Replace `@repo/lib` with your package name in `packages/lib/package.json` and in any app that imports it.
2. In `packages/lib/package.json`: remove `"private": true`, fill in `description`, `keywords`, `repository`, `license`.
3. Publish the first version manually:
   ```bash
   pnpm build
   cd packages/lib
   npm publish
   ```
4. Set up [trusted publishing](#npm-trusted-publishing) — after that CI publishes automatically on every push to `main` with a `feat` or `fix` commit.

## CSS Modules and SSR

By default styles are injected into the JS bundle at runtime (`injectStyle: true` in `tsup.config.ts`). This is the simplest setup for client-side apps.

For SSR (Next.js, Remix, etc.) switch to a separate CSS file:

1. In `tsup.config.ts` set `injectStyle: false`.
2. Add a `./styles` export to `packages/lib/package.json`:
   ```json
   {
     "./styles": "./dist/index.css"
   }
   ```
3. Import it in consumers: `import '@repo/lib/styles'`

## Commit convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org) and are validated on every commit by a husky hook.

```
feat: add Tooltip component
fix: correct Button disabled pointer-events
docs: add CSS Modules SSR guide
chore: bump tsup to 8.4
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`.
