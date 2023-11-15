/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * WordPress dependencies
 */
import { Modal as WP2Modal, Button, Icon } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as editPostStore } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { launch } from './Icons';
import { store as nfdComingSoonStore } from '../store';
import { setComingSoon } from '../utils/api/comingSoon';


const Modal = () => {
	const { setIsModalOpen } = useDispatch(nfdComingSoonStore);
	const [isComingSoonActive, setIsComingSoonActive] = useState(true); 

	const { isModalOpen } = useSelect(
		(select) => ({
			isModalOpen: select(nfdComingSoonStore).isModalOpen(),
		})
	);

	const handlePublishAndLaunch = () => {
		setComingSoon(false);
		setIsComingSoonActive(false);
		setIsModalOpen(false);
	};

	if (!isModalOpen || !isComingSoonActive) {
		return null;
	}

	const title = __('Ready to launch your Site?', 'nfd-coming-soon');
	const heading = __('Pages you publish will not be visible to the public until you launch your site.', 'nfd-coming-soon');
	const launchButtonText = __('Publish & Launch Site', 'nfd-coming-soon');
	const withoutLaunchButtonText = __('Publish without launching', 'nfd-coming-soon');

	return (
		<WP2Modal
			title={title}
			onRequestClose={() => setIsModalOpen(false)}
		>
			<div>
				<p>{heading}</p>
				<div className="modal-buttons">
					<Button
						icon={<Icon icon={launch} />}
						variant="primary" onClick={handlePublishAndLaunch}>
						{launchButtonText}
					</Button>
					<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
						{withoutLaunchButtonText}
					</Button>
				</div>
			</div>
		</WP2Modal>
	);
};

export default Modal;
