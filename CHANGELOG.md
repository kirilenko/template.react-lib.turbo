## [1.1.1](https://github.com/kirilenko/template.react-lib.turbo/compare/v1.1.0...v1.1.1) (2026-05-27)


### Bug Fixes

* add license, repository and homepage fields to package.json ([01874ea](https://github.com/kirilenko/template.react-lib.turbo/commit/01874eaea236a9c3e0dd666e0277b1f7a019a913))
* **ci:** replace @semantic-release/git with native git push step ([bc32e9b](https://github.com/kirilenko/template.react-lib.turbo/commit/bc32e9b2c37b2d03efadc7ed2d5174cb9826be6b))
* **ci:** use explicit token in git remote url instead of credential helper ([4516634](https://github.com/kirilenko/template.react-lib.turbo/commit/4516634bd13816dd905db7f682a914020e794a95))
* **ci:** use SSH deploy key for git push to bypass HTTPS push rejection ([c38462e](https://github.com/kirilenko/template.react-lib.turbo/commit/c38462ea45bb3c5a21a22986350ac96086bce9d1))

# [1.1.0](https://github.com/kirilenko/template.react-lib.turbo/compare/v1.0.0...v1.1.0) (2026-05-27)


### Bug Fixes

* set private:true and publishConfig in lib package to prevent accidental publish of placeholder ([98b97f5](https://github.com/kirilenko/template.react-lib.turbo/commit/98b97f555c07b02b59d65f7a20e78593d8d9a4d4))


### Features

* rename package to template-react-lib-turbo for npm publishing ([5548797](https://github.com/kirilenko/template.react-lib.turbo/commit/55487978f9364354a53da423c394e0b0f910e934))

# 1.0.0 (2026-05-27)

### Bug Fixes

- **ci:** add NODE_AUTH_TOKEN for npm authentication in release step ([fdb5af2](https://github.com/kirilenko/template.react-lib.turbo/commit/fdb5af240eb1b33bbddd2f11e9436deaaf6ad3bb))
- **ci:** build lib before typecheck to resolve @repo/lib types ([4d558df](https://github.com/kirilenko/template.react-lib.turbo/commit/4d558dfd387b59e0d6e74b29ce336cd0d1ccbc6e))
- **ci:** disable husky in release step to allow semantic-release commits ([f44bdc5](https://github.com/kirilenko/template.react-lib.turbo/commit/f44bdc58cf07dc503cc397a401b7ba3ae5a2c9c8))

### Features

- initial monorepo template setup ([28118a5](https://github.com/kirilenko/template.react-lib.turbo/commit/28118a58c4d072684a719f4cc26064cb0ea14426))
