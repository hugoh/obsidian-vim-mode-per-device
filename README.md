# Vim Mode Per Device

An [Obsidian](https://obsidian.md) plugin that turns **Vim key bindings** on or
off depending on the kind of device Obsidian is running on.

Vim key bindings are great with a hardware keyboard and painful on a phone's
touch keyboard. Obsidian stores the setting in the vault's shared config
(`.obsidian/app.json`), so with iCloud, Obsidian Sync, Git or any other sync,
switching it on for your laptop switches it on for your phone too. This plugin
sets it per device type each time Obsidian starts.

## Features

- Vim key bindings **on for desktop, off for mobile** by default.
- Both choices are configurable, so you can do the opposite or turn it on
  everywhere.
- Writes the setting only when it differs, so synced devices don't keep
  rewriting `app.json`.
- No network access, no telemetry, and no files touched besides Obsidian's
  own config.

## Installation

### From Community plugins

1. Open **Settings → Community plugins → Browse**.
2. Search for **Vim Mode Per Device** and select **Install**, then **Enable**.

### Manually

1. Download `main.js` and `manifest.json` from the
   [latest release](https://github.com/hugoh/obsidian-vim-mode-per-device/releases/latest).
2. Copy them to `<vault>/.obsidian/plugins/vim-mode-per-device/`.
3. Reload Obsidian and enable the plugin in **Settings → Community plugins**.

Enable the plugin once: the list of enabled plugins syncs with the vault, so it
becomes active on every device.

## Settings

**Settings → Vim Mode Per Device**:

| Setting | Default | Applies on |
|---|---|---|
| Vim key bindings on desktop | On | macOS, Windows, Linux |
| Vim key bindings on mobile | Off | iOS, iPadOS, Android (phones and tablets) |

Changes apply immediately to the current device. Other devices pick them up
the next time Obsidian starts there.

## How it works

On load, the plugin checks `Platform.isMobile` and sets Obsidian's `vimMode`
config to the matching setting. The plugin's own settings are stored in its
`data.json` and sync with the vault like any other plugin data.

### Caveats

- Toggling **Settings → Editor → Vim key bindings** by hand still works, but
  the plugin applies your per-device choice again the next time Obsidian
  starts. Change the plugin's settings instead.
- Tablets count as mobile, which is how Obsidian itself classifies them.
- Obsidian doesn't publish an API for its own editor settings. The plugin uses
  `app.vault.getConfig` / `setConfig`, the internal methods behind Obsidian's
  settings screens. Many plugins rely on them, but a future Obsidian release
  could change them.

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

## License

[MIT](LICENSE)
