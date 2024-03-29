/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

export function modal(
	state = {
		isOpen: false,
	},
	action
) {
	switch (action.type) {
		case 'SET_MODAL_OPEN':
			return {
				...state,
				isOpen: action.isOpen,
			};
	}

	return state;
}

export default combineReducers({
	modal
});
