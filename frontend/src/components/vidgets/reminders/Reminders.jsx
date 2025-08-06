import { HeaderReminder } from './components';
import { useClickUrl } from '../../../hooks';
import styles from '../Vidgets.module.css';

export const Reminders = () => {
	const handleClick = useClickUrl('/reminders');
	return (
		<div onClick={handleClick} className={styles.Vidgets}>
			<HeaderReminder />
			<span className={styles.dev}>in development</span>
		</div>
	);
};
