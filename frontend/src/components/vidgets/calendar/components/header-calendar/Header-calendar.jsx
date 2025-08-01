import { Link } from 'react-router-dom';
import { Icon } from '../../../../icon/Icon';
import styles from '../../../Vidgets-Header.module.css';

export const HeaderCalendar = () => {
	const day = new Date().toLocaleString('ru', {
		day: 'numeric',
		month: 'long',
	});
	return (
		<div className={styles.Header}>
			<div className={styles.logo}>
				<div className={styles.icon}>
					<Icon id="fa-calendar" />
				</div>
				<div>{day}</div>
			</div>
			<div className={styles.name}>Calendar</div>
			<Link
				to="/create-event"
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
