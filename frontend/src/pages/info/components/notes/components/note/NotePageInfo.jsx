import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Icon, Loader, ErrorContent } from '../../../../../../components';
import { loadNote, removeNote, saveNote } from '../../../../../../redux/actions';
import { selectNote, selectUser } from '../../../../../../redux/selectors';
import { Textarea } from '../../../../../../components/markup-components';
import { ROLE } from '../../../../../../constans';
import { formatDate } from '../../../../../../utils';
import styles from './NotePageInfo.module.css';

export const NotePageInfo = () => {
	const [error, setError] = useState(null);

	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(loadNote(params.id)).then((noteData) => {
			setError(noteData.error);
		});
	}, [dispatch, params]);

	const note = useSelector(selectNote);
	const user = useSelector(selectUser);

	const [textTitle, setTextTitle] = useState(note.title);
	const [textContent, setTextContent] = useState(note.content);
	const [saveDisabled, setSaveDisabled] = useState(true);
	const [isLocalLoading, setIsLocalLoading] = useState(true);

	useEffect(() => {
		setTextTitle(note.title);
		setTextContent(note.content);
		setIsLocalLoading(false);
	}, [note]);

	useEffect(() => {
		const isSame = note && note.title === textTitle && note.content === textContent;
		setSaveDisabled(isSame);
	}, [textTitle, textContent, note]);

	const handleChange = (event, setter) => {
		setter(event.target.value);
	};

	const onNoteSave = () => {
		dispatch(saveNote({ id: note.id, title: textTitle, content: textContent, authorId: user.id }));
	};

	const onNoteRemove = () => {
		dispatch(removeNote(note.id)).then(() => navigate(-1));
	};

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<ErrorContent access={ROLE.ADMIN} error={error}>
			<div className={styles.NotePageInfo}>
				<div className={styles.header}>
					<div className={styles.creationAt}>
						<Icon id="fa-calendar-o" /> {formatDate(note.creationAt)} {note.timeCreationAt}
					</div>
					<div className={styles.buttons}>
						<div className={saveDisabled ? styles.disabled : styles.buttonSave}>
							<Icon id="fa-floppy-o" onClick={onNoteSave} />
						</div>
						<div className={styles.buttonTrash}>
							<Icon id="fa-trash-o" onClick={onNoteRemove} />
						</div>
					</div>
				</div>
				<form className={styles.form}>
					<div className={styles.header}>
						<Textarea
							className={'NoteTitle'}
							value={textTitle || ''}
							onChange={(event) => handleChange(event, setTextTitle)}
						/>
					</div>
					<Textarea
						className={'NoteContent'}
						value={textContent || ''}
						onChange={(event) => handleChange(event, setTextContent)}
					/>
				</form>
			</div>
		</ErrorContent>
	);
};
