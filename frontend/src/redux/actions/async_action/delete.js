import { setValueLoading, setError, setValueNotes, setNote } from '../../actions';
import { selectNotes } from '../../selectors';

export const deleteData = (adres, id) => {
	return async (dispatch, getState) => {
		dispatch(setValueLoading(true));
		dispatch(setError(null));
		try {
			await fetch(`http://localhost:3000/${adres}/${id}`, {
				method: 'DELETE',
			});
			const notes = selectNotes(getState());
			dispatch(setValueNotes(notes.filter((note) => note.id !== id)));
		} catch {
			dispatch(setError('Все пропало'));
		} finally {
			dispatch(setNote([]));
			dispatch(setValueLoading(false));
			dispatch(setError(null));
		}
	};
};
