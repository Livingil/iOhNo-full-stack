import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../../../components';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export const HeaderInfo = () => {
	const [pathname, setPathname] = useState('');

	const location = useLocation();

	useEffect(() => {
		setPathname(location.pathname);
	}, [location.pathname]);

	return (
		<div className={styles.Header}>
			<Link
				to="/info/users"
				className={styles.logo}
				style={{ color: pathname === '/info/users' ? '#007bff' : '' }}
			>
				<div className={styles.icon}>
					<Icon id="fa-users" />
				</div>
				<div className={styles.name}>Users</div>
			</Link>
			<Link
				to="/info/notes"
				className={styles.logo}
				style={{ color: pathname === '/info/notes' ? '#007bff' : '' }}
			>
				<div className={styles.icon}>
					<Icon id="fa-file-text-o" />
				</div>
				<div className={styles.name}>Notes</div>
			</Link>
		</div>
	);
};
