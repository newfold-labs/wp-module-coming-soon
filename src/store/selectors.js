/**
 * Checks if the pre publish modal is open.
 *
 * @param {*} state
 * @return {boolean} True if the modal is open, false otherwise.
 */
export function isModalOpen(state) {
	return state.modal.isOpen;
}
