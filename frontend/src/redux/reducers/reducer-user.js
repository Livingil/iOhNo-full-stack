import { ACTION_TYPE } from '../actions';
import { initialStateUser } from './initial-state';

export const reducerUser = (state = initialStateUser, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_USER: {
			return { ...state, ...payload };
		}
		case ACTION_TYPE.LOGOUT: {
			return initialStateUser;
		}

		default:
			return state;
	}
};
