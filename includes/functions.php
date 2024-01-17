<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * Check if the coming soon module is active.
 *
 * @return bool
 */
function isComingSoonActive() {
	return ( new Service() )->is_enabled();
}