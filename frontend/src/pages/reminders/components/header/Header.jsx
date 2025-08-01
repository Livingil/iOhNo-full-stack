import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../../../components';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { H2 } from '../../../../components/markup-components';

export const HeaderReminders = () => {
	const [pathname, setPathname] = useState('');

	const location = useLocation();

	useEffect(() => {
		setPathname(location.pathname);
	}, [location.pathname]);

	return (
		<div className={styles.Header}>
			<H2 style={{ margin: 'auto 0 ' }}> Reminders: </H2>
			<Link
				to="/reminders/done"
				className={styles.logo}
				style={{ color: pathname === '/reminders/done' ? '#007bff' : '' }}
			>
				<div className={styles.icon}>
					<Icon id="fa-list-alt" />
				</div>
				<div className={styles.name}>Done</div>
			</Link>
		</div>
	);
};
