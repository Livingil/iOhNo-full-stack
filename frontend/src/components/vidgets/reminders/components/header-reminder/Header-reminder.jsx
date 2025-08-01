import { Link } from 'react-router-dom';
import { Icon } from '../../../../icon/Icon';
import styles from '../../../Vidgets-Header.module.css';

export const HeaderReminder = () => {
	return (
		<div className={styles.Header}>
			<div className={styles.logo}>
				<div className={styles.icon}>
					<Icon id="fa-list-alt" />
				</div>
			</div>
			<div className={styles.name}>Reminders</div>
			<Link
				to="/create-reminder"
				onClick={(event) => {
					event.stopPropagation();
				}}
				className={styles.plus}
			>
				<Icon id="fa-plus" />
			</Link>
		</div>
	);
};
