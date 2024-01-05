<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ComingSoon\ComingSoon;
use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				array(
					'name'     => 'coming-soon',
					'label'    => __( 'Coming Soon', 'newfold-module-coming-soon' ),
					'callback' => function ( Container $container ) {
						if ( ! defined( 'NFD_COMING_SOON_VERSION' ) ) {
							define( 'NFD_COMING_SOON_VERSION', '0.0.1' );
						}
						if ( ! defined( 'NFD_COMING_SOON_BUILD_DIR' ) && defined( 'NFD_COMING_SOON_VERSION' ) ) {
							define( 'NFD_COMING_SOON_BUILD_DIR', __DIR__ . '/build/' . NFD_COMING_SOON_VERSION );
						}
						if ( ! defined( 'NFD_COMING_SOON_BUILD_URL' ) && defined( 'NFD_COMING_SOON_VERSION' ) ) {
							define( 'NFD_COMING_SOON_BUILD_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-coming-soon/build/' . NFD_COMING_SOON_VERSION );
						}
						return new ComingSoon( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				)
			);

		}
	);

}
