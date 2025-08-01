import { setValueLoading, setError, setValueNotes } from '../../actions';

export const fetchData = (adres) => {
	return async (dispatch) => {
		dispatch(setValueLoading(true));
		dispatch(setError(null));
		try {
			const response = await fetch(`http://localhost:3000/${adres}`);
			const loadedData = await response.json();
			switch (adres) {
				case 'notes':
					dispatch(setValueNotes(loadedData));
					break;
			}
		} catch {
			dispatch(setError('Все пропало'));
		} finally {
			dispatch(setValueLoading(false));
			dispatch(setError(null));
		}
	};
};
