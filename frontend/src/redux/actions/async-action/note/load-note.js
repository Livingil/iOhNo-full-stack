import { request } from '../../../../utils';
import { setNote } from '../../note/set-note';

export const loadNote = (noteId) => (dispatch) =>
	request(`/notes/${noteId}`).then((noteData) => {
		if (noteData.data) {
			dispatch(setNote(noteData.data));
		}
		return noteData;
	});
