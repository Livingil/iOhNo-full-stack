import { request } from '../../../../utils';
import { deleteUser } from '../../user/delete-user';

export const removeUser = (id) => async (dispatch) => {
	dispatch(deleteUser(id));
	await request(`/users/${id}`, 'DELETE');
};
