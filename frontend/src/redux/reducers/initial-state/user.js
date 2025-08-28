import { ROLE } from '../../../constans';

export const initialStateUser = {
	id: null,
	login: null,
	registeredAt: null,
	roleId: ROLE.GUEST,
	comments: [{ content: null, author: null, id: null, publishedAt: null }],
};
