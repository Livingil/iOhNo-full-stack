import { Profile, Calendar, Weather, Notes, Reminders } from '../../components';
import styles from './Home.module.css';

export const HomePage = () => {
	return (
		<div className={styles.HomePage}>
			<Profile />
			<Calendar />
			<Weather />
			<Notes />
			<Reminders />
		</div>
	);
};
