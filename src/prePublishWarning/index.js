/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { subscribe } from '@wordpress/data';
import { dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as nfdComingSoonStore } from './store';
import {
	NFD_PRE_PUBLISH_MODAL_ID,
} from './constants';
import Modal from './components/Modal';

domReady(() => {
	renderModal(NFD_PRE_PUBLISH_MODAL_ID);
});

/**
 * This function creates a modal that is rendered on the page.
 *
 * @param {string} elementId It takes an elementId as an argument and creates a div with the given elementId.
 */
const renderModal = (elementId) => {
	const modalRoot = document.createElement('div');
	modalRoot.id = elementId;

	// Append the modal container to the body if it hasn't been added already.
	if (!document.getElementById(elementId)) {
		document.body.append(modalRoot);
	}
	render(<Modal />, modalRoot);
};

/**
 * Displays the coming soon warning when the post/page is published and the "coming soon" feature is active.
 * 
 * @param {string} postStatus The status of the post/page.
 */
const showComingSoonWarningOnPublish = (postStatus) => {
	if ('publish' !== postStatus) {
		const unssubscribe = subscribe(() => {
			const currentPostStatus = window.wp.data.select('core/editor').getEditedPostAttribute('status');
			if ('publish' === currentPostStatus) {
				unssubscribe();
				const checkElementAvailability = () => {
					const publishPanel = document.querySelector('.components-snackbar-list__notice-container');
					if (publishPanel) {
						dispatch(nfdComingSoonStore).setIsModalOpen(true);
					} else {
						setTimeout(checkElementAvailability, 50);
					}
				};
				checkElementAvailability();
			}
		});
	}
}

/**
 * Listens to changes in the post status and triggers the display of the coming soon modal when needed.
 */
const listenToPostStatus = () => {
	const initialPostStatus = window.wp.data.select('core/editor').getEditedPostAttribute('status');
	if (typeof initialPostStatus !== 'undefined') {
		showComingSoonWarningOnPublish(initialPostStatus);
	} else {
		setTimeout(listenToPostStatus, 50);
	}
}

// Start listening to post status changes
listenToPostStatus();
