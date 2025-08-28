import { ACTION_TYPE } from '../actions';
import { initialStateReminders } from './initial-state';

export const reducerReminders = (state = initialStateReminders, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_REMINDERS: {
			return { ...state, reminders: payload };
		}

		case ACTION_TYPE.LOGOUT: {
			return initialStateReminders;
		}

		default:
			return state;
	}
};
