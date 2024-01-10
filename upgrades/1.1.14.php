<?php
/**
 * Handles update for coming soon module version 1.1.14.
 *
 * Enable coming soon page on fresh installations.
 * 
 * @package NewfoldLabs\WP\Module\ComingSoon
 */

use NewfoldLabs\WP\Module\ComingSoon\Service;
use function NewfoldLabs\WP\ModuleLoader\container;

add_action( 'newfold_container_set', function () {
	$isFreshInstall = container()->has( 'isFreshInstallation' ) ? container()->get( 'isFreshInstallation' ) : false;
	if ( $isFreshInstall ) {
		$comingSoonService = new Service();
		$comingSoonService->enable();
	}
} );
