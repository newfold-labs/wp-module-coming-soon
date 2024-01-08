<?php
/**
 * Coming soon service provider.
 *
 * @package NewfoldLabs\WP\Module\ComingSoon
 */

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * A service provider class to interact with the coming soon module from the container.
 **/
class Service
{
	/**
	 * Enable the coming soon page.
	 *
	 * @return void
	 */
	public function enable() {
		update_option( 'nfd_coming_soon', 'true' );
	}

	/**
	 * Disable the coming soon page.
	 *
	 * @return void
	 */
	public function disable() {
		update_option( 'nfd_coming_soon', 'false' );
	}

	/**
	 * Check if the coming soon page is enabled.
	 *
	 * @return bool
	 */
	public function is_enabled() {
		return 'true' === get_option( 'nfd_coming_soon', 'false' );
	}
}