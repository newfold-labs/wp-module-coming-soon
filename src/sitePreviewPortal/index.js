import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { ComingSoonPortalApp } from './portal';

const WP_COMINGSOON_FILL_ELEMENT = 'nfd-coming-soon-portal';
let root = null;

const App = () => {
	return <ComingSoonPortalApp />;
};

const ComingSoonPortalAppRender = () => {
	const DOM_ELEMENT = document.getElementById( WP_COMINGSOON_FILL_ELEMENT );
	if ( null !== DOM_ELEMENT ) {
		if ( 'undefined' !== typeof createRoot ) {
			if ( ! root ) {
				root = createRoot( DOM_ELEMENT );
			}
			root.render( <App /> );
		}
	}
};

domReady( ComingSoonPortalAppRender );
