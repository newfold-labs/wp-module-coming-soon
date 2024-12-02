/**
 * Loginto WordPress.
 */
export const wpLogin = () => {
	cy.login( Cypress.env( 'wpUsername' ), Cypress.env( 'wpPassword' ) );
};

/**
 * wp-cli helper
 *
 * This wraps the command in the required npx wp-env run cli wp
 *
 * @param {string} cmd       the command to send to wp-cli
 * @param {Object} paramArgs any args to pass to exec
 */
export const wpCli = ( cmd, paramArgs ) => {
	const defaultArgs = {
		env: {
			NODE_TLS_REJECT_UNAUTHORIZED: '1',
		},
		failOnNonZeroExit: true,
	};
	const args = { ...defaultArgs, ...paramArgs };
	cy.exec( `npx wp-env run cli wp ${ cmd }`, args ).then( ( result ) => {
		for ( const [ key, value ] of Object.entries( result ) ) {
			cy.log( `${ key }: ${ value }` );
		}
	} );
};
