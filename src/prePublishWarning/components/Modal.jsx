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

const Modal = () => {
	const { setIsModalOpen } = useDispatch( nfdComingSoonStore );

	const { isModalOpen } = useSelect( ( select ) => ( {
		isModalOpen: select( nfdComingSoonStore ).isModalOpen(),
	} ) );

	const handlePublishAndLaunch = () => {
		window.NewfoldRuntime.comingSoon.disable();
		setIsModalOpen( false );
	};

	if ( ! isModalOpen || ! window.NewfoldRuntime.comingSoon.isEnabled ) {
		return null;
	}

	const title = __( 'Ready to launch your Site?', 'wp-module-coming-soon' );
	const heading = __(
		'Pages and posts you publish will not be visible to the public until you launch your site.',
		'wp-module-coming-soon'
	);
	const launchButtonText = __(
		'Publish & Launch Site',
		'wp-module-coming-soon'
	);
	const withoutLaunchButtonText = __(
		'Publish Without Launching',
		'wp-module-coming-soon'
	);

	return (
		<WP2Modal
			title={ title }
			onRequestClose={ () => setIsModalOpen( false ) }
		>
			<div>
				<p>{ heading }</p>
				<br />
				<div
					style={ {
						alignContent: 'space-between',
						display: 'flex',
						flexWrap: 'wrap',
						gap: '16px',
						boxSizing: 'inherit',
					} }
				>
					<Button
						variant="primary"
						onClick={ handlePublishAndLaunch }
						style={ {
							flex: 1,
							justifyContent: 'center',
						} }
					>
						{ launchButtonText }
					</Button>
					<Button
						variant="link"
						onClick={ () => setIsModalOpen( false ) }
						style={ {
							flex: 1,
							justifyContent: 'center',
						} }
					>
						{ withoutLaunchButtonText }
					</Button>
				</div>
			</div>
		</WP2Modal>
	);
};

export default Modal;
