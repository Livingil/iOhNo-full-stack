import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { removeNote, setNote } from '../../../../redux/actions';
import { selectNotes } from '../../../../redux/selectors';
import { formatDate } from '../../../../utils';
import { PROP_TYPE } from '../../../../constans';
import styles from './Notes-list.module.css';

export const NotesList = ({ searchNotes }) => {
	const dispatch = useDispatch();

	const notes = useSelector(selectNotes);

	const handleClickForValueNote = (note, event) => {
		event.preventDefault();
		dispatch(setNote(note));
	};

	const handleClickDelete = (id, event) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(removeNote(id));
	};

	const currentNotesList = searchNotes || notes || [];

	return (
		<div className={styles.scrollableList}>
			{currentNotesList.map((note) => (
				<div
					key={note.id}
					className={styles.notesList}
					onClick={(event) => handleClickForValueNote(note, event)}
				>
					<div className={styles.header}>
						<div className={styles.noteTitle}>{note.title}</div>
						<div className={styles.button} onClick={(event) => handleClickDelete(note.id, event)}>
							<Icon id="fa-trash-o" />
						</div>
					</div>

					<div className={styles.noteDate}>{formatDate(note.creationAt)}</div>
					<div className={styles.noteContent}>{note.content}</div>
				</div>
			))}
		</div>
	);
};

NotesList.propTypes = { searchNotes: PropTypes.arrayOf(PROP_TYPE.NOTE) };
