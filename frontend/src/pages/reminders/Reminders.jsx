import { Outlet } from 'react-router-dom';
import { HeaderReminders } from './components';
import styles from './Reminders.module.css';

export const RemindersPage = () => {
	return (
		<div className={styles.RemindersPage}>
			<HeaderReminders />
			<Outlet />
		</div>
	);
};
