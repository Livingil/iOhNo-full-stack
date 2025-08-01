import { ACTION_TYPE } from '../actions';
import { initialStateFlags } from './initial-state';

export const reducerFlags = (state = initialStateFlags, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.LOGOUT: {
			return { ...state, wasLogout: !state.wasLogout };
		}
		case ACTION_TYPE.SET_IS_LOADING: {
			return { ...state, isLoading: payload };
		}
		case ACTION_TYPE.SET_TRIGGER_NEW_NOTE: {
			return { ...state, triggerNewNote: payload };
		}

		default:
			return state;
	}
};
