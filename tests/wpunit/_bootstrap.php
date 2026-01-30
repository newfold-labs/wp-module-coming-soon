<?php
/**
 * Bootstrap file for wpunit tests
 *
 * @package NewfoldLabs\WP\Module\ComingSoon
 */

// Load the module bootstrap
require_once dirname( dirname( __DIR__ ) ) . '/bootstrap.php';
// Functions are only loaded by bootstrap when ABSPATH is set; load them for tests.
require_once dirname( dirname( __DIR__ ) ) . '/includes/functions.php';
