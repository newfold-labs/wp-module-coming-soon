import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { 
	CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import "../style.scss";

export const SitePreview = ({ isComingSoonEnabled, viewUrl, previewUrl }) => {
	return (
		<div id="iframe-preview-wrap">
			<div
				id="iframe-preview-label"
				className="nfd-flex nfd-justify-center nfd-items-center nfd-p-1 nfd-bg-gray-200 nfd-border-b nfd-border-[#dbd1d1] nfd-z-10"
			>
				<p className="nfd-font-bold">{ __( 'Site Preview', 'wp-module-coming-soon' ) }</p>
			</div>
			<div className="iframe-wrap">
				<iframe
					className={`nfd-iframe ${ isComingSoonEnabled ? 'nfd-iframe-coming-soon' : 'nfd-iframe-live'}`}
					id="iframe-preview"
					name="iframe-preview"
					sandbox="allow-scripts allow-same-origin"
					seamless
					scrolling="no"
					src={ 
						!isComingSoonEnabled
						? viewUrl
						: previewUrl
					}
					title={ __('Site Preview', 'wp-module-coming-soon') }
				></iframe>
			</div>
			<div
				className="nfd-flex nfd-justify-between nfd-items-center nfd-p-1 nfd-px-6 nfd-bg-gray-200 nfd-border-t nfd-border-[#dbd1d1] nfd-z-10"
				id="iframe-preview-detail"
			>
				<span className="iframe-preview-domain nfd-font-semibold">
					{ viewUrl }
				</span>
				{ isComingSoonEnabled ? (
					<span 
						className="iframe-preview-status status-coming-soon nfd-flex nfd-flex-row nfd-items-center nfd-gap-2 nfd-font-semibold"
						data-cy="iframe-preview-status-coming-soon"
					>
						<ExclamationTriangleIcon />
						{ __( 'Not Live', 'wp-module-coming-soon' ) }
					</span>
				) : (
					<span 
						className="iframe-preview-status status-live nfd-flex nfd-flex-row nfd-items-center nfd-gap-2 nfd-font-semibold"
						data-cy="iframe-preview-status-live"
					>
						<CheckCircleIcon />
						{ __( 'Live', 'wp-module-coming-soon' ) }
					</span>
				) }
			</div>
		</div>
	);
};
