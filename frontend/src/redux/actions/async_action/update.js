import { dateNow, timeNow } from '../../../utils';
import { setValueLoading, setError, setValueNotes } from '../../actions';
import { selectNotes } from '../../selectors';

export const reData = (id, adres, title, content) => {
	return async (dispatch, getState) => {
		dispatch(setValueLoading(true));
		dispatch(setError(null));
		try {
			const response = await fetch(`http://localhost:3000/${adres}/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title, content, creation_at: dateNow(), time_creation_at: timeNow() }),
			});
			const newDateNote = await response.json();
			const notes = selectNotes(getState());
			dispatch(setValueNotes(notes.map((note) => (note.id === id ? newDateNote : note))));
		} catch {
			dispatch(setError('Все пропало'));
		} finally {
			dispatch(setValueLoading(false));
			dispatch(setError(null));
		}
	};
};
