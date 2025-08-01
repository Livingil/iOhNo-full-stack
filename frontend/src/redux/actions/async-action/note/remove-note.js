import { request } from '../../../../utils';
import { deleteNote } from '../../note/delete-note';

export const removeNote = (id) => async (dispatch) => {
	dispatch(deleteNote(id));
	await request(`/notes/${id}`, 'DELETE');
};
