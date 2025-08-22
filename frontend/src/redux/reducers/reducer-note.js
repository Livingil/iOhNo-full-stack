import { ACTION_TYPE } from '../actions';
import { initialStateNote } from './initial-state';

export const reducerNote = (state = initialStateNote, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_NOTE: {
			return { ...state, ...payload };
		}
		case ACTION_TYPE.LOGOUT: {
			return initialStateNote;
		}
		case ACTION_TYPE.DELETE_NOTE: {
			return initialStateNote;
		}
		case ACTION_TYPE.DELETE_NOTE_FROM_ALL_NOTES: {
			return initialStateNote;
		}

		default:
			return state;
	}
};
