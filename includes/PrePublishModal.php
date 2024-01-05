<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * Admin library class
 */
final class PrePublishModal {

	/**
	 * Constructor.
	 */
	public function __construct() {
		if ( self::coming_soon() ) {
			\add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'register_assets' ) );
		}
	}

	/**
	 * Register assets.
	 */
	public static function register_assets() {
		$asset_file = NFD_COMING_SOON_BUILD_DIR . '/coming-soon.asset.php';

		if ( is_readable( $asset_file ) ) {
			
			$asset = include_once $asset_file;

			\wp_register_script(
				'nfd-coming-soon',
				NFD_COMING_SOON_BUILD_URL . '/coming-soon.js',
				array_merge( $asset['dependencies'], array() ),
				$asset['version'],
				true
			);

			\wp_register_style(
				'nfd-coming-soon',
				NFD_COMING_SOON_BUILD_URL . '/coming-soon.css',
				array(),
				$asset['version']
			);

			\wp_enqueue_script( 'nfd-coming-soon' );
			\wp_enqueue_style( 'nfd-coming-soon' );
		}
	}

	/**
	 * Determine whether the site is in coming soon mode.
	 *
	 * @return boolean
	 */
	public static function coming_soon() {
		// Check if nfd_coming_soon is set to true.
		$coming_soon = \get_option( 'nfd_coming_soon', null );
		if ( null !== $coming_soon ) {
			return 'true' === $coming_soon;
		}

		// Check if legacy mm_coming_soon is set to true.
		$coming_soon = \get_option( 'mm_coming_soon', null );
		if ( null !== $coming_soon ) {
			return 'true' === $coming_soon;
		}

		// Assume site has been launched if both options do not exist.
		return false;
	}

}
