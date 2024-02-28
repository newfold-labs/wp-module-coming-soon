// <reference types="Cypress" />

describe( 'Coming Soon', function () {
	const appClass = '.' + Cypress.env( 'appId' );

	before( () => {
		// Set coming soon option to true to start with
		cy.exec( `npx wp-env run cli wp option update mm_coming_soon true` );
		cy.exec( `npx wp-env run cli wp option update nfd_coming_soon true` );		
	} );

	it( 'Coming Soon is active', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);
		cy.reload();

		// Initial Coming Soon State
		cy.get( '#wp-toolbar #wp-admin-bar-site-status #nfd-site-status-coming-soon' )
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
	});

	it( 'Displays Coming Soon in Site Status Admin Toolbar', () => {
		// Admin bar contains label
		cy.get( '#wp-toolbar #wp-admin-bar-site-status' )
			.contains( 'div', 'Site Status' )
			.should( 'be.visible' );
		// Admin bar contains status
		cy.get( '#wp-toolbar #wp-admin-bar-site-status #nfd-site-status-coming-soon' )
			.scrollIntoView()
			.should( 'be.visible' );
		cy.get( '#wp-toolbar #wp-admin-bar-site-status #nfd-site-status-live' )
			.should( 'not.be.visible' );
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

	} );

	it( 'Coming Soon Admin bar links to setting', () => {
		cy.get( '#wp-toolbar #wp-admin-bar-site-status #nfd-site-status-coming-soon' ).click();
		cy.location().should( ( loc ) => {
			expect( loc.hash ).to.eq( '#/settings' )
		});
	} );

	it( 'Coming Soon Toggle Turns Coming Soon Off', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);
		// Deactivate coming soon - Launch Site
		cy.get( '[data-id="coming-soon-toggle"]' ).click();
		cy.wait( 500 );

		// Toggle is false
		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'false' );

		// Admin bar is updated
		cy.get( '#wp-toolbar #wp-admin-bar-site-status #nfd-site-status-live' )
			.scrollIntoView()
			.should( 'be.visible' );

		// Snackbar notice displays properly
		cy.get( '.nfd-notifications' )
			.contains( '.nfd-notification', 'Coming soon deactivated' )
			.should( 'be.visible' );
	} );

	it( 'Coming Soon Toggle Turns Coming Soon On', () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/settings'
		);

		// Activate Coming Soon - Unlaunch Site
		cy.get( '[data-id="coming-soon-toggle"]' ).click();
		cy.wait( 500 );

		// Toggle is true
		cy.get( '[data-id="coming-soon-toggle"]' )
			.should( 'have.attr', 'aria-checked' )
			.and( 'include', 'true' );

		// Admin bar is updated
		cy.get( '#wp-toolbar #wp-admin-bar-site-status #nfd-site-status-coming-soon' )
			.scrollIntoView()
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

	it( 'Displays Coming Soon on Frontend', () => {
		cy.logout();
		cy.visit( '/' );
		cy.title().should( 'include', 'Coming Soon' );
		cy.get( '#wrap' ).contains( 'Coming Soon' ).should( 'exist' );
	} );

	it( 'Launching launches site', () => {
		cy.login( Cypress.env( 'wpUsername' ), Cypress.env( 'wpPassword' ) );
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
