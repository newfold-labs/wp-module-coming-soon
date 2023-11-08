/**
 * Toggles the pre publish modal.
 *
 * @param {boolean} isOpen Modal open state.
 * @return {Object} Action object.
 */
export function setIsModalOpen(isOpen) {
	return {
		type: 'SET_MODAL_OPEN',
		isOpen,
	};
}

