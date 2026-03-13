# Getting started

## Prerequisites

- **PHP** 7.3+.
- **Composer.** The module requires `newfold-labs/wp-module-data` and `wp-forge/wp-upgrade-handler`.

## Install

```bash
composer install
```

## Run tests

```bash
composer run test
composer run test-coverage
```

## Lint

```bash
composer run lint
composer run fix
```

## Using in a host plugin

1. Depend on `newfold-labs/wp-module-coming-soon` (and wp-module-data).
2. The module registers with the loader. Use the container’s coming-soon service to enable/disable. Customize template via the `newfold/coming-soon/filter/args` filter. See [integration.md](integration.md).
