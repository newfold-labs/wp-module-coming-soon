/**
 * Styles.
 */
import './styles/app.scss';

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
 * Add click event to Publish Button.
 */
const registerCallback2 = () => {
	window.requestAnimationFrame(() => {

		// Exit early if the toolbar doesn't exist.
		if (
			!document.querySelector('.edit-post-header-toolbar') &&
			!document.querySelector('.edit-site-header_start')
		) {
			return;
		}

		const buttonElement = document.querySelector('button.components-button.editor-post-publish-button.editor-post-publish-button__button.is-primary');
		buttonElement?.addEventListener('click', function () {
			if (buttonElement?.textContent.trim() === 'Publish')
				dispatch(nfdComingSoonStore).setIsModalOpen(true);
		});
		unsubscribe();
	});
};

const unsubscribe = subscribe(registerCallback2);
