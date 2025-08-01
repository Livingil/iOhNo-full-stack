import PropTypes from 'prop-types';
import { ROLE } from './role';

export const PROP_TYPE = {
	ROLE: PropTypes.oneOf(Object.values(ROLE)),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	NOTE: PropTypes.shape({
		authorId: PropTypes.string,
		content: PropTypes.string,
		creationAt: PropTypes.string,
		id: PropTypes.string,
		title: PropTypes.string,
	}),
	USER: PropTypes.shape({
		avatar: PropTypes.string,
		id: PropTypes.string,
		login: PropTypes.string,
		registeredAt: PropTypes.string,
		roleId: PropTypes.string,
		updatedAt: PropTypes.string,
	}),
};
