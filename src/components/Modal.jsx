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

/**
 * Internal dependencies
 */
import { launch } from './Icons';
import { store as nfdComingSoonStore } from '../store';
import { setComingSoon } from '../utils/api/comingSoon';


const Modal = () => {
	const { setIsModalOpen } = useDispatch(nfdComingSoonStore);
	const [isComingSoonActive, setIsComingSoonActive] = useState(true); 

	const { isEditorSidebarOpened } = useSelect(
		(select) => ({
			isEditorSidebarOpened: select(editPostStore).isPublishSidebarOpened()
		})
	);

	const { isModalOpen } = useSelect(
		(select) => ({
			isModalOpen: select(nfdComingSoonStore).isModalOpen(),
		})
	);

	useEffect(() => {
		if (isEditorSidebarOpened) {
			const checkElementAvailability = () => {
				const publishPanel = document.querySelector('.editor-post-publish-panel');
				if (publishPanel) {
					setIsModalOpen(true);
				} else {
					setTimeout(checkElementAvailability, 50);
				}
			};
			checkElementAvailability();
		}
	}, [isEditorSidebarOpened]);

	const handlePublishAndLaunch = () => {
		setComingSoon(false);
		setIsComingSoonActive(false);
		setIsModalOpen(false);
	};

	if (!isModalOpen || !isComingSoonActive) {
		return null;
	}

	//setComingSoon
	return (
		<WP2Modal
			title="Ready to launch your Site?"
			onRequestClose={() => setIsModalOpen(false)}
		>
			<div>
				<p>Pages you publish will not be visible to the public until you launch your site.</p>
				<div className="modal-buttons">
					<Button
						icon={<Icon icon={launch} />}
						variant="primary" onClick={handlePublishAndLaunch}>
						Publish & Launch Site
					</Button>
					<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
						Publish without launching
					</Button>
				</div>
			</div>
		</WP2Modal>
	);
};

export default Modal;
