<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ComingSoon;
use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				[
					'name'     => 'coming-soon',
					'label'    => __( 'Coming Soon', 'newfold' ),
					'callback' => function ( Container $container ) {
						require __DIR__ . '/includes/coming-soon.php';
						$comingSoon = new ComingSoon($container);
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}