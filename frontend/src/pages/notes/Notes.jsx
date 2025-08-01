import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { NotesList, NoteContent } from './components';
import { selectNotes, selectTriggerNewNote, selectUser } from '../../redux/selectors';
import { setNote, setNotes, setTriggerNewNote } from '../../redux/actions';
import { dateNow } from '../../utils';
import { ErrorContent, Loader, Search } from '../../components';
import { Button } from '../../components/markup-components';
import { ROLE } from '../../constans';
import styles from './Notes.module.css';

export const NotesPage = () => {
	const [flagNewNoteButton, setFlagNewNoteButton] = useState(true);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isLocalLoading, setIsLocalLoading] = useState(true);

	const notes = useSelector(selectNotes);
	const user = useSelector(selectUser);

	const triggerNewNoteFlag = useSelector(selectTriggerNewNote);

	const dispatch = useDispatch();

	const handleSetFlagNewNoteButton = useCallback((boolValue) => setFlagNewNoteButton(boolValue), []);

	const handleNewNote = () => {
		dispatch(
			setNote({
				id: null,
				title: null,
				content: null,
				creationAt: null,
				timeCreationAt: null,
				authorId: null,
			}),
		);

		setFlagNewNoteButton(false);

		if (notes[0]?.title === 'New note' && notes[0]?.content === 'New note') {
			return;
		}

		const newNotes = {
			id: Date.now(),
			title: 'New note',
			content: 'New note',
			creationAt: dateNow(),
			userId: user.id,
		};

		dispatch(setNotes([newNotes, ...notes]));
	};

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
	};

	const searchNotes = notes.filter(
		(note) =>
			note.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
			note.content.toLowerCase().includes(searchPhrase.toLowerCase()),
	);

	useEffect(() => {
		if (triggerNewNoteFlag) {
			handleNewNote();
			dispatch(setTriggerNewNote(false));
		}
		setIsLocalLoading(false);
	}, [dispatch, triggerNewNoteFlag]);

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<ErrorContent access={[ROLE.ADMIN, ROLE.USER]} error={null}>
			<div className={styles.NotesPage}>
				<div className={styles.notesList}>
					<Search onChange={onSearch} />
					<NotesList searchNotes={searchNotes} />
					<div>
						<Button
							onClick={handleNewNote}
							style={{
								width: '100%',
								backgroundColor: 'rgba(28, 28, 30, 0.6)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
							}}
						>
							New note
						</Button>
					</div>
				</div>
				<NoteContent
					flagNewNoteButton={flagNewNoteButton}
					handleSetFlagNewNoteButton={handleSetFlagNewNoteButton}
				/>
			</div>
		</ErrorContent>
	);
};
