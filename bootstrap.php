<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ComingSoon\ComingSoon;
use NewfoldLabs\WP\Module\ComingSoon\Service;
use function NewfoldLabs\WP\ModuleLoader\register;
use WP_Forge\UpgradeHandler\UpgradeHandler;

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	return;
}

// Do not allow multiple copies of the module to be active
if ( defined( 'NFD_COMING_SOON_MODULE_VERSION' ) ) {
	return;
}

define( 'NFD_COMING_SOON_MODULE_VERSION', '1.1.14' );

if ( function_exists( 'is_admin' ) && is_admin() ) {
	$upgrade_handler = new UpgradeHandler(
		__DIR__ . '/upgrades',
		get_option( 'nfd_coming_soon_module_version' ),
		NFD_DATA_MODULE_VERSION
	);

	if ( $upgrade_handler->maybe_upgrade() ) {
		// If an upgrade occurred, update the new version in the database to prevent running the routine(s) again.
		update_option( 'nfd_coming_soon_module_version', NFD_COMING_SOON_MODULE_VERSION, true );
	}
}

/**
 * Register the coming soon module
 */
if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				array(
					'name'     => 'coming-soon',
					'label'    => __( 'Coming Soon', 'newfold-module-coming-soon' ),
					'callback' => function ( Container $container ) {
						if ( ! defined( 'NFD_COMING_SOON_BUILD_DIR' ) && defined( 'NFD_COMING_SOON_MODULE_VERSION' ) ) {
							define( 'NFD_COMING_SOON_BUILD_DIR', __DIR__ . '/build/' . NFD_COMING_SOON_MODULE_VERSION );
						}
						if ( ! defined( 'NFD_COMING_SOON_BUILD_URL' ) && defined( 'NFD_COMING_SOON_MODULE_VERSION' ) ) {
							define( 'NFD_COMING_SOON_BUILD_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-coming-soon/build/' . NFD_COMING_SOON_MODULE_VERSION );
						}
						$container->set( 'comingSoon', $container->service( function () {
							return new Service();
						}) );
						return new ComingSoon( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				)
			);

		}
	);

}
