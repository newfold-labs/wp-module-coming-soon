// <reference types="Cypress" />

describe( 'Coming Soon with WooCommerce', function () {
	before( () => {
		// Set coming soon option to true to start with
		cy.exec( `npx wp-env run cli wp option update mm_coming_soon true` );
		cy.exec( `npx wp-env run cli wp option update nfd_coming_soon true` );

		// Activate WooCommerce
		cy.exec( `npx wp-env run cli wp plugin install woocommerce --activate`, {
			timeout: 40000,
			log: true,
		} );
	} );

	after( () => {
		// Deactivate WooCommerce
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			timeout: 40000,
		} );
	} );

	it( 'Replace our admin bar site status badge with WooCommerce\'s when active', 
		{ defaultCommandTimeout: 15000 },
		() => {
			// Visit settings page
			cy.visit(
				'/wp-admin/admin.php?page=' +
					Cypress.env( 'pluginId' ) +
					'#/settings'
			);

			// reload the page
			cy.reload();

			// Our badge shouldn't be visible
			cy.get( '#wp-toolbar #wp-admin-bar-nfd-site-visibility-badge' )
				.should( 'not.exist' );

			// WooCommerce badge should be visible
			cy.get( '#wp-toolbar #wp-admin-bar-woocommerce-site-visibility-badge a.ab-item' )
				.contains( 'a', 'Coming soon' )
				.should( 'be.visible' );
	});

	it ( 'Our plugin settings should toggle WooCommerce admin bar badge',
		{ defaultCommandTimeout: 10000 },
		() => {
			// Deactivate coming soon - Launch Site
			cy.get( '[data-id="coming-soon-toggle"]' ).click();
			cy.wait( 1000 );

			// WooCommerce badge should now be live
			cy.get( '#wp-toolbar .woocommerce-site-status-badge-live a.ab-item' )
				.contains( 'a', 'Live' )
				.should( 'be.visible' );

			// Re-enable coming soon mode
			cy.get( '[data-id="coming-soon-toggle"]' )
				.click();

			// WooCommerce badge should now be coming soon
			cy.get( '#wp-toolbar .woocommerce-site-status-badge-coming-soon a.ab-item' )
				.contains( 'a', 'Coming soon' )
				.should( 'be.visible' );
	});
	
	it( 'Hide our site preview notice when WooCommerce is active', () => {
		cy.visit( '/' );
		cy.get( '.nfd-site-preview-warning' )
			.should( 'not.exist' );
	});
} );
