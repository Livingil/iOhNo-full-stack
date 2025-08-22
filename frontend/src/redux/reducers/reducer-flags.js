import { ACTION_TYPE } from '../actions';
import { initialStateFlags } from './initial-state';

export const reducerFlags = (state = initialStateFlags, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.LOGOUT: {
			return { ...state, wasLogout: !state.wasLogout };
		}
		case ACTION_TYPE.SET_TRIGGER_NEW_NOTE: {
			return { ...state, triggerNewNote: payload };
		}
		case ACTION_TYPE.SET_ISLOADING_WEATHER: {
			return { ...state, isLoadingWeather: payload };
		}
		case ACTION_TYPE.SET_ISLOADING_NOTES: {
			return { ...state, isLoadingNotes: payload };
		}
		case ACTION_TYPE.SET_ISLOADING_REMINDERS: {
			return { ...state, isLoadingReminders: payload };
		}
		case ACTION_TYPE.SET_ISLOADING_USERS: {
			return { ...state, isLoadingUsers: payload };
		}
		case ACTION_TYPE.SET_ISLOADING_USER: {
			return { ...state, isLoadingUser: payload };
		}

		default:
			return state;
	}
};
