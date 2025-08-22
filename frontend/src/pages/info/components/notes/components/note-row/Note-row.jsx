import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../../../components';
import { confirmed, formatDate } from '../../../../../../utils';
import { PROP_TYPE } from '../../../../../../constans';
import styles from './Note-row.module.css';

export const NotesRow = ({ note, users, handleNoteDelete }) => {
	const onNoteRemove = () => {
		if (confirmed('note')) {
			handleNoteDelete(note.id);
		}
		return;
	};

	return (
		<div className={styles.row}>
			<Link to={`/info/notes/${note.id}`} className={styles.tableRow}>
				<div className={styles.loginColumn}>
					{users?.find((user) => note.authorId === user.id)?.login || 'User delete'}
				</div>
				<div className={styles.titleColumn}>{note.title}</div>
				<div className={styles.pubAtColumn}>{formatDate(note.creationAt)}</div>
			</Link>
			<div className={styles.buttonTrash}>
				<Icon id="fa-trash-o" onClick={onNoteRemove} />
			</div>
		</div>
	);
};

NotesRow.propTypes = {
	note: PROP_TYPE.NOTE,
	users: PropTypes.arrayOf(PROP_TYPE.USER),
	handleNoteDelete: PropTypes.func,
};
