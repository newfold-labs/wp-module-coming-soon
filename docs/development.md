# Development

## Linting

- **PHP:** `composer run lint`, `composer run fix`. Uses repo phpcs config.

## Testing

- **Codeception wpunit:** `composer run test`, `composer run test-coverage`. Open `tests/_output/html/index.html` for coverage.

## Workflow

1. Make changes in `includes/` or `bootstrap.php`.
2. Run `composer run lint` and `composer run test` before committing.
3. When changing template or filter behavior, update [integration.md](integration.md). When cutting a release, update **docs/changelog.md**.
