import { ACTION_TYPE } from '../actions';
import { initialStateNotes } from './initial-state';

export const reducerNotes = (state = initialStateNotes, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_NOTES: {
			return { ...state, notes: payload };
		}
		case ACTION_TYPE.DELETE_NOTE: {
			return { ...state, notes: state.notes.filter((note) => note.id !== payload) };
		}
		case ACTION_TYPE.LOGOUT: {
			return initialStateNotes;
		}

		default:
			return state;
	}
};
