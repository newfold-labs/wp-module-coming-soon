import { createPortal, useEffect, useState } from '@wordpress/element';
import { ComingSoon } from '../comingSoon';

export const ComingSoonPortalApp = () => {
	const [ container, setContainer ] = useState( null );

	useEffect( () => {
		const registry = window.NFDPortalRegistry;
		// Check for required registry
		if ( ! registry ) {
			return;
		}

		const updateContainer = ( el ) => {
			setContainer( el );
		};

		const clearContainer = () => {
			setContainer( null );
		};

		// Subscribe to portal readiness updates
		registry.onReady( 'coming-soon', updateContainer );
		registry.onRemoved( 'coming-soon', clearContainer );

		// Immediately try to get the container if already registered
		const current = registry.getElement( 'coming-soon' );
		if ( current ) {
			updateContainer( current );
		}
	}, [] );

	if ( ! container ) {
		return null;
	}

	return createPortal(
		<ComingSoon />,
		container
	);
};
