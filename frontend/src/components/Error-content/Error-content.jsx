import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { H2 } from '../markup-components';
import { selectUser } from '../../redux/selectors';
import { ERROR, PROP_TYPE } from '../../constans';
import { checkAccess } from '../../utils';
import styles from './Error-content.module.css';

export const ErrorContent = ({ children, access, serverError = null }) => {
	const user = useSelector(selectUser);
	let accessError;

	if (access) {
		accessError = checkAccess(access, user.roleId) ? null : ERROR.ACCESS_DENIED;
	}

	const error = serverError || accessError;

	return error ? (
		<div className={styles.Content}>
			<H2> Error: </H2>
			<div>{error}</div>
			<br></br>
			<br></br>
			<div className={styles.link}>
				<Link to="/login">Autorization</Link>
				<Link to="/">Home</Link>
			</div>
		</div>
	) : (
		<div>{children}</div>
	);
};

ErrorContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	serverError: PROP_TYPE.ERROR,
};
