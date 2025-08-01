import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/selectors';
import { getRoleName } from '../../../utils';
import { ROLE } from '../../../constans';
import { Icon } from '../../icon/Icon';
import styles from './Profile.module.css';

export const Profile = () => {
	const user = useSelector(selectUser);

	if (user.roleId === ROLE.GUEST) {
		return (
			<Link to="/profile" className={styles.Profile}>
				<div className={styles.logo}>
					<Icon id="fa-user-circle" />
				</div>
				<div className={styles.infoPanel}>
					<h1>Login</h1>
					<div>Role</div>
				</div>
			</Link>
		);
	}

	return (
		<Link to="/profile" className={styles.Profile}>
			<div>
				<img src={user.avatar} alt="Avatar" className={styles.logo} />
			</div>
			<div className={styles.infoPanel}>
				<h1>{user.login}</h1>
				<div>{getRoleName(user.roleId)}</div>
			</div>
		</Link>
	);
};
