import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUser } from '../../../../redux/selectors';
import { Icon } from '../../../icon/Icon';
import { ROLE } from '../../../../constans';
import { userLogout } from '../../../../redux/actions';
import { checkAccess } from '../../../../utils';
import styles from './Control-panel.module.css';

export const ControlPanel = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const onLogout = () => {
		dispatch(userLogout());
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], user.roleId);

	return (
		<div className={styles.ControlPanel}>
			<div className={styles.userLogo}>
				{user.roleId === ROLE.GUEST ? (
					<Link className={styles.profil} to="/login">
						Guest
						<Icon id="fa-user-circle" />
					</Link>
				) : (
					<>
						<Link className={styles.profil} to="/profile">
							{user.login}
						</Link>
						<div className={styles.logout} onClick={onLogout}>
							<Icon id="fa-sign-out" />
						</div>
					</>
				)}
			</div>
			<div className={styles.buttonsPanel}>
				<div onClick={() => navigate(-1)} className={styles.button}>
					<Icon id="fa-chevron-circle-left" />
				</div>
				<Link to="/create" className={styles.button}>
					<Icon id="fa-plus-circle" />
				</Link>
				<Link to="/vidgets" className={styles.button}>
					<Icon id="fa-th" />
				</Link>
				{isAdmin && (
					<Link to="/info" className={styles.button}>
						<Icon id="fa-info-circle" />
					</Link>
				)}
			</div>
		</div>
	);
};
