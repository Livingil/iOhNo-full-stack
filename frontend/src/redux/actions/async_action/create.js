import { dateNow, timeNow } from '../../../utils';
import { setValueLoading, setError, setValueNotes } from '../../actions';
import { selectNotes } from '../../selectors';

export const create = (title, content, adres, userId) => {
	return async (dispatch, getState) => {
		dispatch(setValueLoading(true));
		dispatch(setError(null));

		try {
			const response = await fetch(`http://localhost:3000/${adres}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title,
					content,
					creation_at: dateNow(),
					time_creation_at: timeNow(),
					user_id: userId,
				}),
			});
			const newNote = await response.json();
			const currentNotes = selectNotes(getState());
			dispatch(setValueNotes([newNote, ...currentNotes]));
		} catch {
			dispatch(setError('Все пропало'));
		} finally {
			dispatch(setValueLoading(false));
			dispatch(setError(null));
		}
	};
};
