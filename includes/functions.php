<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * Check if the coming soon module is active.
 */
function isComingSoonActive(): bool {
	return ( new Service() )->is_enabled();
}

/**
 * Check if WooCommerce is activated
 */
function isWoocommerceActive(): bool {
	return class_exists( 'woocommerce' );
}
