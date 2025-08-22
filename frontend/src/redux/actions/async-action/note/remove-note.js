import { request } from '../../../../utils';

export const removeNote = (id, deleteAction) => async (dispatch) => {
	dispatch(deleteAction(id));
	await request(`/notes/${id}`, 'DELETE');
};
