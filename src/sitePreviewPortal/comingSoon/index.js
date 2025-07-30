import { Button, Title } from "@newfold/ui-component-library";
import { useEffect, useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { 
	RocketLaunchIcon,
	GlobeAltIcon,
	WrenchIcon,
	ArrowTopRightOnSquareIcon,
	PencilIcon
} from '@heroicons/react/24/outline';
import { SitePreview } from "../sitePreview";
import "../style.scss";

export const ComingSoon = () => {
	const [isComingSoonEnabled, setIsComingSoonEnabled] = useState( window.NewfoldComingSoonPortal.isComingSoon );
	const viewUrl = window.NewfoldComingSoonPortal.viewUrl;
	const editUrl = window.NewfoldComingSoonPortal.editUrl;
	const previewUrl = window.NewfoldComingSoonPortal.previewUrl;

	useEffect(() => {
		window.NewfoldRuntime.comingSoon.isEnabled().then((isEnabled) => {
			setIsComingSoonEnabled( isEnabled );
		});
	}, []);

	return (
		<div className="coming-soon-fill nfd-app-section-content">
			<div 
				className="nfd-coming-soon-content md:nfd-flex-row-reverse"
				data-cy="nfd-coming-soon-content"
				data-coming-soon={ isComingSoonEnabled ? 'true' : 'false' }
			>
				<div className="nfd-flex nfd-flex-col nfd-gap-2 nfd-w-full md:nfd-w-1/2">
					<SitePreview 
						isComingSoonEnabled={ isComingSoonEnabled }
						viewUrl={ viewUrl }
						previewUrl={ previewUrl }
					/>
				</div>
				<div className="nfd-flex nfd-flex-col nfd-gap-2 nfd-w-full md:nfd-w-1/2">
					<Title size={ 2 } as="h2" className="nfd-text-2xl nfd-mb-4 nfd-mt-4">
						{ !isComingSoonEnabled ? (
							__('Your website is live to the world!', 'wp-module-coming-soon')
						) : (
							__('Your website is currently displaying a "Coming Soon" page.', 'wp-module-coming-soon')
						) }
					</Title>
					<div className="nfd-flex nfd-flex-row nfd-gap-4 nfd-mb-4 nfd-flex-wrap">
						<Button
							as="a"
							data-cy="nfd-view-site"
							href={ window.NewfoldRuntime?.linkTracker?.addUtmParams( viewUrl ) || viewUrl }
							target="_blank"
							variant="secondary"
						>
							<ArrowTopRightOnSquareIcon />
							{ __('View', 'wp-module-coming-soon') }
						</Button>
						<Button
							as="a"
							data-cy="nfd-edit-site"
							href={  window.NewfoldRuntime?.linkTracker?.addUtmParams( editUrl ) || editUrl }
							variant="secondary"
						>
							<PencilIcon />
							{ __('Edit', 'wp-module-coming-soon') }
						</Button>
						{ !isComingSoonEnabled ? (
							<Button
								data-cy="nfd-coming-soon-enable"
								onClick={() => {
									window.NewfoldRuntime.comingSoon.enable().then((response) => {
										setIsComingSoonEnabled( response.comingSoon );
									});
								}}
								title={ __('Not ready to share it?', 'wp-module-coming-soon') }
								variant="primary"
							>
								<WrenchIcon />
								{ __('Enable Coming Soon', 'wp-module-coming-soon') }
							</Button>
						) : (
							<Button
								data-cy="nfd-coming-soon-disable"
								onClick={() => {
									window.NewfoldRuntime.comingSoon.disable().then((response) => {
										setIsComingSoonEnabled( response.comingSoon );
									});
								}}
								title={ __('Ready to publish?', 'wp-module-coming-soon') }
								variant="upsell"
							>
								<RocketLaunchIcon />
								{ __('Launch Site', 'wp-module-coming-soon') }
							</Button>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};