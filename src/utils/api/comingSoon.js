import { wpSettingsRestRoute } from '../../constants';
import { resolve } from './resolve';

import apiFetch from '@wordpress/api-fetch';

export async function setComingSoon( comingSoon ) {
	return await resolve(
		apiFetch( {
			url: wpSettingsRestRoute,
			method: 'POST',
			data: {
				comingSoon,
			},
		} ).then()
	);
}
