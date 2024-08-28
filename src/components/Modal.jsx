/**
 * External dependencies
 */
import { useState } from '@wordpress/element';

/**
 * WordPress dependencies
 */
import { Modal as WP2Modal, Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { store as nfdComingSoonStore } from '../store';
import { setComingSoon } from '../utils/api/comingSoon';

const Modal = () => {
	const { setIsModalOpen } = useDispatch(nfdComingSoonStore);
	const [isComingSoonActive, setIsComingSoonActive] = useState(true);

	const { isModalOpen } = useSelect((select) => ({
		isModalOpen: select(nfdComingSoonStore).isModalOpen(),
	}));

	const handlePublishAndLaunch = () => {
		setComingSoon(false);
		setIsComingSoonActive(false);
		setIsModalOpen(false);
	};

	if (!isModalOpen || !isComingSoonActive) {
		return null;
	}

	const title = __('Ready to launch your Site?', 'nfd-coming-soon');
	const heading = __(
		'Pages and posts you publish will not be visible to the public until you launch your site.',
		'nfd-coming-soon'
	);
	const launchButtonText = __('Publish & Launch Site', 'nfd-coming-soon');
	const withoutLaunchButtonText = __(
		'Publish Without Launching',
		'nfd-coming-soon'
	);

	return (
		<WP2Modal title={title} onRequestClose={() => setIsModalOpen(false)}>
			<div>
				<p>{heading}</p>
				<br />
				<Button variant="primary" onClick={handlePublishAndLaunch}>
					{launchButtonText}
				</Button>
				&nbsp;
				<Button
					variant="secondary"
					onClick={() => setIsModalOpen(false)}
				>
					{withoutLaunchButtonText}
				</Button>
			</div>
		</WP2Modal>
	);
};

export default Modal;
