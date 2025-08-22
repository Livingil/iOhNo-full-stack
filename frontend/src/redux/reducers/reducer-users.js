import { ACTION_TYPE } from '../actions';
import { initialStateUsers } from './initial-state';

export const reducerUsers = (state = initialStateUsers, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_USERS: {
			return { ...state, users: payload };
		}
		case ACTION_TYPE.SET_ALL_USERS: {
			return { ...state, allUsers: payload };
		}
		case ACTION_TYPE.DELETE_USER: {
			return { ...state, allUsers: state.users.filter((user) => user.id !== payload) };
		}
		case ACTION_TYPE.SET_USERS_ROLE: {
			return { ...state, usersRole: payload };
		}

		case ACTION_TYPE.LOGOUT: {
			return initialStateUsers;
		}

		default:
			return state;
	}
};
