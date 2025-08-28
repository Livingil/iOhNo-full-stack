import { Icon } from '../../../../components';
import styles from './Reminder-row.module.css';
import { formatDate } from '../../../../utils';

export const ReminderRow = ({ reminder, handleNoteDelete }) => {
	return (
		<div className={styles.row}>
			<div className={styles.tableRow}>
				<div className={styles.titleColumn}>{reminder?.title}</div>
				<div className={styles.contentColumn}>{reminder?.content}</div>
				<div className={styles.pubAtColumn}>{formatDate(reminder?.creationAt)}</div>
			</div>

			<div className={styles.buttonTrash}>
				<Icon id="fa-floppy-o" />
			</div>
			<div className={styles.buttonTrash}>
				<Icon id="fa-trash-o" />
			</div>
		</div>
	);
};
