import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderNotes } from './components';
import { selectNotes } from '../../../redux/selectors';
import { setNote } from '../../../redux/actions';
import { formatDate } from '../../../utils';
import styles from '../Vidgets.module.css';

export const Notes = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const notes = useSelector(selectNotes);

	const visibleNotes = notes.slice(0, 5);

	const handleSetNote = (id) => {
		const note = notes.filter((note) => note.id === id);
		dispatch(setNote(note[0]));
	};

	const resetNote = () => {
		dispatch(setNote(notes[0]));
		navigate('/notes');
	};

	return (
		<div onClick={resetNote} className={styles.Vidgets}>
			<HeaderNotes />
			{visibleNotes.map((note) => (
				<div key={note.id} className={styles.noteRow} onClick={() => handleSetNote(note.id)}>
					<div>{note.title}</div>
					<div>{formatDate(note.creationAt)}</div>
				</div>
			))}
		</div>
	);
};
