# Agent guidance – wp-module-coming-soon

This file gives AI agents a quick orientation to the repo. For full detail, see the **docs/** directory.

## What this project is

- **wp-module-coming-soon** – Coming Soon page for WordPress sites. Registers with the Newfold Module Loader and provides enable/disable, template, and integration with the host (e.g. Bluehost). Depends on wp-module-data and wp-forge/wp-upgrade-handler. Maintained by Newfold Labs.

- **Stack:** PHP 7.3+. See composer.json for dependencies.

- **Architecture:** Registers with the loader; provides coming-soon state and template; host can filter args (e.g. `newfold/coming-soon/filter/args`). See docs/integration.md.

## Key paths

| Purpose | Location |
|---------|----------|
| Bootstrap | `bootstrap.php` |
| Includes | `includes/` |
| Tests | `tests/` |

## Essential commands

```bash
composer install
composer run lint
composer run fix
composer run test
```

## Documentation

- **Full documentation** is in **docs/**. Start with **docs/index.md**.
- **CLAUDE.md** is a symlink to this file (AGENTS.md).

---

## Keeping documentation current

When you change code, features, or workflows, update the docs. When cutting a release, update **docs/changelog.md**.
