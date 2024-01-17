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
		if ( isComingSoonActive() ) {
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

}
