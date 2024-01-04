{
	const API_ENDPOINT = window.NewfoldRuntime.restUrl + 'newfold-coming-soon/v1';

	const attachToRuntime = () => {
		window.NewfoldRuntime.comingSoon = buildObject();
	};

	const buildObject = () => {
		return {
			isEnabled: checkComingSoonStatus,
			enable: enableComingSoon,
			disable: disableComingSoon,
		};
	};

	const checkComingSoonStatus = async () => {
		const result = {};

		await window.wp
			.apiFetch( {
				url: `${ API_ENDPOINT }/status`,
				method: 'GET',
			} )
			.then( ( response ) => {
				if ( response.hasOwnProperty( 'comingSoon' ) ) {
					result.success = true;
					result.comingSoon = response.comingSoon;
				} else {
					result.success = false;
				}
			} )
			.catch( () => {
				result.success = false;
			} );

		return result;
	};

	const enableComingSoon = async () => {
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
				} else {
					result.success = false;
				}
			} )
			.catch( () => {
				result.success = false;
			} );

		return result;
	};

	const disableComingSoon = async () => {
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
				} else {
					result.success = false;
				}
			} )
			.catch( () => {
				result.success = false;
			} );

		return result;
	};

	window.addEventListener( 'DOMContentLoaded', () => {
		attachToRuntime();
	} );
}
