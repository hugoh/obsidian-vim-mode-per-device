# Contributing

Issues and pull requests are welcome. PR titles must follow
[Conventional Commits](https://www.conventionalcommits.org) (`feat: …`,
`fix: …`), which CI checks. PRs are squash-merged, so the title becomes the
commit message and the changelog entry.

## Development

Tooling is managed by [mise](https://mise.jdx.dev) (Bun, hk and the linters):

```sh
mise install
bun install
bun run dev      # rebuild main.js on change
bun test
bun run lint     # eslint-plugin-obsidianmd, the rules the plugin review applies
bun run build    # typecheck + production bundle
hk check --all   # everything CI runs
```

To try a build, symlink or copy `main.js` and `manifest.json` into a test vault's
`.obsidian/plugins/vim-mode-per-device/`.

CI runs `hk check`, which includes the official
[`eslint-plugin-obsidianmd`](https://github.com/obsidianmd/eslint-plugin)
linter, TypeScript and the tests.

## Releasing

Obsidian requires the release tag to equal `manifest.json`'s `version` (with no
`v` prefix), and it reads that version from the default branch. Releases are
driven by [release-please](https://github.com/googleapis/release-please) from
[Conventional Commits](https://www.conventionalcommits.org):

1. Merge `feat:` / `fix:` PRs as usual. release-please keeps a
   `chore(main): release X.Y.Z` PR open that bumps `manifest.json` and
   `package.json` and updates `CHANGELOG.md`.
2. Merge the release PR when you want to ship. The
   [`release`](.github/workflows/release.yml) workflow tags `X.Y.Z` and opens a
   draft release. It then builds, attests provenance for `main.js`, attaches
   `main.js` and `manifest.json`, and publishes the release.

`versions.json` maps plugin versions to the oldest Obsidian they support. Add
an entry only when you raise `minAppVersion` in `manifest.json`, in the same
PR. The `obsidian_lint` step flags any API newer than `minAppVersion`.

The release PR is opened with a GitHub App token (`RELEASE_APP_CLIENT_ID` variable,
`RELEASE_APP_PRIVATE_KEY` secret) so that CI runs on it.
