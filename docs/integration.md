# Integration

## How the module registers

The module registers with the Newfold Module Loader (see bootstrap). The host plugin typically registers a `comingSoon` service in the container that this module provides, so other code can call enable/disable and check is_enabled. The Bluehost plugin filters `newfold/coming-soon/filter/args` to pass template options (logo, backlinks, admin URL, styles, etc.).

## Filter: newfold/coming-soon/filter/args

Hosts can filter the template arguments passed to the coming soon template. See the Bluehost plugin’s bootstrap.php for an example (logo SVG, links, admin_bar_text, template_styles, etc.).

## Dependencies

Requires wp-module-data and wp-forge/wp-upgrade-handler. See [dependencies.md](dependencies.md).
