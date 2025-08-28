import { request } from '../../../../utils';
import { removeComment } from '../../comments/remove-comment';

export const removeCommentAsync = (userId, id) => async (dispatch) => {
	dispatch(removeComment(id));
	await request(`/users/${userId}/comments/${id}`, 'DELETE');
};
