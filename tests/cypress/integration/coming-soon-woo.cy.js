// <reference types="Cypress" />
import { wpLogin, wpCli } from '../wp-module-support/utils.cy';

describe( 'Coming Soon with WooCommerce', { testIsolation: true }, () => {
	beforeEach( () => {
		wpLogin();

		// Set coming soon option to true to start with
		wpCli( `option update mm_coming_soon true` );
		wpCli( `option update nfd_coming_soon true` );

		// Activate WooCommerce
		wpCli( `plugin install woocommerce --activate`, {
			timeout: 40000,
			log: true,
		} );

		cy.visit( '/wp-admin/index.php' );
	} );

	after( () => {
		// Uninstall WooCommerce and extensions
		wpCli(
			'plugin uninstall --all --deactivate --exclude=bluehost-wordpress-plugin,wp-plugin-hostgator,wp-plugin-crazy-domains,wp-plugin-web,wp-plugin-mojo,wpforms-lite',
			{
				timeout: 60000,
				log: true,
			}
		);
	} );

	it( "Replace our admin bar site status badge with WooCommerce's when active", () => {
		// Visit settings page
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);

		// Our badge shouldn't be visible
		cy.get( '#wp-toolbar #wp-admin-bar-nfd-site-visibility-badge' ).should(
			'not.exist'
		);

		// WooCommerce badge should be visible
		cy.get(
			'#wp-toolbar #wp-admin-bar-woocommerce-site-visibility-badge a.ab-item'
		)
			.contains( 'a', 'Coming soon' )
			.should( 'be.visible' );
	} );

	it( 'Our plugin settings should toggle WooCommerce admin bar badge', () => {
		// Visit settings page
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);

		// Deactivate coming soon - Launch Site
		cy.get( '[data-id="coming-soon-toggle"]' ).click();
		cy.wait( 1000 );

		// WooCommerce badge should now be live
		cy.get( '#wp-toolbar .woocommerce-site-status-badge-live a.ab-item' )
			.contains( 'a', 'Live' )
			.should( 'be.visible' );

		// Re-enable coming soon mode
		cy.get( '[data-id="coming-soon-toggle"]' ).click();
		cy.wait( 1000 );

		// WooCommerce badge should now be coming soon
		cy.get(
			'#wp-toolbar .woocommerce-site-status-badge-coming-soon a.ab-item'
		)
			.contains( 'a', 'Coming soon' )
			.should( 'be.visible' );
	} );

	it( 'Hide our site preview notice when WooCommerce is active', () => {
		// Visit settings page
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);

		cy.visit( '/' );
		cy.get( '.nfd-site-preview-warning' ).should( 'not.exist' );
	} );
} );
