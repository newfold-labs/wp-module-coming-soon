{
	const API_ENDPOINT = window.NewfoldRuntime.restUrl + 'newfold-coming-soon/v1';

	const attachToRuntime = () => {
		window.NewfoldRuntime.comingSoon = buildObject();
	};

	const buildObject = () => {
		return {
			isEnabled,
			enable,
			disable,
			lastChanged,
			toggleAdminBarSiteStatus,
		};
	};

	const isEnabled = async () => {
		let status;

		await window.wp
			.apiFetch( {
				url: `${ API_ENDPOINT }/status`,
				method: 'GET',
			} )
			.then( ( response ) => {
				if ( response.hasOwnProperty( 'comingSoon' ) ) {
					status = response.comingSoon;
				} else {
					status = null;
				}
			} )
			.catch( () => {
				status = null;
			} );

		return status;
	};

	const enable = async () => {
		const result = {};

		await window.wp
			.apiFetch( {
				url: `${ API_ENDPOINT }/enable`,
				method: 'POST',
			} )
			.then( ( response ) => {
				if ( response.hasOwnProperty( 'comingSoon' ) ) {
					result.success = true;
					result.comingSoon = response.comingSoon;
					toggleAdminBarSiteStatus( true );
				} else {
					result.success = false;
				}
			} )
			.catch( () => {
				result.success = false;
			} );

		return result;
	};

	const disable = async () => {
		const result = {};

		await window.wp
			.apiFetch( {
				url: `${ API_ENDPOINT }/disable`,
				method: 'POST',
			} )
			.then( ( response ) => {
				if ( response.hasOwnProperty( 'comingSoon' ) ) {
					result.success = true;
					result.comingSoon = response.comingSoon;
					toggleAdminBarSiteStatus( false );
				} else {
					result.success = false;
				}
			} )
			.catch( () => {
				result.success = false;
			} );

		return result;
	};

	const lastChanged = async () => {
		let value;

		await window.wp
			.apiFetch( {
				url: `${ API_ENDPOINT }/last-changed`,
				method: 'GET',
			} )
			.then( ( response ) => {
				if ( response.hasOwnProperty( 'lastChanged' ) ) {
					value = response.lastChanged;
				} else {
					value = null;
				}
			} )
			.catch( () => {
				value = null;
			} );

		return value;
	};

	const toggleAdminBarSiteStatus = ( newState ) => {
		const siteStatus = document.querySelector(
			'#wp-toolbar #nfd-site-status'
		);

		if ( ! siteStatus ) {
			return;
		}

		siteStatus.setAttribute( 'data-coming-soon', newState );
	};

	window.addEventListener( 'DOMContentLoaded', () => {
		attachToRuntime();
	} );
}
