import { ACTION_TYPE } from '../actions';
import { initialStateError } from './initial-state';

export const reducerError = (state = initialStateError, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_ERROR_WEATHER: {
			return { ...state, errorWeather: payload };
		}
		case ACTION_TYPE.SET_ERROR_NOTES: {
			return { ...state, errorNotes: payload };
		}
		case ACTION_TYPE.SET_ERROR_REMINDERS: {
			return { ...state, errorReminders: payload };
		}
		case ACTION_TYPE.SET_ERROR_USERS: {
			return { ...state, errorUsers: payload };
		}
		case ACTION_TYPE.SET_ERROR_USER: {
			return { ...state, errorUser: payload };
		}

		default:
			return state;
	}
};
