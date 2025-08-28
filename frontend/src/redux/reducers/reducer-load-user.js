import { ACTION_TYPE } from '../actions';
import { initialStateLoadUser } from './initial-state';

export const reducerLoadUser = (state = initialStateLoadUser, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_LOAD_USER: {
			return { ...state, ...payload };
		}
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload],
			};
		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((comment) => comment.id !== payload),
			};
		case ACTION_TYPE.LOGOUT: {
			return initialStateLoadUser;
		}

		default:
			return state;
	}
};
