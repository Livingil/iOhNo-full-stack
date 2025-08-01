import { request } from '../../../../utils';
import { setNote } from '../../note/set-note';
import { setNotes } from '../../notes/set-notes';

export const saveNote = (newNote, notes) => (dispatch) => {
	const saveRequest =
		typeof newNote.id === 'number' || !newNote.id
			? request('/notes', 'POST', newNote)
			: request(`/notes/${newNote.id}`, 'PATCH', newNote);

	return saveRequest.then((updatedNote) => {
		dispatch(setNote(updatedNote.data));
		if (notes?.length > 0) {
			dispatch(setNotes(notes.map((note) => (note.id === newNote.id ? updatedNote.data : note))));
		} else {
			dispatch(setNotes([updatedNote.data]));
		}

		return updatedNote.data;
	});
};
