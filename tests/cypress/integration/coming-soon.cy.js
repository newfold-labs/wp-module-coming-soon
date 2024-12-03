// <reference types="Cypress" />
import { wpLogin, wpCli } from '../wp-module-support/utils.cy';

describe( 'Coming Soon', { testIsolation: true }, () => {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach( () => {
		wpLogin();
		// Set coming soon option to true to start with
		wpCli( `option update mm_coming_soon true` );
		wpCli( `option update nfd_coming_soon true` );

		// Deactivate WooCommerce if it's active
		wpCli( `plugin deactivate woocommerce`, {
			timeout: 40000,
			log: true,
			failOnNonZeroExit: false,
		} );
		cy.visit( '/wp-admin/index.php' );
	} );

	it( 'Coming Soon is active', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);
		cy.reload();

		// Initial Coming Soon State
		cy.get( '#wp-toolbar #wp-admin-bar-nfd-site-visibility-badge' )
			.scrollIntoView()
			.should( 'be.visible' );

		cy.get( appClass + '-app-settings-coming-soon' )
			.contains( 'h3', 'Site Status' )
			.scrollIntoView()
			.should( 'be.visible' );

		cy.get( appClass + '-app-settings-coming-soon' )
			.contains( 'label', 'Coming' )
			.scrollIntoView()
			.should( 'be.visible' );

		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'true' );

		// Admin bar contains label
		cy.get(
			'#wp-toolbar #wp-admin-bar-nfd-site-visibility-badge a.ab-item'
		)
			.contains( 'a', 'Coming soon' )
			.should( 'be.visible' );
	} );

	it( 'Has Coming Soon Section on Home', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' + Cypress.env( 'pluginId' ) + '#/home'
		);
		cy.get( appClass + '-home .nfd-app-section-content' )
			.first()
			.scrollIntoView()
			.contains( 'h1', 'Ready to go live?' )
			.should( 'be.visible' );

		cy.get( appClass + '-home .nfd-app-section-content' )
			.contains( 'a.nfd-button', 'iew your s' )
			.first()
			.should( 'exist' );

		cy.get( appClass + '-home .nfd-app-section-content' )
			.first()
			.contains( 'button', 'Launch' )
			.should( 'exist' );

		// Coming Soon Admin bar links to setting
		cy.get(
			'#wp-toolbar #wp-admin-bar-nfd-site-visibility-badge a.ab-item'
		).click();
		cy.location().should( ( loc ) => {
			expect( loc.hash ).to.eq( '#/settings' );
		} );
	} );

	it( 'Coming Soon Toggle Turns Coming Soon Off', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);
		// Deactivate coming soon - Launch Site
		cy.get( '[data-id="coming-soon-toggle"]' ).click();
		cy.wait( 2000 );

		// Toggle is false
		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'false' );

		// Admin bar is updated
		cy.get( '#wp-toolbar .nfd-site-status-badge-live a.ab-item' )
			.scrollIntoView()
			.contains( 'a', 'Live' )
			.should( 'be.visible' );

		// Snackbar notice displays properly
		cy.get( '.nfd-notifications' )
			.contains( '.nfd-notification', 'Coming soon deactivated' )
			.should( 'be.visible' );

		// Coming Soon Toggle Turns Coming Soon Back On
		// Activate Coming Soon - Unlaunch Site
		cy.get( '[data-id="coming-soon-toggle"]' ).click();
		cy.wait( 2000 );

		// Toggle is true
		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'true' );

		// Admin bar is updated
		cy.get( '#wp-toolbar .nfd-site-status-badge-coming-soon a.ab-item' )
			.scrollIntoView()
			.contains( 'a', 'Coming soon' )
			.should( 'be.visible' );

		// Snackbar notice displays properly
		cy.get( '.nfd-notifications' )
			.contains( '.nfd-notification', 'Coming soon activated' )
			.should( 'be.visible' );
	} );

	it( 'Displays admin coming soon notice', () => {
		cy.visit( '/wp-admin/index.php' );
		cy.get( '.notice-warning' )
			.contains( 'p', 'coming' )
			.should( 'be.visible' );
	} );

	it( 'Displays Coming Soon Site Preview Warning', () => {
		cy.visit( '/' );
		cy.get( '.nfd-site-preview-warning' )
			.contains( 'div', 'Site Preview' )
			.should( 'be.visible' );
	} );

	it( 'Displays Coming Soon on Frontend', () => {
		cy.logout();
		cy.visit( '/' );
		cy.title().should( 'include', 'Coming Soon' );
		cy.get( '#wrap' ).contains( 'Coming Soon' ).should( 'exist' );
	} );

	// this test is already in the ecommerce module, and the code is in the ecommerce module
	// once the component is moved into this module this test will be used and the ecom test removed
	it( 'Launching launches site', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);
		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'true' );

		cy.visit(
			'/wp-admin/admin.php?page=' + Cypress.env( 'pluginId' ) + '#/home'
		);

		cy.get( appClass + '-home .nfd-app-section-content' )
			.first()
			.contains( 'button', 'Launch your' )
			.click();
		cy.wait( 100 );

		cy.get( appClass + '-home .nfd-app-section-content' )
			.first()
			.contains( 'button', 'Launch your' )
			.should( 'not.exist' );

		cy.logout();
		cy.visit( '/' );
		cy.title().should( 'not.include', 'Coming Soon' );
		cy.get( 'body' ).contains( 'Coming Soon' ).should( 'not.exist' );

		cy.login( Cypress.env( 'wpUsername' ), Cypress.env( 'wpPassword' ) );

		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);

		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'false' );
	} );
} );
