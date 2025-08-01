import { HeaderCalendar } from './components';
import { useClickUrl } from '../../../hooks';
import styles from '../Vidgets.module.css';

export const Calendar = () => {
	const handleClick = useClickUrl('/calendar');
	return (
		<div onClick={handleClick} className={styles.Vidgets}>
			<HeaderCalendar />
			<span className={styles.dev}>in development</span>
		</div>
	);
};
