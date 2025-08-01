import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { HeaderInfo } from './components';
import { selectUser } from '../../redux/selectors';
import { ROLE } from '../../constans';
import { ErrorContent } from '../../components';
import { checkAccess } from '../../utils';
import styles from './Info.module.css';

export const InfoPage = () => {
	const user = useSelector(selectUser);

	if (!checkAccess([ROLE.ADMIN], user.roleId)) {
		return <ErrorContent access={ROLE.ADMIN} error={'Access denied'} />;
	}

	return (
		<div className={styles.InfoPage}>
			<HeaderInfo />
			<Outlet />
		</div>
	);
};
