import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components';
import styles from './Reminder-row.module.css';
import { formatDate } from '../../../../utils';

export const ReminderRow = ({ reminder, handleNoteDelete }) => {
	// const dispatch = useDispatch();

	// const onNoteRemove = () => {
	// 	dispatch(removeNote(note.id));
	// 	handleNoteDelete(note.id);
	// };

	return (
		<div className={styles.row}>
			<div className={styles.tableRow}>
				<div className={styles.titleColumn}>{reminder?.title}</div>
				<div className={styles.contentColumn}>{reminder?.content}</div>
				<div className={styles.pubAtColumn}>{formatDate(reminder?.creationAt)}</div>
			</div>

			<div className={styles.buttonTrash}>
				<Icon
					id="fa-floppy-o"
					//  onClick={onNoteSave}
				/>
			</div>
			<div className={styles.buttonTrash}>
				<Icon
					id="fa-trash-o"
					//  onClick={onNoteRemove}
				/>
			</div>
		</div>
	);
};

// ReminderRow.propTypes = {
// 	note: PROP_TYPE.NOTE,
// 	users: PropTypes.arrayOf(PROP_TYPE.USER),
// 	handleNoteDelete: PropTypes.func,
// };
