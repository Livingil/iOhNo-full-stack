import { setLoadUser } from '../user/set-load-user';

export const loadUser = (serverRequest, userId) => (dispatch) =>
	serverRequest('fetchUser', userId).then((userData) => {
		if (userData.res) {
			dispatch(setLoadUser(userData.res));
		}
		return userData;
	});
