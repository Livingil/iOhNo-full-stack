import { request } from '../../../utils';
import { ACTION_TYPE } from '../action-type';

export const userLogout = () => {
	request('/logout', 'POST');

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
