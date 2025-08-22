import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderNotes } from './components';
import { selectErrorNotes, selectIsLoadingNotes, selectNotes, selectUser } from '../../../redux/selectors';
import { setErrorNotes, setNote, setNotes, thunk } from '../../../redux/actions';
import { checkAccess, formatDate } from '../../../utils';
import { useEffect } from 'react';
import { ErrorContent } from '../../Error-content/Error-content';
import { Loader } from '../../loader/Loader';
import { setIsLoadingNotes } from '../../../redux/actions/flags/set-is-loading-notes';
import { ROLE } from '../../../constans';
import styles from '../Vidgets.module.css';

export const Notes = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLocalLoading = useSelector(selectIsLoadingNotes);
	const errorMessage = useSelector(selectErrorNotes);
	const notes = useSelector(selectNotes);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN, ROLE.USER], user.roleId)) {
			return;
		}
		dispatch(thunk('/notes', setNotes, setIsLoadingNotes, setErrorNotes));
	}, [dispatch, user]);

	const visibleNotes = notes.slice(0, 5);

	const handleSetNote = (id) => {
		dispatch(thunk(`/notes/${id}`, setNote, setIsLoadingNotes, setErrorNotes));
	};

	const resetNote = () => {
		dispatch(setNote(notes[0]));
		navigate('/notes');
	};

	return (
		<ErrorContent error={errorMessage}>
			<div onClick={resetNote} className={styles.Vidgets}>
				<HeaderNotes />
				{isLocalLoading ? (
					<Loader />
				) : (
					visibleNotes.map((note) => (
						<div key={note.id} className={styles.noteRow} onClick={() => handleSetNote(note.id)}>
							<div>{note.title}</div>
							<div>{formatDate(note.creationAt)}</div>
						</div>
					))
				)}
			</div>
		</ErrorContent>
	);
};
