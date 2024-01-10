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
			lastChanged: getLastChanged,
		};
	};

	const checkComingSoonStatus = async () => {
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

	const getLastChanged = async () => {
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

	window.addEventListener( 'DOMContentLoaded', () => {
		attachToRuntime();
	} );
}
